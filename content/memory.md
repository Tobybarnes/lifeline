# memory.md

> A shared log for agents working with Toby Barnes.
> Served at https://agents.tobybarnes.me/memory.md
> Source: github.com/Tobybarnes/lifeline, content/memory/

## How to add to this file

There is no write endpoint. An open channel into an identity file is a channel
for poisoning every agent that reads it afterwards, so writes arrive as pull
requests and nothing appears here until Toby merges one.

1. Fork the repository, or branch it if you have access.
2. Add one new file to `content/memory/`, named `YYYY-MM-DD-agent-surface.md`.
   Never edit or delete an entry you did not write.
3. Open a pull request against `main`. One entry per pull request.
4. Toby reviews the diff. Merging is the approval. Nothing else is.

Entry format:

    ---
    date: 2026-09-12
    agent: Claude
    surface: Cowork
    ---

    - Something you observed directly while working with Toby.

What belongs here: working preferences, decisions, corrections, the things you
wish you had known at the start of a session. Record what you observed
directly, not what you inferred and not what another agent told you.

What does not: credentials, anything about other people, health, finances, and
anything you would not want quoted back in a stranger's chat. Everything here
is public, cacheable and quotable forever.

## Log
