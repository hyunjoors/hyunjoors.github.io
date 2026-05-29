#!/usr/bin/env python3
"""Build and validate static content bundle for the site."""

from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_ENTRIES_PATH = REPO_ROOT / "content" / "entries.json"
DEFAULT_HOME_PATH = REPO_ROOT / "content" / "home.json"
DEFAULT_BLOG_DIR = REPO_ROOT / "content" / "blog"
DEFAULT_OUTPUT_PATH = REPO_ROOT / "site" / "generated" / "content.bundle.js"

ALLOWED_TYPES = {"project", "demo", "poster", "publication", "news"}
ALLOWED_TARGETS = {"embed", "new_tab", "same_tab"}
ALLOWED_MODES = {"embedded", "external", "showcase"}
ALLOWED_PUB_TYPES = {"journal", "conference", "workshop"}

COMMON_FIELDS = {"id", "type", "title", "date", "summary", "tags", "action"}
TYPE_FIELDS = {
    "project": {"mode", "role"},
    "demo": {"mode", "role"},
    "poster": {"venue", "year", "thumbnail"},
    "publication": {"authors", "venue", "pubType"},
    "news": {"newsType"},
}
BLOG_FIELDS = {"id", "title", "date", "tag", "excerpt", "readTime"}


class ValidationError(Exception):
    """Raised on content validation failures."""


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
        raise ValidationError(f"{label} must use YYYY-MM-DD format: {value}") from exc


def assert_string(value: object, label: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValidationError(f"{label} must be a non-empty string")
    return value.strip()


def parse_frontmatter(raw_text: str, path: Path) -> tuple[dict, str]:
    lines = raw_text.splitlines()
    if not lines or lines[0].strip() != "---":
        raise ValidationError(f"{path} must begin with frontmatter '---'")

    end_idx = None
    for idx in range(1, len(lines)):
        if lines[idx].strip() == "---":
            end_idx = idx
            break
    if end_idx is None:
        raise ValidationError(f"{path} is missing closing frontmatter '---'")

    frontmatter = {}
    for line in lines[1:end_idx]:
        if not line.strip():
            continue
        if ":" not in line:
            raise ValidationError(f"Invalid frontmatter line in {path}: {line}")
        key, raw_value = line.split(":", 1)
        key = key.strip()
        value = raw_value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
            value = value[1:-1]
        if value.lower() in {"true", "false"}:
            frontmatter[key] = value.lower() == "true"
        else:
            frontmatter[key] = value

    body = "\n".join(lines[end_idx + 1 :]).strip()
    return frontmatter, body


def format_inline(markdown_text: str) -> str:
    text = html.escape(markdown_text, quote=True)

    code_spans: list[str] = []

    def capture_code(match: re.Match[str]) -> str:
        code_spans.append(match.group(1))
        return f"@@CODE_{len(code_spans) - 1}@@"

    text = re.sub(r"`([^`]+)`", capture_code, text)
    text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        r'<a href="\2" target="_blank" rel="noopener">\1</a>',
        text,
    )
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"\*([^*]+)\*", r"<em>\1</em>", text)

    for idx, code_value in enumerate(code_spans):
        escaped_code = html.escape(code_value, quote=True)
        text = text.replace(f"@@CODE_{idx}@@", f"<code>{escaped_code}</code>")

    return text


def markdown_to_html(markdown_text: str) -> str:
    lines = markdown_text.splitlines()
    output: list[str] = []
    in_ul = False
    in_ol = False
    in_code = False
    code_lines: list[str] = []

    def close_lists() -> None:
        nonlocal in_ul, in_ol
        if in_ul:
            output.append("</ul>")
            in_ul = False
        if in_ol:
            output.append("</ol>")
            in_ol = False

    for raw_line in lines:
        line = raw_line.rstrip()
        stripped = line.strip()

        if stripped.startswith("```"):
            close_lists()
            if in_code:
                output.append("<pre><code>")
                output.append(html.escape("\n".join(code_lines)))
                output.append("</code></pre>")
                code_lines = []
                in_code = False
            else:
                in_code = True
            continue

        if in_code:
            code_lines.append(line)
            continue

        if not stripped:
            close_lists()
            continue

        header_match = re.match(r"^(#{1,6})\s+(.+)$", stripped)
        if header_match:
            close_lists()
            level = len(header_match.group(1))
            content = format_inline(header_match.group(2))
            output.append(f"<h{level}>{content}</h{level}>")
            continue

        bullet_match = re.match(r"^-\s+(.+)$", stripped)
        if bullet_match:
            if in_ol:
                output.append("</ol>")
                in_ol = False
            if not in_ul:
                output.append("<ul>")
                in_ul = True
            output.append(f"<li>{format_inline(bullet_match.group(1))}</li>")
            continue

        ordered_match = re.match(r"^\d+\.\s+(.+)$", stripped)
        if ordered_match:
            if in_ul:
                output.append("</ul>")
                in_ul = False
            if not in_ol:
                output.append("<ol>")
                in_ol = True
            output.append(f"<li>{format_inline(ordered_match.group(1))}</li>")
            continue

        if stripped.startswith("> "):
            close_lists()
            output.append(f"<blockquote>{format_inline(stripped[2:].strip())}</blockquote>")
            continue

        close_lists()
        output.append(f"<p>{format_inline(stripped)}</p>")

    if in_code:
        output.append("<pre><code>")
        output.append(html.escape("\n".join(code_lines)))
        output.append("</code></pre>")
    close_lists()

    return "\n".join(output)


def validate_action(action: object, label: str) -> dict:
    if not isinstance(action, dict):
        raise ValidationError(f"{label}.action must be an object")

    for field in ("label", "url", "target"):
        assert_string(action.get(field), f"{label}.action.{field}")

    target = action["target"]
    if target not in ALLOWED_TARGETS:
        raise ValidationError(f"{label}.action.target must be one of {sorted(ALLOWED_TARGETS)}")

    return {
        "label": action["label"].strip(),
        "url": action["url"].strip(),
        "target": target,
    }


def validate_entry(entry: object) -> tuple[dict, dt.date]:
    if not isinstance(entry, dict):
        raise ValidationError("Every entry must be an object")

    entry_id = assert_string(entry.get("id"), "entry.id")
    entry_type = assert_string(entry.get("type"), f"{entry_id}.type")

    if entry_type not in ALLOWED_TYPES:
        raise ValidationError(f"{entry_id}.type must be one of {sorted(ALLOWED_TYPES)}")

    for field in COMMON_FIELDS:
        if field not in entry:
            raise ValidationError(f"{entry_id} is missing required field: {field}")

    title = assert_string(entry["title"], f"{entry_id}.title")
    summary = assert_string(entry["summary"], f"{entry_id}.summary")
    date_value = assert_string(entry["date"], f"{entry_id}.date")
    parsed_date = parse_iso_date(date_value, f"{entry_id}.date")

    tags = entry.get("tags")
    if not isinstance(tags, list) or not tags:
        raise ValidationError(f"{entry_id}.tags must be a non-empty array of strings")
    clean_tags = [assert_string(tag, f"{entry_id}.tags[]") for tag in tags]

    clean_entry = dict(entry)
    clean_entry["id"] = entry_id
    clean_entry["type"] = entry_type
    clean_entry["title"] = title
    clean_entry["summary"] = summary
    clean_entry["date"] = parsed_date.isoformat()
    clean_entry["tags"] = clean_tags
    clean_entry["action"] = validate_action(entry.get("action"), entry_id)
    clean_entry["dateLabel"] = parsed_date.strftime("%B %Y")

    required_type_fields = TYPE_FIELDS[entry_type]
    for field in required_type_fields:
        if field not in entry:
            raise ValidationError(f"{entry_id} is missing required type field: {field}")

    if entry_type in {"project", "demo"}:
        mode = assert_string(entry.get("mode"), f"{entry_id}.mode")
        if mode not in ALLOWED_MODES:
            raise ValidationError(f"{entry_id}.mode must be one of {sorted(ALLOWED_MODES)}")
        clean_entry["mode"] = mode
        clean_entry["role"] = assert_string(entry.get("role"), f"{entry_id}.role")

    if entry_type == "poster":
        clean_entry["venue"] = assert_string(entry.get("venue"), f"{entry_id}.venue")
        if not isinstance(entry.get("year"), int):
            raise ValidationError(f"{entry_id}.year must be an integer")
        clean_entry["year"] = entry["year"]
        clean_entry["thumbnail"] = assert_string(entry.get("thumbnail"), f"{entry_id}.thumbnail")

    if entry_type == "publication":
        clean_entry["authors"] = assert_string(entry.get("authors"), f"{entry_id}.authors")
        clean_entry["venue"] = assert_string(entry.get("venue"), f"{entry_id}.venue")
        pub_type = assert_string(entry.get("pubType"), f"{entry_id}.pubType")
        if pub_type not in ALLOWED_PUB_TYPES:
            raise ValidationError(
                f"{entry_id}.pubType must be one of {sorted(ALLOWED_PUB_TYPES)}"
            )
        clean_entry["pubType"] = pub_type

    if entry_type == "news":
        clean_entry["newsType"] = assert_string(entry.get("newsType"), f"{entry_id}.newsType")

    return clean_entry, parsed_date


def load_entries(entries_path: Path) -> tuple[list[dict], dict[str, dict]]:
    payload = load_json(entries_path)
    entries_raw = payload.get("entries")
    if not isinstance(entries_raw, list):
        raise ValidationError(f"{entries_path} must include an 'entries' array")

    entries: list[dict] = []
    entries_by_id: dict[str, dict] = {}
    seen_ids: set[str] = set()

    for raw in entries_raw:
        entry, _ = validate_entry(raw)
        entry_id = entry["id"]
        if entry_id in seen_ids:
            raise ValidationError(f"Duplicate entry id: {entry_id}")
        seen_ids.add(entry_id)
        entries.append(entry)
        entries_by_id[entry_id] = entry

    return entries, entries_by_id


def load_blog_posts(blog_dir: Path) -> list[dict]:
    if not blog_dir.exists():
        raise ValidationError(f"Blog directory does not exist: {blog_dir}")

    blog_posts: list[dict] = []
    seen_ids: set[str] = set()

    for file_path in sorted(blog_dir.glob("*.md")):
        raw_text = file_path.read_text(encoding="utf-8")
        frontmatter, body_markdown = parse_frontmatter(raw_text, file_path)

        missing = [field for field in BLOG_FIELDS if field not in frontmatter]
        if missing:
            raise ValidationError(f"{file_path} is missing blog fields: {', '.join(missing)}")

        post_id = assert_string(frontmatter["id"], f"{file_path}.id")
        if post_id in seen_ids:
            raise ValidationError(f"Duplicate blog id: {post_id}")
        seen_ids.add(post_id)

        date_value = assert_string(frontmatter["date"], f"{file_path}.date")
        parsed_date = parse_iso_date(date_value, f"{file_path}.date")

        post = {
            "id": post_id,
            "title": assert_string(frontmatter["title"], f"{file_path}.title"),
            "date": parsed_date.isoformat(),
            "dateLabel": parsed_date.strftime("%B %d, %Y"),
            "tag": assert_string(frontmatter["tag"], f"{file_path}.tag"),
            "excerpt": assert_string(frontmatter["excerpt"], f"{file_path}.excerpt"),
            "readTime": assert_string(frontmatter["readTime"], f"{file_path}.readTime"),
            "bodyMarkdown": body_markdown,
            "bodyHtml": markdown_to_html(body_markdown),
        }
        blog_posts.append(post)

    return blog_posts


def sort_desc(items: list[dict]) -> list[dict]:
    return sorted(items, key=lambda item: (item["date"], item["id"]), reverse=True)


def load_home_selections(
    home_path: Path, entries_by_id: dict[str, dict], blog_posts: list[dict]
) -> dict:
    payload = load_json(home_path)
    expected_fields = ("selectedWorkIds", "selectedNewsIds", "selectedBlogIds")
    for field in expected_fields:
        if field not in payload:
            raise ValidationError(f"{home_path} is missing required field: {field}")
        if not isinstance(payload[field], list):
            raise ValidationError(f"{home_path}.{field} must be an array")

    blog_ids = {post["id"] for post in blog_posts}

    for entry_id in payload["selectedWorkIds"]:
        if entry_id not in entries_by_id:
            raise ValidationError(f"home.selectedWorkIds references unknown entry id: {entry_id}")
        entry_type = entries_by_id[entry_id]["type"]
        if entry_type not in {"project", "demo", "poster"}:
            raise ValidationError(
                f"home.selectedWorkIds can only include project/demo/poster ids: {entry_id}"
            )

    for entry_id in payload["selectedNewsIds"]:
        if entry_id not in entries_by_id:
            raise ValidationError(f"home.selectedNewsIds references unknown entry id: {entry_id}")
        if entries_by_id[entry_id]["type"] != "news":
            raise ValidationError(f"home.selectedNewsIds can only include news ids: {entry_id}")

    for blog_id in payload["selectedBlogIds"]:
        if blog_id not in blog_ids:
            raise ValidationError(f"home.selectedBlogIds references unknown blog id: {blog_id}")

    return {
        "selectedWorkIds": payload["selectedWorkIds"],
        "selectedNewsIds": payload["selectedNewsIds"],
        "selectedBlogIds": payload["selectedBlogIds"],
    }


def build_payload(entries_path: Path, home_path: Path, blog_dir: Path) -> dict:
    entries, entries_by_id = load_entries(entries_path)
    blog_posts = sort_desc(load_blog_posts(blog_dir))
    home_selections = load_home_selections(home_path, entries_by_id, blog_posts)

    works = sort_desc([entry for entry in entries if entry["type"] in {"project", "demo", "poster"}])
    news = sort_desc([entry for entry in entries if entry["type"] == "news"])
    publications = sort_desc([entry for entry in entries if entry["type"] == "publication"])
    projects = sort_desc([entry for entry in entries if entry["type"] == "project"])
    demos = sort_desc([entry for entry in entries if entry["type"] == "demo"])
    posters = sort_desc([entry for entry in entries if entry["type"] == "poster"])

    return {
        "generatedAt": dt.datetime.now(dt.timezone.utc).isoformat(),
        "entriesById": entries_by_id,
        "worksByDateDesc": works,
        "newsByDateDesc": news,
        "publicationsByDateDesc": publications,
        "projectsByDateDesc": projects,
        "demosByDateDesc": demos,
        "postersByDateDesc": posters,
        "blogByDateDesc": blog_posts,
        "homeSelections": home_selections,
    }


def write_bundle(output_path: Path, payload: dict) -> None:
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_js = (
        "// Generated by scripts/build_content.py. Do not edit directly.\n"
        "window.SITE_CONTENT = "
        + json.dumps(payload, indent=2, ensure_ascii=False)
        + ";\n"
    )
    output_path.write_text(output_js, encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build content bundle for the site.")
    parser.add_argument("--check", action="store_true", help="Validate only, do not write output.")
    parser.add_argument("--entries", type=Path, default=DEFAULT_ENTRIES_PATH)
    parser.add_argument("--home", type=Path, default=DEFAULT_HOME_PATH)
    parser.add_argument("--blog-dir", type=Path, default=DEFAULT_BLOG_DIR)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT_PATH)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        payload = build_payload(args.entries, args.home, args.blog_dir)
        if args.check:
            print("Content validation passed.")
            print(
                "Counts:",
                f"entries={len(payload['entriesById'])}",
                f"works={len(payload['worksByDateDesc'])}",
                f"news={len(payload['newsByDateDesc'])}",
                f"publications={len(payload['publicationsByDateDesc'])}",
                f"blogs={len(payload['blogByDateDesc'])}",
            )
            return 0

        write_bundle(args.output, payload)
        print(f"Wrote content bundle: {args.output}")
        print(
            "Counts:",
            f"entries={len(payload['entriesById'])}",
            f"works={len(payload['worksByDateDesc'])}",
            f"news={len(payload['newsByDateDesc'])}",
            f"publications={len(payload['publicationsByDateDesc'])}",
            f"blogs={len(payload['blogByDateDesc'])}",
        )
        return 0
    except ValidationError as exc:
        print(f"Validation error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
