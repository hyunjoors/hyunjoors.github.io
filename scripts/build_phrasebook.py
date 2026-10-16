#!/usr/bin/env python3
"""Build the Phrasebook bundle from content/phrasebook.md.

Source format: every entry is written as a Unix man page.

  # N. "하고 싶은 말" — Function Label    -> section N (man section number)
  ## headword                             -> entry, anchor = slugified headword
  ### NAME                                -> "headword — 뜻", one line per name (first = primary,
                                             the rest become aliases that also resolve as links)
  ### DESCRIPTION                         -> why the phrase is useful
  ### EXAMPLES                            -> list of example sentences
  ### SEE ALSO                            -> list of related frames, plus one cross-reference line:
                                             represent(1), shape(2), ground
                                             (numbers are optional; the build fills in the real
                                             section and warns if a written number is wrong)
  ### CAVEATS                             -> nuance / Korean-English differences / overclaiming
  any other ### heading                   -> extra man section with that name

### NAME / ### DESCRIPTION above the first "# N." heading become the phrasebook(7) intro.

The older format (**headword = 뜻**, ### 같이 익혀둘 표현, → 관련 표현: [x](#x), ### 뉘앙스 차이)
is still accepted.

Cross-references to entries that do not exist yet are kept as "planned" (rendered greyed out);
the build prints them, so the list doubles as a to-do list.

Usage:
  python3 scripts/build_phrasebook.py            # write site/generated/phrasebook.bundle.js
  python3 scripts/build_phrasebook.py --check    # validate only
"""
from __future__ import annotations

import argparse
import datetime as dt
import html
import json
import re
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = REPO_ROOT / "content" / "phrasebook.md"
DEFAULT_OUTPUT = REPO_ROOT / "site" / "generated" / "phrasebook.bundle.js"

# ### heading text (lowercased) -> man section kind
SUBSECTION_KINDS = {
    "name": "name",
    "description": "description",
    "examples": "examples",
    "example": "examples",
    "예문": "examples",
    "see also": "related",
    "같이 익혀둘 표현": "related",
    "related": "related",
    "caveats": "caveats",
    "뉘앙스 차이": "caveats",
    "뉘앙스": "caveats",
    "nuance": "caveats",
}

SECTION_RE = re.compile(r"^#\s+(.+)$")
ENTRY_RE = re.compile(r"^##\s+(.+)$")
SUB_RE = re.compile(r"^###\s+(.+)$")
ARROW_XREF_RE = re.compile(r"^(?:→|->)\s*(?:관련\s*표현|see\s+also)\s*:\s*(.*)$", re.I)
LINK_RE = re.compile(r"\[([^\]]+)\]\(([^)]*)\)")
LIST_RE = re.compile(r"^(\s*)([-*+]|\d+[.)])\s+(.*)$")
BOLD_LINE_RE = re.compile(r"^\*\*(.+?)\*\*$")
NAME_SEP_RE = re.compile(r"\s+(?:—|–|-|=)\s+")
XREF_TOKEN_RE = re.compile(r"^([A-Za-z0-9][A-Za-z0-9-]*)(?:\((\d+)\))?$")


class BuildError(Exception):
    pass


def slugify(text: str) -> str:
    s = text.strip().lower()
    s = re.sub(r"[’']", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def link_target(label: str, url: str) -> tuple[str, bool]:
    """Return (slug_or_url, is_internal). Old chatgpt.com links count as internal."""
    url = url.strip()
    if url.startswith("#"):
        return (url[1:] or slugify(label)), True
    if "chatgpt.com" in url:
        frag = url.split("#", 1)[1] if "#" in url else ""
        return (frag or slugify(label)), True
    return url, False


def parse_name_line(line: str) -> tuple[str, str]:
    s = line.strip()
    m = BOLD_LINE_RE.match(s)
    if m:
        s = m.group(1).strip()
    parts = NAME_SEP_RE.split(s, maxsplit=1)
    if len(parts) == 1 and "=" in s:
        parts = s.split("=", 1)
    name = parts[0].strip().strip("*").strip()
    meaning = parts[1].strip().strip("*").strip() if len(parts) > 1 else ""
    return name, meaning


def take_bold_names(lines: list[str]) -> tuple[list[tuple[str, str]], list[str]]:
    """Old format: leading '**headword = 뜻**' lines."""
    idx = 0
    while idx < len(lines) and not lines[idx].strip():
        idx += 1
    names = []
    while idx < len(lines):
        m = BOLD_LINE_RE.match(lines[idx].strip())
        if not (m and "=" in m.group(1)):
            break
        names.append(parse_name_line(lines[idx]))
        idx += 1
    return names, lines[idx:]


def xref_line(line: str) -> list[tuple[str, int | None]] | None:
    """'represent(1), shape(2), ground' or '[a](#a), [b](#b)' -> [(slug, section|None)]."""
    s = line.strip().rstrip(".")
    if not s:
        return None
    if LINK_RE.search(s):
        if re.sub(r"[,\s]", "", LINK_RE.sub("", s)):
            return None
        out = []
        for m in LINK_RE.finditer(s):
            slug, internal = link_target(m.group(1), m.group(2))
            if internal:
                out.append((slug, None))
        return out or None
    out = []
    for tok in s.split(","):
        tok = tok.strip()
        if not tok:
            continue
        m = XREF_TOKEN_RE.match(tok)
        if not m:
            return None
        out.append((m.group(1).lower(), int(m.group(2)) if m.group(2) else None))
    return out or None


# ─────────────────────────── markdown → html ───────────────────────────

class Renderer:
    def __init__(self, alias_map: dict[str, str]):
        self.alias = alias_map
        self.missing_refs: list[str] = []

    def inline(self, text: str) -> str:
        codes: list[str] = []

        def keep_code(m: re.Match[str]) -> str:
            codes.append(m.group(1))
            return "\x00%d\x00" % (len(codes) - 1)

        text = re.sub(r"`([^`]+)`", keep_code, text)
        text = html.escape(text, quote=False)

        def link(m: re.Match[str]) -> str:
            label = m.group(1)
            target, internal = link_target(html.unescape(label), html.unescape(m.group(2)))
            if not internal:
                return '<a href="%s" target="_blank" rel="noopener">%s</a>' % (
                    html.escape(target, quote=True), label)
            if target in self.alias:
                slug = self.alias[target]
                return '<a class="pb-xref" href="#%s" data-ref="%s">%s</a>' % (slug, slug, label)
            self.missing_refs.append(target)
            return '<span class="pb-xref planned" data-ref="%s">%s</span>' % (target, label)

        text = LINK_RE.sub(link, text)
        text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
        text = re.sub(r"(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])", r"<em>\1</em>", text)
        for idx, code in enumerate(codes):
            text = text.replace("\x00%d\x00" % idx, "<code>%s</code>" % html.escape(code, quote=False))
        return text

    def paragraph(self, lines: list[str]) -> str:
        parts = []
        for k, ln in enumerate(lines):
            hard_break = ln.endswith("  ") and k < len(lines) - 1
            parts.append(self.inline(ln.strip()) + ("<br>" if hard_break else ""))
        return "<p>%s</p>" % " ".join(parts)

    def list_items(self, lines: list[str]) -> list[tuple[int, str, bool]]:
        items: list[list] = []
        for raw in lines:
            m = LIST_RE.match(raw)
            if m:
                items.append([len(m.group(1).expandtabs(4)), m.group(3).strip(), m.group(2)[0].isdigit()])
            elif items and raw.strip():
                items[-1][1] += " " + raw.strip()
        return [(i[0], i[1], i[2]) for i in items]

    def render_list(self, items: list[tuple[int, str, bool]]) -> str:
        out: list[str] = []
        stack: list[tuple[int, bool]] = []
        for indent, text, ordered in items:
            if not stack or indent > stack[-1][0]:
                out.append("<ol>" if ordered else "<ul>")
                stack.append((indent, ordered))
                out.append("<li>" + self.inline(text))
                continue
            while len(stack) > 1 and indent < stack[-1][0]:
                out.append("</li></ol>" if stack.pop()[1] else "</li></ul>")
            out.append("</li><li>" + self.inline(text))
        while stack:
            out.append("</li></ol>" if stack.pop()[1] else "</li></ul>")
        return "".join(out)

    def blocks(self, lines: list[str]) -> str:
        out: list[str] = []
        i, n = 0, len(lines)
        while i < n:
            raw = lines[i]
            if not raw.strip():
                i += 1
                continue
            if LIST_RE.match(raw):
                chunk: list[str] = []
                while i < n:
                    raw = lines[i]
                    if not raw.strip():
                        j = i + 1
                        while j < n and not lines[j].strip():
                            j += 1
                        if j < n and (LIST_RE.match(lines[j]) or lines[j].startswith((" ", "\t"))):
                            i = j
                            continue
                        break
                    if not LIST_RE.match(raw) and not raw.startswith((" ", "\t")):
                        break
                    chunk.append(raw)
                    i += 1
                out.append(self.render_list(self.list_items(chunk)))
                continue
            if raw.lstrip().startswith(">"):
                quote: list[str] = []
                while i < n and lines[i].lstrip().startswith(">"):
                    quote.append(lines[i].lstrip()[1:].strip())
                    i += 1
                out.append("<blockquote>%s</blockquote>" % "<br>".join(self.inline(q) for q in quote if q))
                continue
            para: list[str] = []
            while i < n and lines[i].strip() and not LIST_RE.match(lines[i]) \
                    and not lines[i].lstrip().startswith(">"):
                para.append(lines[i])
                i += 1
            out.append(self.paragraph(para))
        return "\n".join(out)


def plain_text(fragment: str) -> str:
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", fragment))).strip()


# ─────────────────────────── structure ───────────────────────────

def parse_section_heading(title: str, fallback_num: int) -> dict:
    m = re.match(r"^(\d+)[.)]\s*(.+)$", title.strip())
    num = int(m.group(1)) if m else fallback_num
    rest = m.group(2) if m else title.strip()
    intent, label = rest, ""
    for sep in (" — ", " – ", " - "):
        if sep in rest:
            intent, label = rest.split(sep, 1)
            break
    return {"num": num, "intent": intent.strip().strip("“”\"'"), "label": label.strip(), "entries": []}


def new_entry(headword: str, section: int) -> dict:
    return {"headword": headword, "section": section, "intro": [], "subs": [], "xrefs": []}


def parse(source: str) -> tuple[dict, list[dict], list[dict]]:
    text = re.sub(r"<!--.*?-->", "", source, flags=re.S)
    preamble = new_entry("phrasebook", 7)
    sections: list[dict] = []
    entries: list[dict] = []
    section = None
    entry = preamble
    target = preamble["intro"]

    for raw in text.splitlines():
        line = raw.rstrip("\r\n")
        s = line.strip()
        if s in ("---", "***", "___"):
            continue
        m = SECTION_RE.match(s)
        if m and not s.startswith("##"):
            section = parse_section_heading(m.group(1), len(sections) + 1)
            sections.append(section)
            entry = None
            target = []  # text between a section heading and its first entry is ignored
            continue
        m = ENTRY_RE.match(s)
        if m and not s.startswith("###"):
            if section is None:
                section = parse_section_heading("1. General", 1)
                sections.append(section)
            entry = new_entry(m.group(1).strip(), section["num"])
            entries.append(entry)
            section["entries"].append(entry)
            target = entry["intro"]
            continue
        m = SUB_RE.match(s)
        if m and entry is not None:
            heading = m.group(1).strip()
            sub = {"heading": heading, "kind": SUBSECTION_KINDS.get(heading.lower(), "other"), "lines": []}
            entry["subs"].append(sub)
            target = sub["lines"]
            continue
        m = ARROW_XREF_RE.match(s)
        if m and entry is not None:
            entry["xrefs"].extend({"slug": slug, "written": sec} for slug, sec in (xref_line(m.group(1)) or []))
            continue
        target.append(line)
    return preamble, sections, entries


def collect(e: dict) -> None:
    """Split an entry's raw lines into names / description / examples / related / caveats / extra."""
    names: list[tuple[str, str]] = []
    desc = list(e["intro"])
    e.update(examples=[], related=[], examples_note=[], related_note=[], caveats=[], extra=[])
    for sub in e["subs"]:
        kind, lines = sub["kind"], sub["lines"]
        if kind == "name":
            names.extend(parse_name_line(ln) for ln in lines if ln.strip())
        elif kind == "description":
            desc += [""] + lines
        elif kind == "caveats":
            e["caveats"] += [""] + lines
        elif kind in ("examples", "related"):
            for ln in lines:
                if not ln.strip():
                    continue
                if LIST_RE.match(ln) or ln.startswith((" ", "\t")):
                    e[kind].append(ln)
                    continue
                refs = xref_line(ln) if kind == "related" else None
                if refs:
                    e["xrefs"].extend({"slug": slug, "written": sec} for slug, sec in refs)
                else:
                    e[kind + "_note"].append(ln)
        else:
            e["extra"].append((sub["heading"].upper(), lines))
    if not names:
        names, desc = take_bold_names(desc)
    if not names:
        names = [(e["headword"], "")]
    e["names"] = names
    e["desc"] = desc


def build(source_path: Path) -> tuple[dict, list[str]]:
    if not source_path.exists():
        raise BuildError("missing source file: %s" % source_path)
    preamble, sections, raw_entries = parse(source_path.read_text(encoding="utf-8"))
    warnings: list[str] = []

    nums = [s["num"] for s in sections]
    if len(nums) != len(set(nums)):
        raise BuildError("duplicate section numbers: %s" % nums)

    # pass 1: names, slugs, aliases
    alias: dict[str, str] = {}
    by_slug: dict[str, dict] = {}
    for e in raw_entries:
        collect(e)
        e["slug"] = slugify(e["headword"])
        if not e["slug"]:
            raise BuildError("entry %r has an empty anchor" % e["headword"])
        if e["slug"] in alias:
            raise BuildError("duplicate entry %r" % e["slug"])
        by_slug[e["slug"]] = e
        alias[e["slug"]] = e["slug"]
    for e in raw_entries:
        for name, _ in e["names"]:
            a = slugify(name)
            if not a or a == e["slug"]:
                continue
            if a in alias and alias[a] != e["slug"]:
                warnings.append("%s: name %r already used by %s" % (e["slug"], name, alias[a]))
                continue
            alias[a] = e["slug"]
    collect(preamble)

    # pass 2: render
    r = Renderer(alias)
    entries_out: dict[str, dict] = {}
    planned: dict[str, list[str]] = {}

    for e in raw_entries:
        out = {
            "slug": e["slug"],
            "headword": e["headword"],
            "section": e["section"],
            "names": [{"name": n, "meaning": m} for n, m in e["names"]],
            "meaning": e["names"][0][1],
            "description": r.blocks(e["desc"]),
            "examples": [r.inline(t) for _, t, _ in r.list_items(e["examples"])],
            "examplesNote": r.blocks(e["examples_note"]),
            "related": [r.inline(t) for _, t, _ in r.list_items(e["related"])],
            "relatedNote": r.blocks(e["related_note"]),
            "caveats": r.blocks(e["caveats"]),
            "extra": [{"heading": h, "html": r.blocks(lines)} for h, lines in e["extra"]],
            "xrefs": [],
        }
        if not out["meaning"]:
            warnings.append("%s: NAME has no meaning (write 'headword — 뜻')" % e["slug"])
        if not out["examples"]:
            warnings.append("%s: no examples" % e["slug"])

        seen = set()
        for x in e["xrefs"]:
            slug = alias.get(x["slug"], x["slug"])
            if slug in seen or slug == e["slug"]:
                continue
            seen.add(slug)
            target = by_slug.get(slug)
            if target is None:
                planned.setdefault(slug, []).append(e["slug"])
            elif x["written"] is not None and x["written"] != target["section"]:
                warnings.append("%s: SEE ALSO %s(%d) is actually in section %d (fixed)"
                                % (e["slug"], slug, x["written"], target["section"]))
            out["xrefs"].append({"slug": slug, "exists": target is not None,
                                 "section": target["section"] if target else None})

        out["text"] = " ".join([
            " ".join("%s %s" % nm for nm in e["names"]),
            plain_text(out["description"]),
            " ".join(plain_text(h) for h in out["examples"]),
            " ".join(plain_text(h) for h in out["related"]),
            plain_text(out["caveats"]),
            " ".join(plain_text(x["html"]) for x in out["extra"]),
        ]).lower()
        entries_out[e["slug"]] = out

    for slug in r.missing_refs:
        planned.setdefault(slug, [])

    intro_name = preamble["names"][0][1]
    payload = {
        "updated": dt.date.fromtimestamp(source_path.stat().st_mtime).isoformat(),
        "intro": {"name": intro_name, "description": r.blocks(preamble["desc"])},
        "sections": [{"num": s["num"], "intent": s["intent"], "label": s["label"],
                      "entries": [slugify(e["headword"]) for e in s["entries"]]} for s in sections],
        "order": [e["slug"] for e in raw_entries],
        "entries": entries_out,
        "aliases": {a: s for a, s in alias.items() if a != s},
        "planned": sorted(planned),
    }
    notes = warnings + ["planned: %s  (from %s)" % (k, ", ".join(sorted(set(v))) or "inline link")
                        for k, v in sorted(planned.items())]
    return payload, notes


def write_bundle(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    body = json.dumps(payload, ensure_ascii=False, indent=2)
    path.write_text(
        "/* Generated by scripts/build_phrasebook.py from content/phrasebook.md. Do not edit by hand. */\n"
        "window.PHRASEBOOK = %s;\n" % body,
        encoding="utf-8",
    )


def main() -> int:
    p = argparse.ArgumentParser(description="Build site/generated/phrasebook.bundle.js from content/phrasebook.md")
    p.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    p.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    p.add_argument("--check", action="store_true", help="validate only, do not write the bundle")
    args = p.parse_args()
    try:
        payload, notes = build(args.source)
    except BuildError as exc:
        print("Phrasebook error: %s" % exc, file=sys.stderr)
        return 1
    for note in notes:
        print("  - " + note)
    summary = "%d sections, %d entries, %d planned" % (
        len(payload["sections"]), len(payload["entries"]), len(payload["planned"]))
    if args.check:
        print("Phrasebook check passed: " + summary)
        return 0
    write_bundle(args.output, payload)
    print("Wrote %s (%s)" % (args.output, summary))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
