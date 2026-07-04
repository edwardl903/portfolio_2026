# Cursor: best practices and practical tips

Short guide for using Cursor well on this repo and in general. Pair this with `docs/cursor-workflow.md` (repo-specific agent rules).

---

## 1. Three layers of guidance (use all three)

| Layer | Where | What it is |
|-------|--------|------------|
| **Rules** | `.cursor/rules/*.mdc` | Injected when globs match or `alwaysApply: true`. Keep them short and actionable. |
| **Project docs** | `docs/*.md` | Deep context: architecture, design, content. Humans and agents read these. |
| **Skills** | `~/.cursor/skills/` (personal) or `.cursor/skills/` (project) | Task playbooks in `SKILL.md`. Good for repeatable workflows (deploy, PR review). Do not put custom skills in `~/.cursor/skills-cursor/` (reserved for Cursor). |

This project uses **rules** plus **`docs/cursor-workflow.md`** as the source of truth for edits here.

---

## 2. Rules (`.cursor/rules`)

- Use **`.mdc`** files with YAML frontmatter (`description`, `globs`, `alwaysApply`).
- Prefer **one concern per file** and **under ~50 lines** per rule when possible.
- Use `alwaysApply: true` only for a few global invariants; use `globs` for file-type rules (e.g. `**/*.css`).

---

## 3. Chat modes and when to use them

- **Agent**: edits files, runs terminal, best for implementation and refactors.
- **Ask**: read-only Q&A when you do not want the repo touched.
- **Plan** (if available): bigger design tradeoffs before a large change.

Use **@** to ground the model: `@file`, `@folder`, `@Docs`, `@Web` (when you need current facts).

---

## 4. Habits that pay off

1. **Say the scope**: which page, route, or file; desktop vs mobile if UI.
2. **One request per turn when possible**; stack follow-ups after you verify.
3. **Ask for a build** after non-trivial changes (`npm run build` here).
4. **Commit often**; small commits make Vercel history and rollback easier.
5. **`.cursorignore`**: exclude huge or generated paths if indexing is slow (optional).

---

## 5. Repo-specific reminders (portfolio_2026)

- Read `docs/cursor-workflow.md` before edits; update its Recent Changes after sessions.
- Private voice/career context: `docs/private/edward-context.md` (gitignored). Copy from `edward-context.template.md` on a new machine.
- Light theme tokens live in `src/styles/base.css`; avoid dark-theme leftovers in `styles.css`.
- Do not use `overflow-x: hidden` on `body` (iOS fixed positioning). Use `html` instead.
- Deploy: push to GitHub; Vercel builds from the connected repo.

---

## 6. Going further

- **Hooks** (optional): automate format or checks on agent events (see Cursor docs for hooks).
- **CLI**: `cursor` CLI for headless or scripting if you outgrow click-only flows.
- **Personal skills**: for workflows you reuse across many repos, put `SKILL.md` under `~/.cursor/skills/your-skill/`.

If you want a **project skill** for this repo only, use `.cursor/skills/<name>/SKILL.md` and describe when the agent should follow it in the skill `description` frontmatter.
