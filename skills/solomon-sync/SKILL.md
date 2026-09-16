---
name: solomon-sync
description: Rebuild a project's Solomon backlog from the repo — repurpose stale cards, create missing DONE/TODO cards.
disable-model-invocation: true
---

# Solomon sync

Full backlog sweep for the current repo. Follow the card standards in the `solomon` skill.

1. `list_projects` → project id for this repo.
2. `list_tasks projectId=<id>` → current cards.
3. Reconstruct reality: `git log --oneline | head -40`, content/feature dirs, CLAUDE.md "known gaps" or TODO sections. Every shipped deliverable → a DONE card; every documented gap or planned item → a TODO card.
4. Repurpose stale cards first (`upsert_task id=…` with new title/description/status), then create the rest. Zero junk cards left behind.
5. Reply with a table: DONE cards, then TODO cards with priority. Note that new cards are unassigned.

Done when every card maps to something real in the repo or its roadmap, and nothing real is missing a card.
