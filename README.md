# Portfolio

Personal portfolio of Ayoub Ait Belhaj, DevOps / Platform Engineer. Built with Next.js (static export), React and Framer Motion. The whole site is a terminal: typed commands, a live CI/CD pipeline, a `git log` for experience, and an interactive prompt.

Live: https://aaitbelh.github.io

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Publish

The site is served by GitHub Pages from `main:/docs`.

```bash
npm run publish:docs   # builds the static export into docs/
git add -A && git commit -m "Update site" && git push
```
