# YASH MARKETING — Premium Wooden Hangers & Home Décor Website
**Surat, Gujarat, India**

Welcome to your official business website for **YASH MARKETING**!
This website is crafted as a premium, lightweight, and modern web application with no complicated build tools or database configurations required. You can host it anywhere with ease.

---

## 📁 Project File Structure

```
wooden website/
├── index.html                   # Luxury Homepage (Hero, Collection Preview, Benefits, Gallery, About, Contact, Footer)
├── collection.html              # Full Catalogue Page (Live Search & Category Filter Pills)
├── product.html                 # Dynamic Product Detail Page (Galleries, Specifications & WhatsApp CTAs)
├── assets/
│   ├── images/                  # All product photographs & lifestyle imagery
│   │   ├── wooden-hanger-natural.jpg
│   │   ├── wooden-hanger-geometric.jpg
│   │   ├── wooden-hanger-walnut.jpg
│   │   ├── wooden-hanger-entryway.jpg
│   │   ├── wooden-hanger-bathroom.jpg
│   │   ├── wooden-hanger-slat-tote.jpg
│   │   ├── wooden-hanger-vertical-rack.jpg
│   │   ├── wooden-hanger-modern-slat.jpg
│   │   └── wooden-hanger-multi-peg.jpg
│   └── icons/                   # Luxury brand SVG icons
├── css/
│   └── styles.css               # Design system, luxury typography & responsive styling
├── js/
│   ├── products.js              # Centralized, beginner-friendly editable product database
│   └── main.js                  # Navigation, sticky header, modal/filtering, contact form validation & WhatsApp links
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # Google Search Console sitemap
└── README.md                    # Beginner documentation (this file)
```

---

## 🛠️ Beginner's Guide: How to Maintain Your Website

### 1. How to Add or Edit Products & Prices
All your product details are kept in one single, clean file: **[`js/products.js`](file:///c:/Users/aneri/OneDrive/Desktop/wooden%20website/js/products.js)**.

To edit an existing product:
1. Open `js/products.js` in VS Code or Notepad.
2. Find the product you wish to change (e.g. `natural-wooden-wall-hanger`).
3. Update its `name`, `shortDescription`, `fullDescription`, `material`, `finish`, or `priceText`.
4. When you have real prices, simply change `"Price on Request"` to `"₹1,499"` (or whatever price you set).
5. Save the file.

To add a new wooden hanger:
1. Copy one of the `{ ... }` product blocks in `js/products.js`.
2. Paste it before the closing `];` bracket.
3. Change its `id` to a unique name (e.g. `id: "handcrafted-teak-wall-hook"`).
4. Put the corresponding photo in `assets/images/` and update `image: "assets/images/your-photo.jpg"`.
5. Save the file — it will automatically appear in your collection, search, and detail views!

### 2. How to Replace or Add Product Photos
1. Take or collect your product photograph.
2. Place the file inside the `assets/images/` folder.
3. Rename it clearly (e.g., `wooden-hanger-teak.jpg`).
4. Update the `image` or `galleryImages` list in `js/products.js`.

### 3. How to Update Business Phone or Address
If your contact details change, update `BUSINESS_CONFIG` at the top of `js/products.js`:
```javascript
const BUSINESS_CONFIG = {
  name: "YASH MARKETING",
  phone: "+91 94293 14554",
  phoneRaw: "919429314554",
  address: "311, Eden Square, Opp. Palanpore Fire Station, Gauravpath Road, Surat, Gujarat, India",
  ...
};
```
All WhatsApp links and enquiry buttons across all pages will automatically update!

---

## 🚀 How to Publish the Website & Connect a Domain

Because this website uses pure HTML5, CSS3, and JavaScript, you have multiple free, reliable hosting options:

### Option A: Netlify (Easiest & Free)
1. Go to [https://www.netlify.com](https://www.netlify.com) and create a free account.
2. Go to **Sites** &rarr; **Add new site** &rarr; **Deploy manually**.
3. Drag and drop the `wooden website` folder directly into the Netlify upload box!
4. Your website will be live in 5 seconds with a free SSL certificate (`https://`).
5. **Connect Your Domain**: In Netlify site settings &rarr; **Domain Management**, click **Add custom domain** (e.g., `yashmarketing.com`). Follow their DNS instructions to point your domain registrar (GoDaddy, Namecheap, Hostinger, etc.).

### Option B: Vercel (Fast & Free)
1. Go to [https://vercel.com](https://vercel.com) and sign up.
2. Install Vercel CLI or import via GitHub.
3. Drag-and-drop or run `vercel deploy`.

### Option C: Traditional Web Hosting (Hostinger, Bluehost, cPanel)
1. Log into your hosting cPanel or File Manager.
2. Navigate to `public_html`.
3. Upload all files and folders from `wooden website/`.
4. Your site is live!

---

## 🔍 Google Search Console & SEO Verification
1. When published on your live domain (e.g. `https://yashmarketing.com`), verify ownership on [Google Search Console](https://search.google.com/search-console).
2. Submit your sitemap URL: `https://yashmarketing.com/sitemap.xml`.
3. Google will crawl and index your pages with the built-in local business and product schemas.

---
**YASH MARKETING** &bull; 311, Eden Square, Gauravpath Road, Surat, Gujarat &bull; +91 94293 14554
