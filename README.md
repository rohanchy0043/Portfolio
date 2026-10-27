# Rohan Chaudhary — Developer Portfolio

A responsive portfolio built with the Next.js App Router, TypeScript, Tailwind CSS v4, and Lucide icons. Next.js exports plain static files into `out/`; the published site does not need a Node.js server, API, database, or paid service. The project case studies are generated at build time. Their preview panels are concept illustrations, not screenshots of deployed products.

## Run locally

Use Node.js 20.9 or newer and npm:

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`. To create the production site locally:

```bash
npm run typecheck
npm run build
```

The static website is written to `out/`. Open `out/index.html` with a local static server to review the exported files; `next start` is not used for deployment.

## Personalize the content

- Edit your display name, headline, location, email, social links, website URL, availability, about text, education, and optional services in `lib/site-config.ts`.
- Update `public/opengraph-image.svg` if you change the name or visual branding shown in the social sharing card.
- Skills are examples in `data/skills.ts`; remove any entry you cannot confidently claim.
- Project summaries and optional implementation notes, technologies, screenshots, and links belong in `data/projects.ts`. The three current entries are concepts with no claimed implementation, demo, repository, or stack.
- Add real screenshots under `public/images/` and update `ProjectPreview`/project data when they are available.
- The contact form validates in the browser and opens a prefilled email draft. Set `email` in `lib/site-config.ts` to enable that handoff. Visitors still need to send the draft from their email app; the site does not send or store messages. Until an email is configured, the form explains that it is unavailable and points visitors to LinkedIn.
- Set `services.show` to `false` in `lib/site-config.ts` to hide the freelance services section.
- `public/CNAME` currently contains `www.rohanchaudhary.com.np`, carried forward from the existing portfolio. Replace it and `siteUrl` if you choose a different custom domain. A CNAME file alone does not configure DNS or prove that the domain points to GitHub Pages.

## Deploy with GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` installs the locked dependencies, checks TypeScript, builds the static export, and deploys `out/` when changes are pushed to `main`. It can also be run manually from the Actions tab.
4. For the existing custom domain, enter `www.rohanchaudhary.com.np` in **Settings → Pages → Custom domain**. GitHub Actions does not configure your DNS provider. For this `www` subdomain, create a DNS `CNAME` record for `www` pointing to `rohanchy0043.github.io` (without a repository name).
5. If you use an apex domain instead, configure DNS with one of these supported options:
   - `A` records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
   - `AAAA` records for `@` if using IPv6: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, and `2606:50c0:8003::153`.
   - Or a supported `ALIAS`/`ANAME` record for `@` pointing to `rohanchy0043.github.io`.
6. After DNS resolves and GitHub makes a certificate available, enable **Enforce HTTPS** in **Settings → Pages**. DNS changes and certificate issuance can take time.
GitHub’s guides cover [Pages deployment with a custom workflow](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [custom domain and DNS setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

### Project repository URL instead of a custom domain

For a repository site such as `https://rohanchy0043.github.io/portfolio/`, set `NEXT_PUBLIC_BASE_PATH` to `/portfolio` for both the local build and the workflow build. Also change `siteUrl` in `lib/site-config.ts` to `https://rohanchy0043.github.io` and remove `public/CNAME` (a custom domain uses the root path). In `.github/workflows/deploy.yml`, add this under the `Build static site` step:

```yaml
env:
  NEXT_PUBLIC_BASE_PATH: /portfolio
```

Replace `/portfolio` with the exact repository name, including its capitalization. `next.config.ts` applies this base path to routes and static assets, while sitemap, robots, canonical, and social metadata use the configured site URL and path.

## Project structure

```text
app/                 Pages, layout, SEO metadata, sitemap, robots, styles
components/          Navigation, page sections, project cards and details
data/                Editable project and skill data
lib/                 Personal configuration and contact validation
public/              Static assets and custom-domain CNAME
.github/workflows/   GitHub Pages build and deployment
```
