# rohan.dev — Personal Developer Portfolio

A responsive portfolio for Rohan Chaudhary, built with static HTML, CSS, and vanilla JavaScript.

## Project files

    index.html          Home page
    about/index.html    About page (/about/)
    projects/index.html Project details and concepts (/projects/)
    about.html          Legacy URL redirect
    projects.html       Legacy URL redirect
    style.css           Shared portfolio styles
    script.js           Site interactions and animated Canvas robot
    favicon.svg         RC monogram
    robots.txt          Crawler guidance
    sitemap.xml         Sitemap using the configured domain
    CNAME               Custom-domain file for GitHub Pages

The portfolio and its robot avatar use only browser APIs. There is no framework, package install, backend, or build step.

## Edit before publishing

- Update project descriptions and technologies in `projects/index.html` to reflect confirmed work. Concept entries are labeled; add demo and repository links when available.
- Add your public email to the `siteConfig.email` value near the top of `script.js`. Email links stay hidden until an address is configured.
- If your profile URLs change, edit the GitHub and LinkedIn links in the HTML pages.
- The portfolio’s `CNAME`, `robots.txt`, and `sitemap.xml` currently use `rohanchaudhary.com.np`.

## Open locally

Open `index.html` to view the portfolio and its robot animation. The site needs no installation. A local static server also works; for example, run `py -m http.server 8000` from this folder and open `http://localhost:8000/`.

## Publish the portfolio on GitHub Pages

1. Push the project files to the root of your GitHub repository.
2. Open the repository’s **Settings → Pages**.
3. Select **Deploy from a branch**, choose the `main` branch and the root folder `/`, then save.
4. Wait for the Pages deployment. A project repository is published under `https://USERNAME.github.io/REPOSITORY/`; an account repository named `USERNAME.github.io` uses the root URL.

The root `CNAME` file is set to `rohanchaudhary.com.np`. GitHub Pages also requires that custom domain to be set in the Pages settings and DNS records to point to GitHub Pages.

## Publish the portfolio on Cloudflare Pages

The robot animation is part of the portfolio home page. In Cloudflare, create a Pages project and deploy the portfolio root folder. For a direct upload, upload the project files. For Git integration, leave the project root at the repository root. Leave the build command and output directory empty; the site has no build step.

After the first deployment, Cloudflare gives the project a `*.pages.dev` address. To use a custom domain, open the Pages project’s **Custom domains** and select **Set up a domain**. Cloudflare can create the DNS record automatically when the domain is managed by the Cloudflare zone. With an external DNS provider, follow the Pages custom-domain instructions and use the project’s displayed `*.pages.dev` hostname as the CNAME target for a subdomain. For an apex domain, Cloudflare requires the domain to be an active Cloudflare zone. Do not add a guessed DNS target.

## Animation note

The robot avatar is a responsive vanilla Canvas 2D recreation with a TV shell, LED face, antenna, idle blinking, pointer tracking, and click response. It respects the reduced-motion setting.
