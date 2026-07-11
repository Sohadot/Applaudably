# Applaudably

Official website for **Applaudably** — premium Canva brand kits for small beauty, wellness and lifestyle brands.

A fully static site (pure HTML/CSS, no build step) ready for **GitHub Pages** or **Cloudflare Pages**.

## Structure

```
index.html                  Home
about.html                  About the brand
contact.html                Contact
products/index.html         Product catalog
products/*.html             5 product pages (each with a "Buy on Etsy" button)
journal/index.html          Journal (blog)
journal/*.html              3 articles
assets/style.css            Shared stylesheet
```

## Products

1. Beauty Instagram Template Kit
2. Skincare Brand Starter Kit
3. Luxury Salon Social Media Kit
4. Feminine Brand Moodboard Kit
5. Product Launch Canva Kit

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

Replace the placeholder Etsy links (`https://www.etsy.com/shop/Applaudably`) with your real Etsy shop URL — or better, the direct listing URL on each product page. Search the files for `etsy.com` to find them all.

After the domain is live, submit `https://applaudably.com/sitemap.xml` in Google Search Console to start indexing.
