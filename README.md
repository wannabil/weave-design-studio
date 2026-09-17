# Weave Design Studio

The Divisare-inspired Project Atlas is the only site design. It uses Weave’s identity, project photography and information.

## Local preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://localhost:8765/.

- `index.html` contains the site.
- `divisare.css` and `divisare.js` provide its styling and interactions.
- `divisare.html` redirects old preview links to the homepage, preserving section anchors.
- `assets/` contains the local images and logo.

The first project expands from a blank centre as you scroll. The remaining projects are full-screen horizontal slides. Project details and enquiries open in rounded popups. Studio, Services and Process use word-by-word entrance animations. Reduced-motion preferences are respected. Enquiries prepare an email draft without sending it automatically.

## Cloudflare deployment

Live site: https://weave-design-studio.wannabil-xyz.workers.dev

Run `npm ci` to install dependencies, then `npm run deploy` to package the public site into `dist/` and deploy using the project’s Wrangler configuration. Only the HTML, CSS, JavaScript and assets are published.
