# rohan.dev — Personal Developer Portfolio

A warm, editorial portfolio for Rohan Chaudhary, a Computer Science student in Kathmandu, Nepal. It uses only HTML, CSS, and vanilla JavaScript. There is no Node.js, package installation, build step, backend, or database.

## Project files

    index.html       Home page
    about.html       About page
    projects.html    Project notes and concepts
    style.css        Shared responsive styles
    script.js        Navigation, reveal motion, email links, and current year
    favicon.svg      RC monogram
    robots.txt       Crawler guidance
    sitemap.xml      Sitemap using the domain placeholder
    CNAME            Custom-domain placeholder

All local page and asset links are relative, so the site also works at a GitHub Pages project URL such as https://USERNAME.github.io/REPOSITORY/.

## Edit before publishing

- Update project descriptions, actual contributions, status, and technology stacks in projects.html. The current projects are editable examples marked as concepts. No repository or live-demo URLs were supplied, so none have been invented.
- Update the technology lists in index.html and about.html to reflect what you can confidently discuss.
- Add your public email in the siteConfig.email value near the top of script.js. Email links stay hidden until an address is configured.
- Replace the placeholder domain in CNAME, robots.txt, and sitemap.xml with your actual domain. CNAME must contain only the domain name on one line.
- If your profile URLs change, edit the GitHub and LinkedIn links in each HTML page.
- DM Sans and DM Mono load from Google Fonts when available. System font fallbacks are included.

## Open locally

Open index.html directly in a browser. No server or installation is required.

## Deploy to GitHub Pages

1. Create a repository on GitHub, or use an existing repository. For GitHub Free, the repository must be public for Pages.
2. Upload these files to the repository root and push them to the main branch. From PowerShell, the Git commands are:

       git add -A
       git commit -m "Add rohan.dev portfolio"
       git push origin main

3. In the repository, open Settings → Pages.
4. Under Build and deployment, choose Deploy from a branch, select main, and choose the root folder (/) as the publishing source.
5. Save the setting and wait for the Pages deployment. For an account site, use a repository named USERNAME.github.io. Other repository names use a project URL under /REPOSITORY/.

## Connect a custom domain

1. The CNAME file is set to rohanchaudhary.com.np. Change it only if you use a different domain.
2. In Settings → Pages, enter the same domain under Custom domain and save it.
3. At your DNS provider, use the matching record:
   - For a subdomain such as www.example.com, create a CNAME record for www pointing to USERNAME.github.io.
   - For an apex domain such as example.com, create A records for @ pointing to 185.199.108.153, 185.199.109.153, 185.199.110.153, and 185.199.111.153. The GitHub Pages documentation also lists the optional IPv6 records.
4. robots.txt and sitemap.xml already use https://rohanchaudhary.com.np. Update them if your domain changes.
5. After DNS has updated and GitHub has issued a certificate, enable Enforce HTTPS in Settings → Pages.

The CNAME file by itself does not configure DNS or the Pages custom-domain setting. GitHub’s guides explain [publishing from a branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) and [custom-domain DNS](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
