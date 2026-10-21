/**
 * YASH MARKETING - Core Interactive Script
 * Handles navigation, product rendering, routing, filtering, and WhatsApp integrations
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initWhatsAppButtons();
  initContactForm();

  // Page specific initializers
  if (document.getElementById("featured-products-container")) {
    renderFeaturedProducts();
  }

  if (document.getElementById("collection-products-container")) {
    initCollectionPage();
  }

  if (document.getElementById("product-detail-container")) {
    initProductDetailPage();
  }
});

/* --------------------------------------------------------------------------
   Navigation & Mobile Menu
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector(".header");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const overlay = document.querySelector(".mobile-menu-overlay");

  // Sticky header scroll detection
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }, { passive: true });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    const toggleMenu = () => {
      const isOpen = navMenu.classList.toggle("open");
      mobileToggle.classList.toggle("active", isOpen);
      overlay?.classList.toggle("active", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : "";
    };

    mobileToggle.addEventListener("click", toggleMenu);
    overlay?.addEventListener("click", toggleMenu);

    // Close when clicking nav links
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        if (navMenu.classList.contains("open")) {
          toggleMenu();
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   WhatsApp Link Utilities
   -------------------------------------------------------------------------- */
function initWhatsAppButtons() {
  // Update general WhatsApp links
  document.querySelectorAll("[data-wa-general]").forEach(btn => {
    btn.href = window.getWhatsAppUrl();
  });
}

/**
 * Creates HTML for a standard product card
 */
function createProductCardHTML(product) {
  const productWaUrl = window.getWhatsAppUrl(product.name);
  return `
    <article class="product-card" data-category="${product.category}">
      <div class="product-card-image">
        <a href="product.html?id=${encodeURIComponent(product.id)}" aria-label="View details of ${product.name}">
          <img 
            src="${product.image}" 
            alt="${product.name} - Premium wooden wall-mounted hanger by YASH MARKETING Surat"
            loading="lazy"
          />
        </a>
        <span class="product-badge">${product.badge || 'Premium'}</span>
      </div>
      <div class="product-card-content">
        <span class="product-category-tag">${product.category}</span>
        <h3 class="product-card-title">
          <a href="product.html?id=${encodeURIComponent(product.id)}">${product.name}</a>
        </h3>
        <p class="product-card-desc">${product.shortDescription}</p>
        <div class="product-card-footer">
          <div class="product-price-row">
            <span class="product-price-label">Pricing</span>
            <span class="product-price-val">${product.priceText}</span>
          </div>
          <div class="product-card-buttons">
            <a href="product.html?id=${encodeURIComponent(product.id)}" class="btn btn-outline btn-sm">
              View Details
            </a>
            <a href="${productWaUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.961.949 2.796.949 3.178 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.769-5.767-5.769zm10.218 5.766c.001 5.485-4.457 9.945-9.947 9.945-1.741 0-3.371-.453-4.793-1.246l-5.509 1.443 1.472-5.378c-.89-1.473-1.405-3.2-1.405-5.044 0-5.484 4.458-9.945 9.947-9.945 5.488 0 9.947 4.461 9.947 9.945z"/>
              </svg>
              Enquire
            </a>
          </div>
        </div>
      </div>
    </article>
  `;
}

/* --------------------------------------------------------------------------
   Homepage Featured Products
   -------------------------------------------------------------------------- */
function renderFeaturedProducts() {
  const container = document.getElementById("featured-products-container");
  if (!container || !window.PRODUCTS) return;

  // Show 6 featured products on the homepage
  const featured = window.PRODUCTS.slice(0, 6);
  container.innerHTML = featured.map(createProductCardHTML).join("");
}

/* --------------------------------------------------------------------------
   Collection Page: Category Filtering & Live Search
   -------------------------------------------------------------------------- */
function initCollectionPage() {
  const container = document.getElementById("collection-products-container");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("search-input");
  const countDisplay = document.getElementById("product-count-display");

  if (!container || !window.PRODUCTS) return;

  let currentCategory = "all";
  let searchQuery = "";

  function filterAndRender() {
    const filtered = window.PRODUCTS.filter(product => {
      const matchesCategory = currentCategory === "all" || product.category.toLowerCase().includes(currentCategory.toLowerCase());
      const matchesSearch = product.name.toLowerCase().includes(searchQuery) ||
                            product.shortDescription.toLowerCase().includes(searchQuery) ||
                            product.category.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: white; border-radius: 12px; border: 1px solid var(--border-subtle);">
          <h3 style="font-size: 1.5rem; color: var(--dark-walnut); margin-bottom: 10px;">No wooden hangers found</h3>
          <p style="color: var(--text-secondary); margin-bottom: 24px;">Try searching with different terms or reset your category filter.</p>
          <button id="reset-filter-btn" class="btn btn-outline btn-sm">Reset Filters</button>
        </div>
      `;
      document.getElementById("reset-filter-btn")?.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        searchQuery = "";
        currentCategory = "all";
        filterBtns.forEach(b => b.classList.toggle("active", b.getAttribute("data-filter") === "all"));
        filterAndRender();
      });
    } else {
      container.innerHTML = filtered.map(createProductCardHTML).join("");
    }

    if (countDisplay) {
      countDisplay.textContent = `Showing ${filtered.length} of ${window.PRODUCTS.length} wooden hanger designs`;
    }
  }

  // Filter click events
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-filter") || "all";
      filterAndRender();
    });
  });

  // Search input events
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterAndRender();
    });
  }

  // Initial render
  filterAndRender();
}

/* --------------------------------------------------------------------------
   Product Detail Page Dynamic Loader
   -------------------------------------------------------------------------- */
function initProductDetailPage() {
  const container = document.getElementById("product-detail-container");
  const relatedContainer = document.getElementById("related-products-container");
  if (!container || !window.PRODUCTS) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  // Find product or fallback to the first one
  const product = window.PRODUCTS.find(p => p.id === productId) || window.PRODUCTS[0];

  if (!product) {
    container.innerHTML = `<div class="container text-center" style="padding: 100px 0;"><h2>Product not found</h2><a href="collection.html" class="btn btn-primary" style="margin-top: 20px;">Return to Collection</a></div>`;
    return;
  }

  // Update page title and meta
  document.title = `${product.name} | YASH MARKETING Surat`;

  const waUrl = window.getWhatsAppUrl(product.name);
  const gallery = product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : [product.image];

  container.innerHTML = `
    <div class="breadcrumbs">
      <a href="index.html">Home</a>
      <span class="sep">/</span>
      <a href="collection.html">Our Collection</a>
      <span class="sep">/</span>
      <span>${product.name}</span>
    </div>

    <div class="product-detail-grid">
      <!-- Media Showcase -->
      <div class="detail-gallery-box">
        <div class="detail-gallery-main">
          <img id="main-product-img" src="${product.image}" alt="${product.name} - YASH MARKETING Surat" />
        </div>
        ${gallery.length > 1 ? `
          <div class="detail-gallery-thumbs">
            ${gallery.map((imgSrc, idx) => `
              <div class="thumb-item ${idx === 0 ? 'active' : ''}" data-src="${imgSrc}">
                <img src="${imgSrc}" alt="${product.name} angle ${idx + 1}" />
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Information & Actions -->
      <div class="detail-info">
        <span class="detail-category-badge">${product.category}</span>
        <h1 class="detail-title">${product.name}</h1>
        <p class="detail-tagline">${product.tagline || ''}</p>

        <div class="detail-price-box">
          <span class="detail-price-label">Pricing Status</span>
          <span class="detail-price-amount">${product.priceText}</span>
        </div>

        <p class="detail-description">${product.fullDescription}</p>

        <!-- Specifications Table -->
        <div class="detail-specs-list">
          <div class="spec-row">
            <span class="spec-label">Material:</span>
            <span class="spec-val">${product.material || 'Solid Wood (Details on enquiry)'}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Finish:</span>
            <span class="spec-val">${product.finish || 'Protective Wood Polish (Details on enquiry)'}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Dimensions:</span>
            <span class="spec-val">${product.dimensions || 'Available on enquiry'}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Location:</span>
            <span class="spec-val">Surat, Gujarat, India (Pan-India Enquiry)</span>
          </div>
        </div>

        <!-- Key Features -->
        <div class="detail-features-list">
          <h4>Design Highlights</h4>
          <ul>
            ${product.features.map(f => `
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <!-- CTA Buttons -->
        <div class="detail-cta-row">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="flex: 1.4;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.584 1.961.949 2.796.949 3.178 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.769-5.767-5.769zm10.218 5.766c.001 5.485-4.457 9.945-9.947 9.945-1.741 0-3.371-.453-4.793-1.246l-5.509 1.443 1.472-5.378c-.89-1.473-1.405-3.2-1.405-5.044 0-5.484 4.458-9.945 9.947-9.945 5.488 0 9.947 4.461 9.947 9.945z"/>
            </svg>
            Enquire on WhatsApp
          </a>
          <a href="tel:+919429314554" class="btn btn-outline" style="flex: 1;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            Call Us
          </a>
        </div>
      </div>
    </div>
  `;

  // Handle thumbnail clicks
  const mainImg = document.getElementById("main-product-img");
  const thumbs = container.querySelectorAll(".thumb-item");
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      const newSrc = thumb.getAttribute("data-src");
      if (mainImg && newSrc) {
        mainImg.src = newSrc;
      }
    });
  });

  // Render 3 related products
  if (relatedContainer) {
    const related = window.PRODUCTS
      .filter(p => p.id !== product.id)
      .slice(0, 3);
    relatedContainer.innerHTML = related.map(createProductCardHTML).join("");
  }
}

/* --------------------------------------------------------------------------
   Contact & Enquiry Form Validation + WhatsApp Fallback
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  const nameInput = document.getElementById("form-name");
  const phoneInput = document.getElementById("form-phone");
  const productSelect = document.getElementById("form-product");
  const messageInput = document.getElementById("form-message");
  const feedbackBox = document.getElementById("form-feedback");
  const waDirectBtn = document.getElementById("form-wa-fallback-btn");

  // Populate product dropdown dynamically if present
  if (productSelect && window.PRODUCTS) {
    window.PRODUCTS.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.name;
      opt.textContent = p.name;
      productSelect.appendChild(opt);
    });
  }

  // Pre-fill selected product if on product detail or passed via URL query
  const urlParams = new URLSearchParams(window.location.search);
  const currentProdId = urlParams.get("id");
  if (currentProdId && productSelect && window.PRODUCTS) {
    const match = window.PRODUCTS.find(p => p.id === currentProdId);
    if (match) {
      productSelect.value = match.name;
    }
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput?.value.trim() || "";
    const phone = phoneInput?.value.trim() || "";
    const selectedProd = productSelect?.value || "General Wooden Hanger Enquiry";
    const msg = messageInput?.value.trim() || "";

    // Validation
    if (!name) {
      showError("Please enter your full name.");
      nameInput?.focus();
      return;
    }

    if (!phone || phone.replace(/\D/g, "").length < 10) {
      showError("Please enter a valid 10-digit phone number.");
      phoneInput?.focus();
      return;
    }

    // Build pre-filled WhatsApp message with user's inputs
    const composedMessage = `Hello YASH MARKETING,\n\nName: ${name}\nPhone: ${phone}\nProduct of Interest: ${selectedProd}\nMessage: ${msg || 'I would like to inquire about designs, pricing, and availability.'}`;
    const waUrl = `https://wa.me/${window.BUSINESS_CONFIG.phoneRaw}?text=${encodeURIComponent(composedMessage)}`;

    // Show genuine success status and prompt user to launch WhatsApp
    if (feedbackBox) {
      feedbackBox.className = "form-feedback success";
      feedbackBox.innerHTML = `
        <strong>Thank you, ${name}!</strong><br>
        Your enquiry details are ready. Click below to connect directly with YASH MARKETING on WhatsApp to receive quick pricing & catalogs:
        <div style="margin-top: 12px;">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm">
            Send Enquiry via WhatsApp
          </a>
        </div>
      `;
      feedbackBox.style.display = "block";
    }

    // Automatically open WhatsApp in a new tab for seamless user flow
    window.open(waUrl, "_blank", "noopener,noreferrer");
    form.reset();
  });

  // Direct WhatsApp fallback button handler
  if (waDirectBtn) {
    waDirectBtn.addEventListener("click", () => {
      const name = nameInput?.value.trim() || "Customer";
      const selectedProd = productSelect?.value || "Wooden Hangers";
      const composed = `Hello YASH MARKETING, I am ${name} interested in ${selectedProd}. Please share product catalog and details.`;
      window.open(`https://wa.me/${window.BUSINESS_CONFIG.phoneRaw}?text=${encodeURIComponent(composed)}`, "_blank", "noopener,noreferrer");
    });
  }

  function showError(msgText) {
    if (feedbackBox) {
      feedbackBox.className = "form-feedback error";
      feedbackBox.textContent = msgText;
      feedbackBox.style.display = "block";
    }
  }
}
