#!/usr/bin/env node
// SessionStart — one line so the agent knows Solomon logging is on this session.
process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: 'SessionStart',
    additionalContext:
      'SOLOMON LOGGING ACTIVE. Every task you start, ship, or plan gets a Solomon card (skill: solomon). ' +
      'Update the card in the same turn as the commit/merge/deploy.',
  },
}));
