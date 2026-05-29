#!/usr/bin/env python3
"""One-shot migration: legacy entries.json → new schema.

Schema:
  publication: id, type, date, title, keywords[], description?, pubType, venue?, authors[], pdfUrl?
  presentation: id, type, date, title, keywords[], description?, presType, venue?, authors[], attachmentUrl?
  project: id, type, date, title, keywords[], description, authors[], url?, mode (external|embedded)
  news: id, type, date, title, keywords[], description?, url?

home.json: { "recentNewsIds": [<=5] }
"""
from __future__ import annotations

import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
ENTRIES_PATH = REPO_ROOT / "content" / "entries.json"
HOME_PATH = REPO_ROOT / "content" / "home.json"

ME = "Shin, R."


def authors_from_str(value: str) -> list[dict]:
    parts = [p.strip() for p in (value or "").split(",") if p.strip()]
    return [{"name": p, "me": p == ME or p.lower() == "rosalyn shin"} for p in parts]


def make_description(old: dict) -> str:
    bits = [old.get("summary", "").strip()]
    if old.get("role"):
        bits.append(f"Role: {old['role']}")
    if old.get("tagline"):
        bits.append(old["tagline"])
    return "\n\n".join(b for b in bits if b)


def migrate_entry(old: dict) -> dict:
    t = old["type"]
    common = {
        "id": old["id"],
        "date": old["date"],
        "title": old["title"],
        "keywords": list(old.get("tags", [])),
    }

    if t == "project":
        return {
            **common,
            "type": "project",
            "description": make_description(old),
            "authors": [{"name": ME, "me": True}],
            "url": old.get("action", {}).get("url", ""),
            "mode": old.get("mode", "external"),
        }

    if t == "demo":
        return {
            **common,
            "type": "presentation",
            "presType": "Demo",
            "description": make_description(old),
            "venue": old.get("venue", ""),
            "authors": [{"name": ME, "me": True}],
            "attachmentUrl": "",
        }

    if t == "poster":
        url = old.get("action", {}).get("url", "")
        return {
            **common,
            "type": "presentation",
            "presType": "Refereed Posters",
            "description": old.get("summary", "").strip(),
            "venue": old.get("venue", ""),
            "authors": [{"name": ME, "me": True}],
            "attachmentUrl": old.get("thumbnail") or url,
        }

    if t == "publication":
        return {
            **common,
            "type": "publication",
            "pubType": "Refereed Conference Proceedings",
            "description": old.get("summary", "").strip(),
            "venue": old.get("venue", ""),
            "authors": authors_from_str(old.get("authors", "")),
            "pdfUrl": "",
        }

    if t == "news":
        return {
            **common,
            "type": "news",
            "description": old.get("summary", "").strip(),
            "url": "",
        }

    raise ValueError(f"Unknown legacy type: {t}")


def main() -> int:
    legacy = json.loads(ENTRIES_PATH.read_text(encoding="utf-8"))
    migrated = [migrate_entry(e) for e in legacy["entries"]]
    ENTRIES_PATH.write_text(
        json.dumps({"entries": migrated}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    old_home = json.loads(HOME_PATH.read_text(encoding="utf-8"))
    ids: list[str] = []
    for key in ("selectedWorkIds", "selectedNewsIds"):
        for entry_id in old_home.get(key, []):
            if entry_id not in ids and any(e["id"] == entry_id for e in migrated):
                ids.append(entry_id)
    ids = ids[:5]
    HOME_PATH.write_text(
        json.dumps({"recentNewsIds": ids}, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"Migrated {len(migrated)} entries.")
    pubs = [e for e in migrated if e["type"] == "publication"]
    if pubs:
        print(f"NOTE: {len(pubs)} publication(s) defaulted pubType='Refereed Conference Proceedings'; review in notebook.")
    print(f"home.json recentNewsIds = {ids}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
