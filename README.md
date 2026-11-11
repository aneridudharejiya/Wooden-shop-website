# YASH MARKETING — Premium Wooden Products & Home Décor Website
**Surat, Gujarat, India**  
**Official Live Website:** [https://aneridudharejiya.github.io/Wooden-shop-website/](https://aneridudharejiya.github.io/Wooden-shop-website/)

Welcome to the official repository for **YASH MARKETING**!
This website is crafted as a premium, lightweight, and modern web application with high-speed performance, mobile responsiveness, and comprehensive on-page & technical SEO optimized for Google.

---

## 📁 Project File Structure

```
wooden website/
├── index.html                   # Luxury Homepage (Hero with H1, Curated Collection, Benefits, Gallery, About, Contact, Footer)
├── collection.html              # Full Catalogue Page (Live Search, Scalable Category Filter Pills)
├── product.html                 # Dynamic Product Detail Fallback
├── products/                    # 100% Crawlable Static Product Pages for Googlebot
│   ├── natural-wooden-wall-hanger.html
│   ├── minimalist-geometric-wooden-hanger.html
│   ├── premium-walnut-finish-wall-hanger.html
│   ├── multi-hook-wooden-wall-organizer.html
│   ├── modern-wooden-entryway-hanger.html
│   ├── artisan-slat-wooden-wall-rack.html
│   ├── classic-two-tone-slat-hanger.html
│   ├── heritage-multi-peg-wall-organizer.html
│   └── studio-vertical-slat-hanger.html
├── assets/
│   ├── images/                  # All product photographs & lifestyle imagery
│   └── icons/                   # Luxury brand SVG icons
├── css/
│   └── styles.css               # Design system, luxury typography & responsive styling
├── js/
│   ├── products.js              # Centralized product database, scalable categories & SEO metadata
│   └── main.js                  # Navigation, sticky header, category filtering, contact form validation & WhatsApp links
├── robots.txt                   # Search crawler directives pointing to GitHub Pages sitemap
├── sitemap.xml                  # Google Search Console sitemap with all crawlable URLs
└── README.md                    # Beginner documentation (this file)
```

---

## 🛠️ How to Maintain & Update Your Website

### 1. How to Add or Edit Products & Prices
All your product details are kept in **[`js/products.js`](file:///c:/Users/aneri/OneDrive/Desktop/wooden%20website/js/products.js)**.
To change details, update the fields inside `PRODUCTS`. Whenever you have real prices, replace `'Price on Request'` with your actual price (e.g. `'₹1,499'`).
To re-generate the static HTML pages in `products/`, simply run:
```powershell
python generate_products.py
```

### 2. Scalable Categories Architecture
The website structure supports your long-term vision:
- **Wooden Hangers** (Active)
- **Wooden Organizers** (Active)
- **Wooden Wall Decor** (Upcoming)
- **Wooden Shelves** (Upcoming)
- **Wooden Accessories** (Upcoming)
- **Other Wooden Products** (Upcoming)

When visitors click an upcoming category, they receive a luxury preview notice with a direct WhatsApp registration link to enquire about early access and bespoke designs.

---

## 🔍 Google Search Console & SEO Verification
1. Open [Google Search Console](https://search.google.com/search-console).
2. Add your property: `https://aneridudharejiya.github.io/Wooden-shop-website/`
3. Submit your sitemap: `https://aneridudharejiya.github.io/Wooden-shop-website/sitemap.xml`
4. Google will index your homepage, collection page, and each individual product page with pre-rendered `<title>`, `<meta description>`, and JSON-LD `Product` structured data.

---
**YASH MARKETING** &bull; 311, Eden Square, Opp. Palanpore Fire Station, Gauravpath Road, Surat, Gujarat &bull; +91 94293 14554
