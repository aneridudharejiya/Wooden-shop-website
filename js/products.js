/**
 * YASH MARKETING - Centralized Product Catalogue Database
 * =======================================================
 * 
 * HOW TO EDIT OR ADD PRODUCTS:
 * 1. To edit an existing product: Change the text inside the quotes for that product below.
 * 2. To change a product image: Put your new photo in the 'assets/images/' folder
 *    and update the 'image' and 'galleryImages' paths.
 * 3. To update prices: When you are ready to display real prices, replace 'Price on Request'
 *    with your actual price (e.g., '₹1,499' or 'Price on Request').
 * 4. To add a new product: Copy any product block, paste it at the bottom, and fill in the details.
 * 
 * Business WhatsApp: +91 94293 14554 (919429314554)
 */

const BUSINESS_CONFIG = {
  name: "YASH MARKETING",
  phone: "+91 94293 14554",
  phoneRaw: "919429314554",
  tagline: "Elevate Your Home. Experience Premium Living.",
  address: "311, Eden Square, Opp. Palanpore Fire Station, Gauravpath Road, Surat, Gujarat, India",
  city: "Surat, Gujarat, India",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=311%2C%20Eden%20Square%2C%20Opp.%20Palanpore%20Fire%20Station%2C%20Gauravpath%20Road%2C%20Surat%2C%20Gujarat",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.648057279313!2d72.7818!3d21.2061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04d1c15f4837f%3A0x6b8dd98e29bc1a3a!2sEden%20Square%2C%20Gaurav%20Path%2C%20Palanpur%20Gam%2C%20Surat%2C%20Gujarat%20395009!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
};

const PRODUCTS = [
  {
    id: "natural-wooden-wall-hanger",
    name: "Natural Wooden Wall Hanger",
    category: "Wall-Mounted Hangers",
    tagline: "Warm Natural Oak Wall Rack with Ergonomic Curved Hooks",
    shortDescription: "Signature multi-hook wooden wall rack with graceful curved hangers, perfect for scarves, hats, jewelry, and everyday accessories.",
    fullDescription: "The Natural Wooden Wall Hanger brings organic warmth and refined craftsmanship to dressing areas, entryways, and bedrooms. Designed with smooth, curved hooks that support delicate fabrics without snagging, this piece elevates everyday organization into an interior design statement.",
    features: [
      "Smoothly contoured wooden hooks for hats, scarves, bags & keys",
      "Sturdy backboard construction designed for secure wall mounting",
      "Warm natural grain finish that complements contemporary & Scandinavian decor",
      "Concealed wall mounting hardware for a seamless, floating appearance"
    ],
    material: "Natural Solid Wood",
    finish: "Smooth Natural Matte Oil Finish",
    dimensions: "Available on enquiry (multiple lengths available)",
    priceText: "Price on Request",
    image: "assets/images/wooden-hanger-natural.jpg",
    galleryImages: [
      "assets/images/wooden-hanger-natural.jpg",
      "assets/images/wooden-hanger-entryway.jpg"
    ],
    inStock: true,
    badge: "Bestseller",
    featured: true
  },
  {
    id: "minimalist-geometric-wooden-hanger",
    name: "Minimalist Geometric Wooden Hanger",
    category: "Minimalist & Geometric",
    tagline: "Architectural Zigzag Design in Warm Walnut Tones",
    shortDescription: "Modern architectural wooden hanger featuring an eye-catching geometric zig-zag profile for contemporary homes.",
    fullDescription: "A fusion of sculptural modern art and practical daily utility. The Minimalist Geometric Wooden Hanger features an angular rhythm that looks stunning on your wall even when unoccupied. Ideal above an entryway console, living room accent wall, or home study.",
    features: [
      "Sculptural geometric silhouette that doubles as contemporary wall art",
      "Angled upper and lower hanging points for keys, lightweight bags, and coats",
      "Rich medium walnut finish highlighting distinctive timber grain lines",
      "Compact profile ideal for both spacious hallways and cozy urban apartments"
    ],
    material: "Solid Hardwood",
    finish: "Warm Walnut Satin Finish",
    dimensions: "Available on enquiry (custom sizing on request)",
    priceText: "Price on Request",
    image: "assets/images/wooden-hanger-geometric.jpg",
    galleryImages: [
      "assets/images/wooden-hanger-geometric.jpg",
      "assets/images/wooden-hanger-slat-tote.jpg"
    ],
    inStock: true,
    badge: "Trending Design",
    featured: true
  },
  {
    id: "premium-walnut-finish-wall-hanger",
    name: "Premium Walnut-Finish Wall Hanger",
    category: "Wall-Mounted Hangers",
    tagline: "Deep Walnut Multi-Slat Organizer with High-Capacity Hooks",
    shortDescription: "Luxury deep walnut finish wall rack featuring alternating vertical slats for jackets, handbags, and daily essentials.",
    fullDescription: "Crafted for discerning homeowners who appreciate the depth of dark wood tones. The Premium Walnut-Finish Wall Hanger features sturdy alternating timber battens that provide generous hanging space for winter jackets, trench coats, luxury handbags, and hats.",
    features: [
      "Substantial load-bearing wooden pegs suited for heavier garments and bags",
      "Alternating slat architecture that adds depth and texture to living spaces",
      "Deep walnut tone pairing effortlessly with neutral, cream, and stone palettes",
      "Reinforced rear mounting points for long-lasting stability on solid walls"
    ],
    material: "Selected Solid Timber",
    finish: "Deep Walnut Polish",
    dimensions: "Available on enquiry",
    priceText: "Price on Request",
    image: "assets/images/wooden-hanger-walnut.jpg",
    galleryImages: [
      "assets/images/wooden-hanger-walnut.jpg",
      "assets/images/wooden-hanger-modern-slat.jpg"
    ],
    inStock: true,
    badge: "Signature Collection",
    featured: true
  },
  {
    id: "multi-hook-wooden-wall-organizer",
    name: "Multi-Hook Wooden Wall Organizer",
    category: "Multi-Hook Organizers",
    tagline: "Clean-Lined Wooden Rail for Bathrooms, Spas & Dressing Suites",
    shortDescription: "Moisture-resistant, clean-profile wooden hook rail suited for towels, bathrobes, grooming accessories, and luxury bathrooms.",
    fullDescription: "Bring spa-inspired tranquility to your washrooms and wellness areas. The Multi-Hook Wooden Wall Organizer features cleanly spaced rectangular hooks designed to hold plush bath sheets, hand towels, body brushes, and loungewear with natural sophistication.",
    features: [
      "Generously spaced hooks allowing towels and fabrics to dry naturally",
      "Moisture-tolerant protective wood sealant ideal for dry bathroom zones",
      "Minimalist Scandinavian-inspired linear profile",
      "Sturdy hardwood blocks crafted for clean modern interior aesthetics"
    ],
    material: "Natural Hardwood",
    finish: "Moisture-Sealed Natural Finish",
    dimensions: "Available on enquiry",
    priceText: "Price on Request",
    image: "assets/images/wooden-hanger-bathroom.jpg",
    galleryImages: [
      "assets/images/wooden-hanger-bathroom.jpg",
      "assets/images/wooden-hanger-natural.jpg"
    ],
    inStock: true,
    badge: "Spa & Living",
    featured: true
  },
  {
    id: "modern-wooden-entryway-hanger",
    name: "Modern Wooden Entryway Hanger",
    category: "Entryway Organizers",
    tagline: "Full-Length Entryway Oak Rack for Outerwear & Everyday Essentials",
    shortDescription: "Comprehensive entryway wooden rack tailored for styling above foyer tables, keeping coats, bags, and umbrellas arranged.",
    fullDescription: "Make coming home an organized pleasure. Positioned gracefully above your console table or entryway bench, this full-length natural oak rack accommodates coats, laptop bags, scarves, and key rings, creating an inviting first impression for guests.",
    features: [
      "Multi-station hanging layout designed for busy households and guests",
      "Pairs harmoniously with console tables, indoor planters, and woven baskets",
      "Gentle rounded edges that preserve garment shoulder lines",
      "Durable solid wood construction designed for frequent daily use"
    ],
    material: "Solid Oak / Hardwood",
    finish: "Natural Wood Protective Coat",
    dimensions: "Available on enquiry (standard & extended lengths)",
    priceText: "Price on Request",
    image: "assets/images/wooden-hanger-entryway.jpg",
    galleryImages: [
      "assets/images/wooden-hanger-entryway.jpg",
      "assets/images/wooden-hanger-multi-peg.jpg"
    ],
    inStock: true,
    badge: "Entryway Essential",
    featured: true
  },
  {
    id: "artisan-slat-wooden-wall-rack",
    name: "Artisan Slat Wooden Wall Rack",
    category: "Minimalist & Geometric",
    tagline: "Vertical Slat Accent Rack with Angled Wooden Pegs",
    shortDescription: "Unique vertical slat rack featuring angled pegs that cast architectural shadows and hold bags, coats, and keys with style.",
    fullDescription: "An artistic wall feature that brings movement and warmth to plain walls. Crafted with staggered timber slats and angled retention pegs, this rack securely holds tote bags, hats, and keys while serving as a centerpiece of organic wooden craftsmanship.",
    features: [
      "Staggered wooden batten profile that creates dynamic light and shadow effects",
      "Angled peg retention preventing strap slip-offs and coat falls",
      "Warm amber wood grain that accentuates beige, linen, and plaster textures",
      "Flush-fit rear hardware ensuring a neat, wobble-free installation"
    ],
    material: "Selected Natural Hardwood",
    finish: "Warm Amber Natural Oil",
    dimensions: "Available on enquiry",
    priceText: "Price on Request",
    image: "assets/images/wooden-hanger-slat-tote.jpg",
    galleryImages: [
      "assets/images/wooden-hanger-slat-tote.jpg",
      "assets/images/wooden-hanger-modern-slat.jpg"
    ],
    inStock: true,
    badge: "New Arrival",
    featured: true
  },
  {
    id: "classic-two-tone-slat-hanger",
    name: "Classic Two-Tone Slat Hanger",
    category: "Wall-Mounted Hangers",
    tagline: "Contrasting Timber Battens with Diagonal Peg Hooks",
    shortDescription: "Hand-assembled wall rack featuring alternating light and dark wood tones, ideal for purses, keys, and accessories.",
    fullDescription: "Celebrating the natural diversity of wood tones, this hanger combines lighter honey tones with darker walnut timber battens. Complete with smooth diagonal retention pegs, it is as delightful to look at as it is convenient for daily use.",
    features: [
      "Distinctive alternating wood finish for subtle visual contrast",
      "Secure angled pegs suited for shoulder bags, keys, and daily accessories",
      "Compact width suitable for narrow entrance corridors and bedroom nooks",
      "Pre-assembled with strong hidden fixings"
    ],
    material: "Dual-Tone Natural Hardwood",
    finish: "Hand-Rubbed Matte Wax",
    dimensions: "Available on enquiry",
    priceText: "Price on Request",
    image: "assets/images/wooden-hanger-modern-slat.jpg",
    galleryImages: [
      "assets/images/wooden-hanger-modern-slat.jpg",
      "assets/images/wooden-hanger-slat-tote.jpg"
    ],
    inStock: true,
    badge: "Handcrafted",
    featured: false
  },
  {
    id: "heritage-multi-peg-wall-organizer",
    name: "Heritage Multi-Peg Wall Organizer",
    category: "Multi-Hook Organizers",
    tagline: "7-Station Wooden Rail with Turned Round Pegs",
    shortDescription: "Heavy-duty wall rack with 7 sturdy turned wooden pegs, crafted to accommodate jackets, hats, scarves, and bags.",
    fullDescription: "The quintessential family organizer. Featuring 7 turned wooden pegs mounted on a substantial horizontal crossbeam with vertical accent battens, this piece easily organizes outerwear, caps, scarves, and umbrellas for the whole family.",
    features: [
      "7 robust turned wooden pegs with rounded ball stops to protect clothing",
      "Horizontal stabilizing rail paired with decorative vertical battens",
      "Warm golden-brown wood finish with rich natural grain patterns",
      "Spacious spacing between hooks prevents overcrowding of thick jackets"
    ],
    material: "Seasoned Solid Hardwood",
    finish: "Golden Oak Luster Polish",
    dimensions: "Available on enquiry",
    priceText: "Price on Request",
    image: "assets/images/wooden-hanger-multi-peg.jpg",
    galleryImages: [
      "assets/images/wooden-hanger-multi-peg.jpg",
      "assets/images/wooden-hanger-entryway.jpg"
    ],
    inStock: true,
    badge: "High Capacity",
    featured: false
  },
  {
    id: "studio-vertical-slat-hanger",
    name: "Studio Vertical Slat Coat Rack",
    category: "Wall-Mounted Hangers",
    tagline: "Clean Architectural Rail with Brass Hardware Accents",
    shortDescription: "Sleek vertical slat wall coat rack with brass-toned bolt accents, ideal for professional briefcases and outerwear.",
    fullDescription: "A tailored design designed for executive studies, home offices, and modern apartments. Crisp vertical slats paired with warm timber horizontal rails and brass-accented fasteners deliver a timeless, refined Scandinavian elegance.",
    features: [
      "Architectural slat spacing with subtle brass-accented fasteners",
      "Center hanging points tailored for leather briefcases, jackets, and hats",
      "Hand-finished surface with silky, splinter-free touch",
      "Clean mounting system with concealed anchor points"
    ],
    material: "Premium Solid Wood",
    finish: "Medium Walnut & Teak Finish",
    dimensions: "Available on enquiry",
    priceText: "Price on Request",
    image: "assets/images/wooden-hanger-vertical-rack.jpg",
    galleryImages: [
      "assets/images/wooden-hanger-vertical-rack.jpg",
      "assets/images/wooden-hanger-walnut.jpg"
    ],
    inStock: true,
    badge: "Executive Style",
    featured: false
  }
];

/**
 * Generates an official WhatsApp enquiry link for a given product or general inquiry.
 * @param {string|null} productName - Name of product, or null for general enquiry.
 * @param {string|null} extraMessage - Additional message text.
 * @returns {string} WhatsApp URL
 */
function getWhatsAppUrl(productName = null, extraMessage = null) {
  let text = "";
  if (productName) {
    text = `Hello YASH MARKETING, I am interested in the ${productName}. Please share its price, available designs, and product details.`;
  } else if (extraMessage) {
    text = `Hello YASH MARKETING, ${extraMessage}`;
  } else {
    text = "Hello YASH MARKETING, I am interested in your wooden hangers and home décor collection. Please share more details.";
  }
  return `https://wa.me/${BUSINESS_CONFIG.phoneRaw}?text=${encodeURIComponent(text)}`;
}

// Make accessible in both modern ES / browser scripts
if (typeof window !== "undefined") {
  window.PRODUCTS = PRODUCTS;
  window.BUSINESS_CONFIG = BUSINESS_CONFIG;
  window.getWhatsAppUrl = getWhatsAppUrl;
}
