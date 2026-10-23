## Activities

[![](https://raw.githubusercontent.com/u-10bei/u-10bei/main/profile-summary-card-output/github/0-profile-details.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://raw.githubusercontent.com/u-10bei/u-10bei/main/profile-summary-card-output/github/1-repos-per-language.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards) [![](https://raw.githubusercontent.com/u-10bei/u-10bei/main/profile-summary-card-output/github/2-most-commit-language.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
[![](https://raw.githubusercontent.com/u-10bei/u-10bei/main/profile-summary-card-output/github/3-stats.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards) [![](https://raw.githubusercontent.com/u-10bei/u-10bei/main/profile-summary-card-output/github/4-productive-time.svg)](https://github.com/vn7n24fzkq/github-profile-summary-cards)
![](https://github-readme-stats.vercel.app/api/top-langs/?username=u-10bei&layout=compact&theme=github)

## Development

[u-10bei.github.io](https://u-10bei.github.io) is built with [Astro](https://astro.build); charts and maps are generated with Python (Plotly / folium) at build time.

In GitHub Codespaces everything below is set up automatically (`.devcontainer/`); just run `npm run dev`.

```bash
npm install          # Astro
npm run charts       # Python: scripts/build_charts.py (uses uv)
npm run dev          # http://localhost:4321
npm run build        # charts + static site -> dist/
```

| Path | Contents |
|---|---|
| `src/content/posts/` | Blog posts (`YYYY-MM-DD-<slug>.md` / `.mdx`, URL: `/YYYY/MM/<slug>.html`) |
| `src/pages/` | Top, about, reference, category, post list |
| `scripts/build_charts.py` | Builds charts from `public/datas/` (embed in `.mdx` with `<Chart name="..." />`) |
| `public/` | Images, data files and other static assets |

Pushing to `main` deploys via GitHub Actions (`.github/workflows/deploy.yml`).
