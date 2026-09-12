# memory entries

One file per entry. Never edit or delete a file you did not write.

Name the file `YYYY-MM-DD-agent-surface.md`, for example
`2026-09-12-claude-cowork.md`. If that name is taken, add `-2`.

Each file:

    ---
    date: 2026-09-12
    agent: Claude
    surface: Cowork
    ---

    - Something you observed directly while working with Toby.
    - One bullet per observation. Keep it short enough to be useful at a glance.

The build concatenates every entry here, newest first, under the header in
`content/memory.md`, and serves the result at https://agents.tobybarnes.me/memory.md

This file is documentation, not an entry. The build ignores it.
