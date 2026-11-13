# Applaudably

Official website for **Applaudably** — an independent digital visual design studio showing creative capabilities and offering custom inquiries. Finished digital products are sold only through Etsy.

A fully static site (pure HTML/CSS, no build step) ready for **GitHub Pages** or **Cloudflare Pages**.

## Structure

```
index.html                  Home
about.html                  About the brand
contact.html                Contact
faq.html                    FAQ (trust layer)
license.html                License / usage terms (trust layer)
download-help.html          How to download & use the kits (trust layer)
custom.html                 Custom requests (services)
products/index.html         12-category capabilities guide + illustrative concept gallery + Etsy shop path
products/*.html             6 historical product-idea briefs (noindex, clearly not for sale)
journal/index.html          Journal (blog)
journal/*.html              3 articles
assets/style.css            Shared stylesheet
scripts/validate-site.mjs   Static-site link, concept and commerce integrity checks
PRODUCT_BLUEPRINT.md        One blueprint per product — filled before any design work
PRODUCT_ROADMAP.md          4 expansion phases (11 products)
ETSY_LISTING_SYSTEM.md      Titles, tags, descriptions, images & pricing per listing
```

## Publishing and commerce policy (November 2026)

There are three distinct content classes, which must never be conflated:

1. **Capabilities** are broad examples of visual design the studio may offer. They can be listed on the site without claiming to be finished files or contracted work.
2. **Concept briefs** describe proposed product directions. The six historical kits remain accessible, explicitly labelled **concept / not for sale**, with `noindex,follow` and no buy links. They are intentionally excluded from the sitemap.
3. **Finished digital products** may receive a genuine product detail page, public catalog entry and a **Buy on Etsy** button **only** after final design files are validated and an individual live Etsy listing URL is verified. A shop homepage is not a substitute for a direct product listing.

The current first digital-product direction is the **Nail Studio Visual Business Kit**, under development; it is not currently represented as a purchasable product.

The site has no checkout, cart, paid form, digital delivery endpoint or payment processing. Buyers purchase only on `https://applaudably.etsy.com`, and individual product links must point to their matching Etsy listings. Custom design inquiries use **`studio@applaudably.com`** via `mailto:`; the actual mailbox's delivery should be tested before release.

Read `PRODUCT_ROADMAP.md` for the product governance and release gate. The original six kit concepts are retained as an idea backlog, **not** current stock.

## Quality check

Run `node scripts/validate-site.mjs` before merging changes to the website. This verifies local links, the noindex and sitemap treatment of concept pages, category coverage and Etsy-only purchase links.

## Domain

The site is built for **https://applaudably.com** — the `CNAME` file, canonical tags, `sitemap.xml` and `robots.txt` all point there.

## Deploy — GitHub Pages + applaudably.com

1. Repository **Settings → Pages**
2. Source: **Deploy from a branch**, branch `main`, folder `/ (root)` — the `CNAME` file in the repo sets the custom domain automatically
3. At your DNS provider, add:
   - **A records** for the apex `applaudably.com` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME record** for `www` → `sohadot.github.io`
4. Back in Settings → Pages: confirm the custom domain shows `applaudably.com`, wait for the DNS check, then tick **Enforce HTTPS**

## Deploy — Cloudflare Pages + applaudably.com

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**
2. Select this repository; build command: *(leave empty)*, output directory: `/`
3. After the first deploy: **Custom domains → Set up a custom domain → applaudably.com** (if the domain's DNS is already on Cloudflare, records are added automatically)
4. Optionally add `www.applaudably.com` and redirect it to the apex

Note: the `CNAME` file is only used by GitHub Pages; Cloudflare Pages ignores it, so it's safe either way.

## Before going live

Verify that `studio@applaudably.com` can receive external email and that the Etsy shop opens. When the first product is actually finished, verify its live direct Etsy listing URL before adding any purchase button or product-page structured data.

After the domain is live, submit `https://applaudably.com/sitemap.xml` in Google Search Console to start indexing.
