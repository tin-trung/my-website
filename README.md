# the30s

A lightweight, single-page personal portfolio built with plain HTML, CSS, and JavaScript.

## Preview locally

Open `site/index.html` in a browser. The site has no build step or package dependencies.

## Make it yours

Edit `site/index.html` and replace the bracketed example text with your own introduction, skills, projects, and email address. You can adjust colors, typography, and layouts in `site/styles.css`.

## Publish with GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` deploys the contents of `site/` to GitHub Pages when changes are pushed to `main`. You can also start a deployment from the **Actions** tab with **Run workflow**.

For the first deployment:

1. In the repository on GitHub, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push a change to `site/` on `main`, or run **Deploy portfolio to GitHub Pages** from the **Actions** tab.
4. Wait for the workflow to finish. GitHub shows the published URL in the workflow run and in **Settings → Pages**.

For this repository, the expected URL is `https://tin-trung.github.io/my-website/`.
