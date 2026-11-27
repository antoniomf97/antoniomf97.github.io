# CLAUDE.md

Personal academic website of António Fernandes: https://antoniomf97.github.io

## How we work
- **Explain before editing.** Before changing any file in this repo, say which
  files will change, what and why, then wait for my OK. One topic at a time.
- I commit and push myself. Don't run `git commit`/`git push` or install
  packages without asking.
- I'm learning: give short reasons for changes and plain-English code comments.
- Bugs: reproduce first, fix, then confirm with the same steps.
- Before saying something is done: run `npm run build` and `npx astro check`,
  test in the browser (including my window size), and confirm the files on my
  disk actually changed. Say what was tested and what wasn't.

## Communication
- Be brief and precise. Short answers, no recap of earlier steps.
- Lead with the answer or the plan; details only if I ask.
- Bullets over paragraphs. Max ~10 lines unless I ask for more.

## Stack
- Astro 7, static output, plain CSS (no Tailwind or UI framework).
- Node 24 (even-numbered LTS), on Windows.
- GitHub Pages: `.github/workflows/deploy.yml` deploys every push to `master`.
- Fonts self-hosted with Fontsource (Inter, Space Grotesk); YAML read with `yaml`.

## Commands
- `npm run dev`: local site at http://localhost:4321
- `npm run build`: production build into `dist/`
- `npm run preview`: serve the production build

## Where things live
- `src/data/*.yaml`: content (profile, news, publications). Fields are defined
  in `src/content.config.ts`.
- `src/pages/`: one file per page. The bio text is in `index.astro`.
- `src/layouts/BaseLayout.astro`: shared frame (head, sidebar, nav, footer).
- `src/components/`: Sidebar, Nav, PublicationItem, Icon.
- `src/styles/global.css`: design tokens (colours, fonts, radii) + shared classes.
- `public/`: files served as-is (photo in `public/images/`, PDFs in `public/files/`).

## Conventions
- Content goes in YAML, not hard-coded in pages. New list-type content
  (talks, teaching, projects) gets its own collection in `content.config.ts`.
- Use the CSS variables from `global.css`; keep component styles scoped.
- Desktop first; the mobile layout comes later (mockups exist).
- Accessibility: real links and buttons, click targets ≥ 44 px,
  text contrast ≥ 4.5:1, visible keyboard focus.
- Keep dependencies minimal; ask before adding one.

## Gotchas
- The default branch is `master`, not `main`.
- Commit `package-lock.json` together with `package.json`; the deploy installs from it.
- Run npm on Windows itself, not in a Linux VM (native binaries differ).