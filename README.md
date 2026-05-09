# hritik.dev

My portfolio. Live at **https://hritik-singh-portfolio.vercel.app**.

Interactive terminal-style site — type `whoami` / `proj` / `open njord` in the hero, or hit `⌘K` for the command palette.

## Run

```bash
cp .env.example .env.local   # fill in the keys
npm install
npm run dev                  # http://localhost:3000
```

`RESEND_API_KEY` is required for the contact form. `GITHUB_TOKEN` is optional (raises rate-limit; falls back without).

Built with Next.js 14, React 18, Tailwind, and pure-SVG charts.
