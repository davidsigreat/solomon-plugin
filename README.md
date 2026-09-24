# solomon — Claude Code plugin

Keeps [Solomon](https://solomondash.vercel.app) current while you work. Cards get created/updated as tasks start, ship, and get planned.

## What's inside

| Piece | Purpose |
|---|---|
| `skills/solomon` | Model-invoked. Fires on start/finish/commit/plan. Card standards live here. |
| `skills/solomon-sync` | `/solomon-sync` — rebuild a project's backlog from the repo. |
| `skills/solomon-status` | `/solomon-status [project]` — read-only portfolio report. |
| `hooks/session-start.js` | Arms logging each session. |
| `hooks/ship-reminder.js` | After `git commit/push/merge`, `gh pr create/merge`, `vercel deploy` → reminds the agent to update the card. |
| `.mcp.json` | Solomon MCP server (HTTP). Key + URL come from plugin `userConfig` (prompted at install). |

## Install

```bash
claude plugin marketplace add DevColaDavid/solomon-plugin
claude plugin install solomon@solomon
```

On install Claude Code prompts for **Solomon API key** (mint in Solomon → Profile, `sk_live_…`). Stored in Keychain, never in a file. Change later: `/plugin` → solomon → Configure, or `claude plugin config solomon`.

Already have `solomon` in `~/.claude.json` `mcpServers`? Remove it — the plugin's `.mcp.json` replaces it (otherwise tools appear twice).

## Card standards (short)

- Title: `<Area> — <what>`, ≤ 80 chars.
- Description: 1–3 sentences, commit hash / PR # on DONE.
- Priority: CRITICAL prod-broken · HIGH core · MEDIUM default · LOW polish.
- One card per user-visible deliverable, never per commit.
- No delete via MCP → stale cards get rewritten, not duplicated.
