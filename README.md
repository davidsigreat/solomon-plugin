# solomon — Claude Code plugin

Keeps [Solomon](https://solomondash.vercel.app) current while you work. Claude creates and updates task cards as work starts, ships, and gets planned, so your project board matches your repo without manual bookkeeping.

## Requirements

- [Claude Code](https://claude.com/claude-code)
- A Solomon account and an API key (Solomon → Profile → mint key, `sk_live_…`). The key needs MEMBER or ADMIN on a project to write cards; VIEWER keys are read-only.
- Node.js on your `PATH` (the hooks are small Node scripts)

## Install

```bash
claude plugin marketplace add davidsigreat/solomon-plugin
claude plugin install solomon@solomon
```

Or inside Claude Code: `/plugin marketplace add davidsigreat/solomon-plugin`, then `/plugin install solomon@solomon`.

During install Claude Code prompts for:

| Setting | Notes |
|---|---|
| **Solomon API key** | Stored in your system keychain, never written to a file. |
| **Solomon MCP URL** | Leave the default unless you self-host Solomon. |

Restart Claude Code after installing. To change either value later: `/plugin` → solomon → Configure.

## What you get

| Piece | What it does |
|---|---|
| `solomon` skill | Claude invokes it on its own when you start, finish, commit, deploy, or mention future work. Holds the card standards below. |
| `/solomon-sync` | Rebuilds the current repo's backlog: repurposes stale cards, creates missing DONE/TODO cards. |
| `/solomon-status [project]` | Read-only portfolio report: counts per status, overdue items, stale in-progress cards. |
| SessionStart hook | Tells Claude each session that logging is on. |
| PostToolUse hook | After `git commit/push/merge`, `gh pr create/merge`, `vercel deploy`, or `npm publish` succeeds, reminds Claude to update the card. |
| MCP server | Solomon's HTTP MCP endpoint (`list_projects`, `list_tasks`, `portfolio_status`, `upsert_task`). |

Claude matches the current repo to a Solomon project by name. If it can't tell which project, it asks. Projects must already exist in Solomon; the plugin can't create them.

## Card standards

- **Title:** `<Area> — <what>`, ≤ 80 chars, e.g. `Auth — Google sign-in`.
- **Description:** 1–3 sentences. DONE cards include the commit hash or PR #.
- **Priority:** CRITICAL = prod broken · HIGH = core feature · MEDIUM = default · LOW = polish.
- **Granularity:** one card per user-visible deliverable, not per commit.
- **No deletes** via MCP: stale cards get rewritten into live ones instead of duplicated.

## Update / uninstall

```bash
claude plugin marketplace update solomon   # pull the latest version
claude plugin uninstall solomon@solomon
```

## Troubleshooting

- **Solomon tools show up twice:** you also have a manual `solomon` server under `mcpServers` in `~/.claude.json` (top level or inside a project). Remove it; the plugin provides the server.
- **401 / unauthorized:** the key was revoked or mistyped. Mint a new one and re-enter it via `/plugin` → solomon → Configure.
- **Hooks don't fire:** check that `node --version` works in the shell Claude Code runs in.

## Developing

Clone the repo and install from the local path:

```bash
claude plugin marketplace add ./solomon-plugin
claude plugin install solomon@solomon
claude plugin validate ./solomon-plugin
```

When Claude Code runs *inside* this repo, it also sees `.mcp.json` as a project MCP server, where `${user_config.*}` doesn't resolve. Decline it when prompted (or add `solomon` to `disabledMcpjsonServers` for this project).

To release: bump `version` in `.claude-plugin/plugin.json`, commit, push.

## License

MIT
