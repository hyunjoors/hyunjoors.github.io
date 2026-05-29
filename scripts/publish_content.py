#!/usr/bin/env python3
"""Build content, show git dry-run summary, and optionally push."""

from __future__ import annotations

import argparse
import datetime as dt
import subprocess
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
BUILD_SCRIPT = REPO_ROOT / "scripts" / "build_content.py"


def run(cmd: list[str], check: bool = True) -> subprocess.CompletedProcess[str]:
    print(f"$ {' '.join(cmd)}")
    return subprocess.run(
        cmd,
        cwd=REPO_ROOT,
        check=check,
        text=True,
        capture_output=True,
    )


def print_result(result: subprocess.CompletedProcess[str]) -> None:
    if result.stdout.strip():
        print(result.stdout.strip())
    if result.stderr.strip():
        print(result.stderr.strip(), file=sys.stderr)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build and optionally publish content updates.")
    parser.add_argument("--target-branch", default="main")
    parser.add_argument("--commit-message", default="")
    parser.add_argument("--push-confirm", action="store_true")
    parser.add_argument("--no-push", action="store_true")
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    build = run([sys.executable, str(BUILD_SCRIPT)])
    print_result(build)

    status = run(["git", "status", "--short"])
    print("Git status --short:")
    if status.stdout.strip():
        print(status.stdout.strip())
    else:
        print("(no changes)")

    if args.no_push:
        print("No-push mode enabled. Build completed without commit/push.")
        return 0

    if not args.push_confirm:
        print("Push not confirmed. Set --push-confirm to commit and push.")
        return 0

    if not status.stdout.strip():
        print("No content changes to commit.")
        return 0

    commit_message = args.commit_message.strip()
    if not commit_message:
        timestamp = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
        commit_message = f"Content update: {timestamp}"

    add = run(["git", "add", "-A"])
    print_result(add)

    commit = run(["git", "commit", "-m", commit_message])
    print_result(commit)

    push = run(["git", "push", "origin", f"HEAD:{args.target_branch}"])
    print_result(push)
    print(f"Pushed to origin/{args.target_branch}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
