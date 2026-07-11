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

## Deploy — GitHub Pages

1. Repository **Settings → Pages**
2. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`
3. Save — the site goes live at `https://<username>.github.io/Applaudably/`

## Deploy — Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**
2. Select this repository
3. Build command: *(leave empty)* · Build output directory: `/`
4. Deploy — you get a `*.pages.dev` URL, and you can attach a custom domain.

## Before going live

Replace the placeholder Etsy links (`https://www.etsy.com/shop/Applaudably`) with your real Etsy shop URL — or better, the direct listing URL on each product page. Search the files for `etsy.com` to find them all.
