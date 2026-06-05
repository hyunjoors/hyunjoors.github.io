#!/usr/bin/env python3
"""Build and validate static content bundle for the site.

Schema (entries.json):
- All entries: id (required), type, date (required), title (required), keywords[]
- publication: pubType, description?, venue?, authors[], pdfUrl?
- presentation: presType, description?, venue?, authors[], attachmentUrl?
- project: description?, authors[], url?, mode (external|embedded)
- news: description?, url?

home.json: { "recentNewsIds": [<=5 ids referencing non-blog entries] }

Routing (computed groups exposed to the site):
- recentNews        : entries referenced by home.json.recentNewsIds, sorted desc by date
- newsAll           : every publication/presentation/project/news entry, desc
- publicationsByType: publications grouped by pubType, each list desc
- playground        : projects + presentations where presType in {Workshop, Demo}, desc
- blogByDateDesc    : blog posts (markdown) desc
"""
from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import sys
from collections import OrderedDict
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ENTRIES_PATH = REPO_ROOT / "content" / "entries.json"
DEFAULT_HOME_PATH = REPO_ROOT / "content" / "home.json"
DEFAULT_BLOG_DIR = REPO_ROOT / "content" / "blog"
DEFAULT_OUTPUT_PATH = REPO_ROOT / "site" / "generated" / "content.bundle.js"

ENTRY_TYPES = {"publication", "presentation", "project", "news"}
PROJECT_MODES = {"external", "embedded"}
PUB_TYPES = [
    "Refereed Journal Articles",
    "Refereed Conference Proceedings",
    "Book Chapters",
    "Books",
]
PRES_TYPES = [
    "Keynotes",
    "Invited Talks",
    "Refereed Presentations",
    "Refereed Posters",
    "Non-Refereed Presentations",
    "Non-Refereed Panels",
    "Workshops",
    "Demo",
]
PLAYGROUND_PRES_TYPES = {"Workshops", "Demo"}

BLOG_FIELDS = {"id", "title", "date", "tag", "excerpt", "readTime"}


class ValidationError(Exception):
    pass


def load_json(path: Path) -> dict:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise ValidationError(f"Missing file: {path}") from exc
    except json.JSONDecodeError as exc:
        raise ValidationError(f"Invalid JSON in {path}: {exc}") from exc


def parse_iso_date(value: str, label: str) -> dt.date:
    try:
        return dt.date.fromisoformat(value)
    except ValueError as exc:
        raise ValidationError(f"{label} must be YYYY-MM-DD: {value!r}") from exc


def need_str(entry: dict, key: str, label: str) -> str:
    v = entry.get(key)
    if not isinstance(v, str) or not v.strip():
        raise ValidationError(f"{label} is required")
    return v.strip()


def opt_str(entry: dict, key: str) -> str:
    v = entry.get(key)
    return v.strip() if isinstance(v, str) and v.strip() else ""


def opt_list(entry: dict, key: str) -> list:
    v = entry.get(key)
    return v if isinstance(v, list) else []


def clean_authors(value, label: str) -> list[dict]:
    if not isinstance(value, list):
        return []
    out: list[dict] = []
    for i, a in enumerate(value):
        if not isinstance(a, dict):
            raise ValidationError(f"{label}.authors[{i}] must be an object")
        name = a.get("name")
        if not isinstance(name, str) or not name.strip():
            continue
        out.append({"name": name.strip(), "me": bool(a.get("me"))})
    return out


def clean_keywords(value, label: str) -> list[str]:
    if not isinstance(value, list):
        return []
    out: list[str] = []
    for kw in value:
        if not isinstance(kw, str):
            continue
        s = kw.strip()
        if s:
            out.append(s)
    return out


def validate_entry(raw: dict) -> tuple[dict, dt.date]:
    if not isinstance(raw, dict):
        raise ValidationError("Every entry must be an object")

    entry_id = need_str(raw, "id", "entry.id")
    entry_type = need_str(raw, "type", f"{entry_id}.type")
    if entry_type not in ENTRY_TYPES:
        raise ValidationError(
            f"{entry_id}.type must be one of {sorted(ENTRY_TYPES)}, got {entry_type!r}"
        )

    title = need_str(raw, "title", f"{entry_id}.title")
    date_value = need_str(raw, "date", f"{entry_id}.date")
    parsed = parse_iso_date(date_value, f"{entry_id}.date")

    entry: dict = {
        "id": entry_id,
        "type": entry_type,
        "title": title,
        "date": parsed.isoformat(),
        "dateLabel": parsed.strftime("%B %d, %Y"),
        "dateLabelShort": parsed.strftime("%b %Y"),
        "year": parsed.year,
        "keywords": clean_keywords(raw.get("keywords"), entry_id),
        "description": opt_str(raw, "description"),
    }

    if entry_type == "publication":
        pub_type = opt_str(raw, "pubType")
        if pub_type and pub_type not in PUB_TYPES:
            raise ValidationError(
                f"{entry_id}.pubType must be one of {PUB_TYPES}, got {pub_type!r}"
            )
        entry["pubType"] = pub_type or PUB_TYPES[-1]
        entry["venue"] = opt_str(raw, "venue")
        entry["authors"] = clean_authors(raw.get("authors"), entry_id)
        entry["pdfUrl"] = opt_str(raw, "pdfUrl")

    elif entry_type == "presentation":
        pres_type = opt_str(raw, "presType")
        if pres_type and pres_type not in PRES_TYPES:
            raise ValidationError(
                f"{entry_id}.presType must be one of {PRES_TYPES}, got {pres_type!r}"
            )
        entry["presType"] = pres_type or PRES_TYPES[2]
        entry["venue"] = opt_str(raw, "venue")
        entry["authors"] = clean_authors(raw.get("authors"), entry_id)
        entry["attachmentUrl"] = opt_str(raw, "attachmentUrl")

    elif entry_type == "project":
        mode = opt_str(raw, "mode") or "external"
        if mode not in PROJECT_MODES:
            raise ValidationError(
                f"{entry_id}.mode must be one of {sorted(PROJECT_MODES)}, got {mode!r}"
            )
        entry["mode"] = mode
        entry["authors"] = clean_authors(raw.get("authors"), entry_id)
        entry["url"] = opt_str(raw, "url")

    elif entry_type == "news":
        entry["url"] = opt_str(raw, "url")

    return entry, parsed


def load_entries(path: Path) -> tuple[list[dict], dict[str, dict]]:
    payload = load_json(path)
    raw_list = payload.get("entries")
    if not isinstance(raw_list, list):
        raise ValidationError(f"{path} must include 'entries' array")
    entries: list[dict] = []
    by_id: dict[str, dict] = {}
    seen: set[str] = set()
    for raw in raw_list:
        entry, _ = validate_entry(raw)
        if entry["id"] in seen:
            raise ValidationError(f"Duplicate entry id: {entry['id']}")
        seen.add(entry["id"])
        entries.append(entry)
        by_id[entry["id"]] = entry
    return entries, by_id


def parse_frontmatter(raw_text: str, path: Path) -> tuple[dict, str]:
    lines = raw_text.splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValidationError(f"{path} must begin with '---'")
    end_idx = None
    for idx in range(1, len(lines)):
        if lines[idx].strip() == "---":
            end_idx = idx
            break
    if end_idx is None:
        raise ValidationError(f"{path} missing closing '---'")
    fm: dict = {}
    for line in lines[1:end_idx]:
        if not line.strip():
            continue
        if ":" not in line:
            raise ValidationError(f"Bad frontmatter line in {path}: {line}")
        key, raw_value = line.split(":", 1)
        fm[key.strip()] = raw_value.strip()
    return fm, "\n".join(lines[end_idx + 1 :]).strip()


def format_inline(text: str) -> str:
    text = html.escape(text, quote=True)
    code_spans: list[str] = []

    def capture_code(m: re.Match[str]) -> str:
        code_spans.append(m.group(1))
        return f"@@CODE_{len(code_spans) - 1}@@"

    text = re.sub(r"`([^`]+)`", capture_code, text)
    text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        r'<a href="\2" target="_blank" rel="noopener">\1</a>',
        text,
    )
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", text)
    for idx, code in enumerate(code_spans):
        text = text.replace(f"@@CODE_{idx}@@", f"<code>{html.escape(code, quote=True)}</code>")
    return text


def markdown_to_html(text: str) -> str:
    lines = text.splitlines()
    out: list[str] = []
    in_ul = in_ol = in_code = False
    code_lines: list[str] = []

    def close_lists() -> None:
        nonlocal in_ul, in_ol
        if in_ul:
            out.append("</ul>")
            in_ul = False
        if in_ol:
            out.append("</ol>")
            in_ol = False

    for raw in lines:
        line = raw.rstrip()
        s = line.strip()

        if s.startswith("```"):
            close_lists()
            if in_code:
                out.append("<pre><code>")
                out.append(html.escape("\n".join(code_lines)))
                out.append("</code></pre>")
                code_lines = []
                in_code = False
            else:
                in_code = True
            continue
        if in_code:
            code_lines.append(line)
            continue
        if not s:
            close_lists()
            continue

        h = re.match(r"^(#{1,6})\s+(.+)$", s)
        if h:
            close_lists()
            level = len(h.group(1))
            out.append(f"<h{level}>{format_inline(h.group(2))}</h{level}>")
            continue
        bm = re.match(r"^-\s+(.+)$", s)
        if bm:
            if in_ol:
                out.append("</ol>")
                in_ol = False
            if not in_ul:
                out.append("<ul>")
                in_ul = True
            out.append(f"<li>{format_inline(bm.group(1))}</li>")
            continue
        om = re.match(r"^\d+\.\s+(.+)$", s)
        if om:
            if in_ul:
                out.append("</ul>")
                in_ul = False
            if not in_ol:
                out.append("<ol>")
                in_ol = True
            out.append(f"<li>{format_inline(om.group(1))}</li>")
            continue
        if s.startswith("> "):
            close_lists()
            out.append(f"<blockquote>{format_inline(s[2:].strip())}</blockquote>")
            continue
        close_lists()
        out.append(f"<p>{format_inline(s)}</p>")

    if in_code:
        out.append("<pre><code>")
        out.append(html.escape("\n".join(code_lines)))
        out.append("</code></pre>")
    close_lists()
    return "\n".join(out)


def load_blog_posts(blog_dir: Path) -> list[dict]:
    if not blog_dir.exists():
        return []
    posts: list[dict] = []
    seen: set[str] = set()
    for path in sorted(blog_dir.glob("*.md")):
        fm, body = parse_frontmatter(path.read_text(encoding="utf-8"), path)
        missing = [f for f in BLOG_FIELDS if f not in fm]
        if missing:
            raise ValidationError(f"{path} missing blog fields: {', '.join(missing)}")
        post_id = fm["id"].strip()
        if post_id in seen:
            raise ValidationError(f"Duplicate blog id: {post_id}")
        seen.add(post_id)
        parsed = parse_iso_date(fm["date"].strip(), f"{path}.date")
        posts.append({
            "id": post_id,
            "title": fm["title"].strip(),
            "date": parsed.isoformat(),
            "dateLabel": parsed.strftime("%B %d, %Y"),
            "tag": fm["tag"].strip(),
            "excerpt": fm["excerpt"].strip(),
            "readTime": fm["readTime"].strip(),
            "bodyMarkdown": body,
            "bodyHtml": markdown_to_html(body),
        })
    return posts


def sort_desc(items: list[dict]) -> list[dict]:
    return sorted(items, key=lambda i: (i["date"], i["id"]), reverse=True)


def load_recent_news(home_path: Path, by_id: dict[str, dict]) -> list[str]:
    payload = load_json(home_path)
    ids = payload.get("recentNewsIds", [])
    if not isinstance(ids, list):
        raise ValidationError(f"{home_path}.recentNewsIds must be a list")
    cleaned: list[str] = []
    for eid in ids:
        if not isinstance(eid, str) or not eid.strip():
            continue
        if eid not in by_id:
            raise ValidationError(f"home.recentNewsIds references unknown entry id: {eid}")
        cleaned.append(eid)
    if len(cleaned) > 5:
        raise ValidationError(f"home.recentNewsIds is capped at 5 (got {len(cleaned)})")
    return cleaned


def group_publications(pubs: list[dict]) -> "OrderedDict[str, list[dict]]":
    groups: OrderedDict[str, list[dict]] = OrderedDict()
    for label in PUB_TYPES:
        groups[label] = []
    for p in pubs:
        groups.setdefault(p["pubType"], []).append(p)
    for k in list(groups):
        groups[k] = sort_desc(groups[k])
        if not groups[k]:
            del groups[k]
    return groups


def build_payload(entries_path: Path, home_path: Path, blog_dir: Path) -> dict:
    entries, by_id = load_entries(entries_path)
    blog_posts = sort_desc(load_blog_posts(blog_dir))
    recent_ids = load_recent_news(home_path, by_id)

    news_all = sort_desc(entries)
    pubs = [e for e in entries if e["type"] == "publication"]
    pres = [e for e in entries if e["type"] == "presentation"]
    projects = [e for e in entries if e["type"] == "project"]
    news_only = [e for e in entries if e["type"] == "news"]

    playground = sort_desc(
        projects + [p for p in pres if p["presType"] in PLAYGROUND_PRES_TYPES]
    )

    return {
        "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
        "entriesById": by_id,
        "recentNewsIds": recent_ids,
        "newsAllByDateDesc": news_all,
        "publicationsByType": group_publications(pubs),
        "publicationsByDateDesc": sort_desc(pubs),
        "presentationsByDateDesc": sort_desc(pres),
        "projectsByDateDesc": sort_desc(projects),
        "newsByDateDesc": sort_desc(news_only),
        "playgroundByDateDesc": playground,
        "blogByDateDesc": blog_posts,
        "pubTypes": PUB_TYPES,
        "presTypes": PRES_TYPES,
    }


def write_bundle(output_path: Path, payload: dict) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        "// Generated by scripts/build_content.py. Do not edit directly.\n"
        "window.SITE_CONTENT = "
        + json.dumps(payload, indent=2, ensure_ascii=False)
        + ";\n",
        encoding="utf-8",
    )


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Build content bundle for the site.")
    p.add_argument("--check", action="store_true")
    p.add_argument("--entries", type=Path, default=DEFAULT_ENTRIES_PATH)
    p.add_argument("--home", type=Path, default=DEFAULT_HOME_PATH)
    p.add_argument("--blog-dir", type=Path, default=DEFAULT_BLOG_DIR)
    p.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_PATH)
    return p.parse_args()


def main() -> int:
    args = parse_args()
    try:
        payload = build_payload(args.entries, args.home, args.blog_dir)
    except ValidationError as exc:
        print(f"Validation error: {exc}", file=sys.stderr)
        return 1

    counts = {
        "entries": len(payload["entriesById"]),
        "publications": len(payload["publicationsByDateDesc"]),
        "presentations": len(payload["presentationsByDateDesc"]),
        "projects": len(payload["projectsByDateDesc"]),
        "news": len(payload["newsByDateDesc"]),
        "playground": len(payload["playgroundByDateDesc"]),
        "blogs": len(payload["blogByDateDesc"]),
    }
    if args.check:
        print("Content validation passed.", counts)
        return 0
    write_bundle(args.output, payload)
    print(f"Wrote {args.output}", counts)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
