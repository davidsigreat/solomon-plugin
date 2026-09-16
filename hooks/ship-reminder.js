#!/usr/bin/env node
// PostToolUse(Bash) — after a shipping command lands, remind the agent to update Solomon.
// Reads the hook payload from stdin; emits additionalContext only when the command shipped something.
const SHIP = /\bgit\s+(commit|push|merge)\b|\bgh\s+pr\s+(create|merge)\b|\bvercel\s+(deploy|--prod)|\bnpm\s+publish\b/;

let input = '';
process.stdin.on('data', (c) => (input += c));
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input.replace(/^﻿/, ''));
    const cmd = (data.tool_input && data.tool_input.command) || '';
    const failed = data.tool_response && /exit code [1-9]/i.test(JSON.stringify(data.tool_response));
    if (!SHIP.test(cmd) || failed) return;
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PostToolUse',
        additionalContext:
          'Shipping command ran (' + cmd.match(SHIP)[0] + '). Update the Solomon card now: ' +
          'status DONE (or IN_PROGRESS if more commits coming), add the commit hash / PR # to the description. Skill: solomon.',
      },
    }));
  } catch {
    /* malformed payload — stay silent */
  }
});
