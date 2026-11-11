import os
import json
import urllib.parse
import re

# Load products from js/products.js
with open('js/products.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

# Extract PRODUCTS JSON array by finding start and end
start_marker = "const PRODUCTS = ["
start_idx = js_content.find(start_marker)
if start_idx == -1:
    raise ValueError("Could not find PRODUCTS in js/products.js")

end_idx = js_content.find("];\n\n/**", start_idx)
if end_idx == -1:
    end_idx = js_content.find("];", start_idx)

products_code = js_content[start_idx + len("const PRODUCTS = "):end_idx + 1]

# Quote unquoted keys and strip trailing commas
clean_json = re.sub(r'(\s+)([a-zA-Z0-9_]+):', r'\1"\2":', products_code)
clean_json = re.sub(r',(\s*[}\]])', r'\1', clean_json)

try:
    products = json.loads(clean_json)
    print(f"Successfully parsed {len(products)} products with json.loads")
except Exception as e:
    print("Direct json parse failed:", e)
    products = []

SITE_BASE_URL = "https://aneridudharejiya.github.io/Wooden-shop-website"
PHONE_FORMATTED = "+91 94293 14554"
PHONE_RAW = "919429314554"

def generate_product_html(prod, all_prods):
    pid = prod['id']
    name = prod['name']
    category = prod.get('category', 'Wooden Hangers')
    tagline = prod.get('tagline', 'Handcrafted Wooden Home Decor by YASH MARKETING Surat')
    seo_title = prod.get('seoTitle', f"{name} | Premium Wooden Products & Home Decor Surat | YASH MARKETING")
    meta_desc = prod.get('metaDescription', f"Buy or enquire for {name} in Surat. Handcrafted solid wooden home decor and wall organizer from YASH MARKETING Gujarat.")
    full_desc = prod['fullDescription']
    short_desc = prod['shortDescription']
    material = prod.get('material', 'Natural Solid Wood')
    finish = prod.get('finish', 'Smooth Protective Finish')
    dimensions = prod.get('dimensions', 'Available on enquiry')
    price_text = prod.get('priceText', 'Price on Request')
    image_rel = prod['image']
    image_abs = f"{SITE_BASE_URL}/{image_rel}"
    badge = prod.get('badge', 'Premium')
    canonical_url = f"{SITE_BASE_URL}/products/{pid}.html"

    # Pre-filled WhatsApp message
    wa_msg = f"Hello YASH MARKETING, I am interested in the {name}. Please share its price, available designs, and product details."
    wa_url = f"https://wa.me/{PHONE_RAW}?text={urllib.parse.quote(wa_msg)}"

    # Features
    features_html = ""
    for feat in prod.get('features', []):
        features_html += f"""
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>{feat}</span>
              </li>"""

    # Gallery thumbnails
    gallery = prod.get('galleryImages', [image_rel])
    thumbs_html = ""
    if len(gallery) > 1:
        for idx, gimg in enumerate(gallery):
            active_cls = "active" if idx == 0 else ""
            thumbs_html += f"""
              <div class="thumb-item {active_cls}" data-src="../{gimg}">
                <img src="../{gimg}" alt="{name} view {idx + 1}" />
              </div>"""

    # Related products (3 other items)
    related_cards = ""
    related_list = [p for p in all_prods if p['id'] != pid][:3]
    for rel in related_list:
        rel_name = rel['name']
        rel_id = rel['id']
        rel_cat = rel['category']
        rel_short = rel['shortDescription']
        rel_price = rel['priceText']
        rel_img = rel['image']
        rel_badge = rel.get('badge', 'Premium')
        rel_wa_msg = f"Hello YASH MARKETING, I am interested in the {rel_name}. Please share its price, available designs, and product details."
        rel_wa = f"https://wa.me/{PHONE_RAW}?text={urllib.parse.quote(rel_wa_msg)}"
        related_cards += f"""
        <article class="product-card" data-category="{rel_cat}">
          <div class="product-card-image">
            <a href="{rel_id}.html" aria-label="View details of {rel_name} - YASH MARKETING Surat">
              <img src="../{rel_img}" alt="{rel_name} - Handcrafted wooden home decor Surat" loading="lazy" />
            </a>
            <span class="product-badge">{rel_badge}</span>
          </div>
          <div class="product-card-content">
            <span class="product-category-tag">{rel_cat}</span>
            <h3 class="product-card-title"><a href="{rel_id}.html">{rel_name}</a></h3>
            <p class="product-card-desc">{rel_short}</p>
            <div class="product-card-footer">
              <div class="product-price-row">
                <span class="product-price-label">Pricing</span>
                <span class="product-price-val">{rel_price}</span>
              </div>
              <div class="product-card-buttons">
                <a href="{rel_id}.html" class="btn btn-outline btn-sm">View Details</a>
                <a href="{rel_wa}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.961.949 2.796.949 3.178 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.769-5.767-5.769zm10.218 5.766c.001 5.485-4.457 9.945-9.947 9.945-1.741 0-3.371-.453-4.793-1.246l-5.509 1.443 1.472-5.378c-.89-1.473-1.405-3.2-1.405-5.044 0-5.484 4.458-9.945 9.947-9.945 5.488 0 9.947 4.461 9.947 9.945z"/>
                  </svg>
                  Enquire
                </a>
              </div>
            </div>
          </div>
        </article>"""

    thumbs_container = f'<div class="detail-gallery-thumbs">{thumbs_html}</div>' if thumbs_html else ''

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>{seo_title}</title>
  <meta name="title" content="{seo_title}" />
  <meta name="description" content="{meta_desc}" />
  <meta name="keywords" content="{name}, Wooden products in Surat, Premium wooden products, Wooden home decor, Wooden wall hangers, Wooden interior decor, YASH MARKETING Surat, Gujarat" />
  <meta name="author" content="YASH MARKETING" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="{canonical_url}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="YASH MARKETING" />
  <meta property="og:url" content="{canonical_url}" />
  <meta property="og:title" content="{seo_title}" />
  <meta property="og:description" content="{meta_desc}" />
  <meta property="og:image" content="{image_abs}" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{canonical_url}" />
  <meta property="twitter:title" content="{seo_title}" />
  <meta property="twitter:description" content="{meta_desc}" />
  <meta property="twitter:image" content="{image_abs}" />

  <!-- Stylesheet -->
  <link rel="stylesheet" href="../css/styles.css" />

  <!-- Structured Data: JSON-LD Product & Breadcrumbs -->
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "{name}",
    "image": "{image_abs}",
    "description": "{full_desc}",
    "category": "{category}",
    "brand": {{
      "@type": "Brand",
      "name": "YASH MARKETING"
    }},
    "offers": {{
      "@type": "Offer",
      "url": "{canonical_url}",
      "priceCurrency": "INR",
      "price": "0",
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {{
        "@type": "HomeGoodsStore",
        "name": "YASH MARKETING",
        "telephone": "{PHONE_FORMATTED}",
        "address": {{
          "@type": "PostalAddress",
          "streetAddress": "311, Eden Square, Opp. Palanpore Fire Station, Gauravpath Road",
          "addressLocality": "Surat",
          "addressRegion": "Gujarat",
          "postalCode": "395009",
          "addressCountry": "IN"
        }}
      }}
    }}
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "{SITE_BASE_URL}/index.html"
      }},
      {{
        "@type": "ListItem",
        "position": 2,
        "name": "Our Collection",
        "item": "{SITE_BASE_URL}/collection.html"
      }},
      {{
        "@type": "ListItem",
        "position": 3,
        "name": "{name}",
        "item": "{canonical_url}"
      }}
    ]
  }}
  </script>
</head>
<body>

  <!-- Top Notification Bar -->
  <div class="top-bar">
    <div class="container">
      <div class="top-bar-left">
        <div class="top-bar-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>311, Eden Square, Gauravpath Road, Surat, Gujarat</span>
        </div>
        <div class="top-bar-item hide-mobile">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <a href="tel:{PHONE_RAW}">{PHONE_FORMATTED}</a>
        </div>
      </div>
      <div class="top-bar-right">
        <a href="https://wa.me/{PHONE_RAW}" target="_blank" rel="noopener noreferrer" style="color: var(--warm-beige); font-weight: 500;">
          Direct WhatsApp Support &rarr;
        </a>
      </div>
    </div>
  </div>

  <!-- Navigation Header -->
  <header class="header">
    <div class="container">
      <nav class="navbar" aria-label="Main Navigation">
        <a href="../index.html" class="brand-logo" aria-label="YASH MARKETING Home">
          <span class="brand-title">YASH MARKETING</span>
          <span class="brand-subtitle">Wooden Living &amp; Décor &bull; Surat</span>
        </a>

        <ul class="nav-menu">
          <li><a href="../index.html" class="nav-link">Home</a></li>
          <li><a href="../collection.html" class="nav-link active">Our Collection</a></li>
          <li><a href="../index.html#benefits" class="nav-link">Why Choose Us</a></li>
          <li><a href="../index.html#about" class="nav-link">About Us</a></li>
          <li><a href="../index.html#contact" class="nav-link">Contact</a></li>
          <li class="mobile-menu-cta" style="display: none;">
            <a href="https://wa.me/{PHONE_RAW}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.961.949 2.796.949 3.178 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.769-5.767-5.769zm10.218 5.766c.001 5.485-4.457 9.945-9.947 9.945-1.741 0-3.371-.453-4.793-1.246l-5.509 1.443 1.472-5.378c-.89-1.473-1.405-3.2-1.405-5.044 0-5.484 4.458-9.945 9.947-9.945 5.488 0 9.947 4.461 9.947 9.945z"/>
              </svg>
              Enquire on WhatsApp
            </a>
          </li>
        </ul>

        <div class="nav-actions">
          <a href="https://wa.me/{PHONE_RAW}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" aria-label="Enquire on WhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.961.949 2.796.949 3.178 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.769-5.767-5.769zm10.218 5.766c.001 5.485-4.457 9.945-9.947 9.945-1.741 0-3.371-.453-4.793-1.246l-5.509 1.443 1.472-5.378c-.89-1.473-1.405-3.2-1.405-5.044 0-5.484 4.458-9.945 9.947-9.945 5.488 0 9.947 4.461 9.947 9.945z"/>
            </svg>
            <span>Enquire on WhatsApp</span>
          </a>
          <button class="mobile-toggle" aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </div>
  </header>
  <div class="mobile-menu-overlay"></div>

  <!-- Product Detail Section -->
  <main class="product-detail-section">
    <div class="container">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="../index.html">Home</a>
        <span class="sep">/</span>
        <a href="../collection.html">Our Collection</a>
        <span class="sep">/</span>
        <span aria-current="page">{name}</span>
      </nav>

      <div class="product-detail-grid">
        <!-- Media Showcase -->
        <div class="detail-gallery-box">
          <div class="detail-gallery-main">
            <img id="main-product-img" src="../{image_rel}" alt="{name} - Handcrafted wooden product by YASH MARKETING Surat, Gujarat" />
          </div>
          {thumbs_container}
        </div>

        <!-- Information & Actions -->
        <div class="detail-info">
          <span class="detail-category-badge">{category}</span>
          <h1 class="detail-title">{name}</h1>
          <p class="detail-tagline">{tagline}</p>

          <div class="detail-price-box">
            <span class="detail-price-label">Pricing Status</span>
            <span class="detail-price-amount">{price_text}</span>
          </div>

          <p class="detail-description">{full_desc}</p>

          <!-- Specifications Table -->
          <div class="detail-specs-list">
            <div class="spec-row">
              <span class="spec-label">Material:</span>
              <span class="spec-val">{material}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Finish:</span>
              <span class="spec-val">{finish}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Dimensions:</span>
              <span class="spec-val">{dimensions}</span>
            </div>
            <div class="spec-row">
              <span class="spec-label">Availability:</span>
              <span class="spec-val">Made to Order / In Stock (Surat, Gujarat)</span>
            </div>
          </div>

          <!-- Key Design Highlights -->
          <div class="detail-features-list">
            <h4>Design Highlights</h4>
            <ul>
              {features_html}
            </ul>
          </div>

          <!-- CTA Buttons -->
          <div class="detail-cta-row">
            <a href="{wa_url}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="flex: 1.4;" aria-label="Enquire for {name} on WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.961.949 2.796.949 3.178 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.769-5.767-5.769zm10.218 5.766c.001 5.485-4.457 9.945-9.947 9.945-1.741 0-3.371-.453-4.793-1.246l-5.509 1.443 1.472-5.378c-.89-1.473-1.405-3.2-1.405-5.044 0-5.484 4.458-9.945 9.947-9.945 5.488 0 9.947 4.461 9.947 9.945z"/>
              </svg>
              Enquire on WhatsApp
            </a>
            <a href="tel:{PHONE_RAW}" class="btn btn-outline" style="flex: 1;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Related Products Section -->
  <section class="related-products-section">
    <div class="container">
      <div class="section-header text-center" style="margin-bottom: 40px;">
        <span class="section-eyebrow">Complementary Pieces</span>
        <h2 class="section-title">You May Also Like</h2>
        <p class="section-description">Explore more handcrafted wooden products and home decor from YASH MARKETING Surat.</p>
      </div>

      <div class="products-grid">
        {related_cards}
      </div>

      <div class="text-center" style="margin-top: 48px;">
        <a href="../collection.html" class="btn btn-outline">
          &larr; Back to Full Collection
        </a>
      </div>
    </div>
  </section>

  <!-- Dark Walnut Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="brand-title">YASH MARKETING</span>
          <p class="brand-subtitle">Wooden Living &amp; Décor</p>
          <p class="tagline">
            "Elevate Your Home. Experience Premium Living."<br />
            Discover stylish wooden products that transform ordinary spaces into beautiful, organized homes.
          </p>
          <a href="https://wa.me/{PHONE_RAW}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.961.949 2.796.949 3.178 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.769-5.767-5.769zm10.218 5.766c.001 5.485-4.457 9.945-9.947 9.945-1.741 0-3.371-.453-4.793-1.246l-5.509 1.443 1.472-5.378c-.89-1.473-1.405-3.2-1.405-5.044 0-5.484 4.458-9.945 9.947-9.945 5.488 0 9.947 4.461 9.947 9.945z"/>
            </svg>
            WhatsApp {PHONE_FORMATTED}
          </a>
        </div>

        <div>
          <h4 class="footer-heading">Navigation</h4>
          <div class="footer-links">
            <a href="../index.html">Home</a>
            <a href="../collection.html">Our Collection</a>
            <a href="../index.html#benefits">Why Choose Us</a>
            <a href="../index.html#gallery">Inspiration Gallery</a>
            <a href="../index.html#about">About YASH MARKETING</a>
            <a href="../index.html#contact">Contact &amp; Location</a>
          </div>
        </div>

        <div>
          <h4 class="footer-heading">Collections</h4>
          <div class="footer-links">
            <a href="../collection.html?category=wooden-hangers">Wooden Hangers</a>
            <a href="../collection.html?category=wooden-organizers">Wooden Organizers</a>
            <a href="../collection.html?category=wooden-wall-decor">Wooden Wall Decor (Soon)</a>
            <a href="../collection.html?category=wooden-shelves">Wooden Shelves (Soon)</a>
            <a href="../collection.html">All Wooden Products</a>
          </div>
        </div>

        <div>
          <h4 class="footer-heading">Visit Our Location</h4>
          <div class="footer-contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>311, Eden Square, Opp. Palanpore Fire Station, Gauravpath Road, Surat, Gujarat, India</span>
          </div>
          <div class="footer-contact-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <a href="tel:{PHONE_RAW}">{PHONE_FORMATTED}</a>
          </div>
          <div style="margin-top: 14px;">
            <a href="https://www.google.com/maps/search/?api=1&query=311%2C%20Eden%20Square%2C%20Opp.%20Palanpore%20Fire%20Station%2C%20Gauravpath%20Road%2C%20Surat%2C%20Gujarat" target="_blank" rel="noopener noreferrer" style="color: var(--wood-brown-light); font-size: 0.875rem; text-decoration: underline;">
              Get Google Maps Directions &rarr;
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 YASH MARKETING, Surat. All rights reserved.</p>
        <p>Premium Wooden Products &bull; Wooden Home Décor &bull; Surat, Gujarat</p>
      </div>
    </div>
  </footer>

  <!-- Floating WhatsApp Quick Button -->
  <a href="https://wa.me/{PHONE_RAW}" target="_blank" rel="noopener noreferrer" class="floating-whatsapp" aria-label="Chat on WhatsApp with YASH MARKETING">
    <svg viewBox="0 0 24 24">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.961.949 2.796.949 3.178 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.769-5.767-5.769zm10.218 5.766c.001 5.485-4.457 9.945-9.947 9.945-1.741 0-3.371-.453-4.793-1.246l-5.509 1.443 1.472-5.378c-.89-1.473-1.405-3.2-1.405-5.044 0-5.484 4.458-9.945 9.947-9.945 5.488 0 9.947 4.461 9.947 9.945z"/>
    </svg>
  </a>

  <!-- Script for thumbnails & navbar -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {{
      const mainImg = document.getElementById("main-product-img");
      const thumbs = document.querySelectorAll(".thumb-item");
      thumbs.forEach(thumb => {{
        thumb.addEventListener("click", () => {{
          thumbs.forEach(t => t.classList.remove("active"));
          thumb.classList.add("active");
          const newSrc = thumb.getAttribute("data-src");
          if (mainImg && newSrc) {{
            mainImg.src = newSrc;
          }}
        }});
      }});

      // Mobile navbar toggle
      const mobileToggle = document.querySelector(".mobile-toggle");
      const navMenu = document.querySelector(".nav-menu");
      const overlay = document.querySelector(".mobile-menu-overlay");
      if (mobileToggle && navMenu) {{
        mobileToggle.addEventListener("click", () => {{
          const isOpen = navMenu.classList.toggle("open");
          mobileToggle.classList.toggle("active", isOpen);
          overlay?.classList.toggle("active", isOpen);
        }});
        overlay?.addEventListener("click", () => {{
          navMenu.classList.remove("open");
          mobileToggle.classList.remove("active");
          overlay.classList.remove("active");
        }});
      }}
    }});
  </script>
</body>
</html>
"""
    return html

# Generate all pages
os.makedirs("products", exist_ok=True)
count = 0
for p in products:
    page_content = generate_product_html(p, products)
    dest_path = os.path.join("products", f"{p['id']}.html")
    with open(dest_path, "w", encoding="utf-8") as out:
        out.write(page_content)
    count += 1
    print(f"Generated {dest_path}")

print(f"Successfully generated all {count} crawlable static product pages in products/!")
