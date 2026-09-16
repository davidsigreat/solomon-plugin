---
name: solomon
description: Log work to Solomon (cross-project task hub). Use when starting, finishing, committing, or deploying a feature/fix/content batch; when the user says "log this", "track this", "update solomon", "add a card"; or when future work is mentioned ("later", "next", "we should"). Holds the card standards (title, description, priority, status) every Solomon write must follow.
---

# Solomon

Solomon is the status hub across all of David's projects. Every meaningful unit of work — a feature, fix, content batch, migration — gets a **card** (task), kept current as work moves. The repo is the source of truth for *what* changed; Solomon is the source of truth for *where things stand*.

Tools (load with `ToolSearch` query `solomon`): `list_projects`, `list_tasks`, `portfolio_status`, `upsert_task`. No delete, no assignee, no project create — see Limits.

Related: `/solomon-sync` (rebuild a project's backlog from the repo), `/solomon-status` (portfolio report).

## When to write

| Moment | Action |
|---|---|
| Starting a task the user asked for | Find or create card → `IN_PROGRESS` |
| Commit / merge / deploy lands | Card → `DONE`, description gets commit hash or PR # |
| User mentions future work | Create card → `TODO`, mention it in reply |
| Blocked, or handed off for review | `IN_REVIEW`, blocker in description |
| Scope grows past the card's title | Update title; one deliverable = one card |

One write per state change, in the same turn it happens. A card updated three turns later is a card that gets forgotten. The `ship-reminder` hook nudges after `git commit/push/merge`, `gh pr create/merge`, `vercel deploy` — act on it.

## Procedure

1. `list_projects` → match repo to project by name (`67Study` → "67 Study App"). Cache the id for the session. Unknown repo → ask which project.
2. `list_tasks projectId=<id>` → find an existing card covering this work. Match on subject/feature, not exact title.
3. `upsert_task` — `id` to update, `projectId` to create. Always pass `status` and `priority`.
4. Reply with one line: `Solomon: "<title>" → DONE`.

## Card standards

**Title** — `<Area> — <what shipped/will ship>`, ≤ 80 chars, noun phrase, no trailing period.
- `AP Chemistry — 9 units content`
- `Firebase backend — auth, chat, admin panel, progress sync (v2.0.0)`
- `Quiz / flashcard mode` (no prefix when the card *is* the area)

**Description** — 1–3 sentences: scope, key details. DONE cards carry the commit hash / PR #. TODO cards carry the gap they close. Empty description is a defect.

**Priority**
- `CRITICAL` — prod broken, data loss, auth hole
- `HIGH` — core feature or user-blocking gap
- `MEDIUM` — default
- `LOW` — docs, polish, nice-to-have

**Status** — `TODO` → `IN_PROGRESS` → `IN_REVIEW` (optional) → `DONE`. A card never stays `IN_PROGRESS` past the turn the work ships.

**Granularity** — one card per deliverable a user would notice: a subject's content, a feature, an infra change. Not per file, not per commit. Related commits ("restructure + add videos") are one card.

## Limits (MCP)

- **No delete.** Stale card → rewrite it into a live one via `upsert_task id=…`. Reuse before create.
- **No assignee.** New cards ship unassigned; say so once per batch.
- **No project create.** Ask the user to make it in the Solomon UI.
- `startDate` / `dueDate` — ISO string or null; set only when the user gives a date.
