---
name: solomon-status
description: Portfolio report — task counts, overdue, open items per Solomon project (or one project by name).
disable-model-invocation: true
---

# Solomon status

1. If an argument names a project: `list_projects` → id → `portfolio_status projectId=<id>`. Else `portfolio_status` with no args.
2. Report as a table: project · TODO / IN_PROGRESS / IN_REVIEW / DONE · overdue · top open items.
3. Flag anything `IN_PROGRESS` with no update in 14+ days (`updatedAt` from `list_tasks`) as stale.

No writes. Read-only report.
