const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Load enriched catalog data
const localCatalogPath = path.join(__dirname, '../data/seeded_products.json');
const catalogPath = path.join(__dirname, '../../database/seeded_products.json');
const rawPath = path.join(__dirname, '../../zorune_perfumes.json');
let catalogData = { metadata: {}, products: [] };

try {
  if (fs.existsSync(localCatalogPath)) {
    catalogData = JSON.parse(fs.readFileSync(localCatalogPath, 'utf-8'));
  } else if (fs.existsSync(catalogPath)) {
    catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
  } else if (fs.existsSync(rawPath)) {
    catalogData = JSON.parse(fs.readFileSync(rawPath, 'utf-8'));
  }
} catch (err) {
  console.error('Error loading catalog data:', err);
}

// In-memory store for demo orders & tracking
const ordersDb = new Map();

// Olfactory Architecture pairing mappings for the Sovereign Terroir Formulations
const COMPARISON_MAP = {
  'ZR-W01': {
    conflictingSku: 'ZR-U05',
    title: 'Florentine Orris Butter vs Mysore Santalum Album',
    difference: 'ZR-W01 (Orris Soie) delivers aristocratic Tuscan iris butter (15% irone) and haute suede powder. ZR-U05 (Mysore Santal) centers on ancient Karnataka sandalwood heartwood and golden benzoin tears.',
    pairingNotes: 'The Haute Aristocracy Wardrobe: Orris Soie for formal galas and Mysore Santal for serene meditative authority.'
  },
  'ZR-W02': {
    conflictingSku: 'ZR-W03',
    title: 'Madurai Jasmine Sambac vs Grasse Centifolia Rose',
    difference: 'ZR-W02 (Madurai Lune) is a nocturnal indolic jasmine with tropical monsoon character. ZR-W03 (Rose de Grasse Éternelle) is a luminous, green-dew dawn rose with honeyed brightness.',
    pairingNotes: 'The Floral Masterclass Duo: Madurai Lune for sultry evening romance and Rose de Grasse for radiant daytime elegance.'
  },
  'ZR-W03': {
    conflictingSku: 'ZR-W04',
    title: 'Grasse Centifolia Rose vs Cape Floral Honeybush',
    difference: 'ZR-W03 (Rose de Grasse Éternelle) is a classical French rose with bergamot dew and frankincense. ZR-W04 (Fleur de Fynbos) is a sun-drenched South African nectar with honeybush and vanilla.',
    pairingNotes: 'European Elegance meets African Warmth: Rose de Grasse for formal occasions and Fleur de Fynbos for golden-hour travel.'
  },
  'ZR-W04': {
    conflictingSku: 'ZR-U06',
    title: 'Cape Honeybush vs Corsican Immortelle',
    difference: 'ZR-W04 (Fleur de Fynbos) features sweet Cape honeybush and vanilla in a gentle floral. ZR-U06 (Immortelle Corsique) delivers spicy-herbal immortelle and cistus labdanum in a sun-baked amber.',
    pairingNotes: 'The Mediterranean & Cape Warmth Set: Fleur de Fynbos for intimate softness and Immortelle Corsique for bold herbal radiance.'
  },
  'ZR-W05': {
    conflictingSku: 'ZR-U01',
    title: 'Mediterranean Orange Blossom vs Japanese Mountain Yuzu',
    difference: 'ZR-W05 (Nectar d\'Agrumes) is a rich Tunisian neroli and blood orange blossom. ZR-U01 (Yuzu Céleste) is a crystalline glacial Japanese yuzu with mint and juniper.',
    pairingNotes: 'The Citrus Connoisseur Duo: Nectar d\'Agrumes for warm coastal evenings and Yuzu Céleste for high-heat morning freshness.'
  },
  'ZR-M01': {
    conflictingSku: 'ZR-U03',
    title: 'Kiso Hinoki Temple vs Kyoto Kuromoji Sanctuary',
    difference: 'ZR-M01 (Kiso Silence) is a resinous smoky conifer with incense and black pepper. ZR-U03 (Hinoki Sanctuary) is a meditative transparent woody with clary sage and sheer frankincense.',
    pairingNotes: 'The Japanese Wood Wardrobe: Kiso Silence for boardroom authority and Hinoki Sanctuary for mindful retreat.'
  },
  'ZR-M02': {
    conflictingSku: 'ZR-U04',
    title: 'Cederberg Mountain Buchu vs Atlantic Storm Buchu',
    difference: 'ZR-M02 (Cederberg Fynbos) pairs wild buchu with dark leather and guaiacwood. ZR-U04 (Buchu Sauvage) sweeps buchu through salty ocean spray with seaweed and driftwood.',
    pairingNotes: 'The Cape Duality: Cederberg Fynbos for rugged mountain expeditions and Buchu Sauvage for coastal maritime energy.'
  },
  'ZR-M03': {
    conflictingSku: 'ZR-U02',
    title: 'Assam Wild Oud vs High-Altitude Kashmiri Saffron',
    difference: 'ZR-M03 (Oud Samarkhand) pairs sustainable Assam Aquilaria oud with royal green hojari frankincense. ZR-U02 (Saffron Nomade) illuminates Pampore saffron stigmas with golden amber and somalian myrrh.',
    pairingNotes: 'The Sovereign Nocturnal Duo: Oud Samarkhand for command presence and Saffron Nomade for magnetic evening warmth.'
  },
  'ZR-M04': {
    conflictingSku: 'ZR-U09',
    title: 'Kannauj Monsoon Vetiver vs Heritage Ruh Khus',
    difference: 'ZR-M04 (Vetiver Monsoon) captures petrichor with geosmin and green mandarin. ZR-U09 (Ruh Khus Terroir) is a deep Ayurvedic botanical with Himalayan spikenard and sesame.',
    pairingNotes: 'The Indian Earthy Heritage Set: Vetiver Monsoon for refreshing daywear and Ruh Khus Terroir for calming evening depth.'
  },
  'ZR-M05': {
    conflictingSku: 'ZR-U06',
    title: 'Spanish Cade Leather vs Corsican Maquis Amber',
    difference: 'ZR-M05 (Cuir d\'Andalousie) is an uncompromising dry leather with birch tar and bitter orange. ZR-U06 (Immortelle Corsique) is a honeyed herbal amber with sun-drenched immortelle.',
    pairingNotes: 'The Mediterranean Masculinity Duo: Cuir d\'Andalousie for private club evenings and Immortelle Corsique for sunset contemplation.'
  },
  'ZR-U01': {
    conflictingSku: 'ZR-M04',
    title: 'Japanese Mountain Yuzu vs Kannauj Ruh Khus Monsoon',
    difference: 'ZR-U01 (Yuzu Céleste) is a crystalline glacial citrus shield with cold-pressed Kōchi yuzu and Hokkaido mint. ZR-M04 (Vetiver Monsoon) is an earthy, wet-soil fortress featuring Kannauj copper-deg distilled Ruh Khus and clay geosmin.',
    pairingNotes: 'The Daytime Terroir Rotation: Yuzu Céleste for high-heat humidity and Vetiver Monsoon for deep grounding executive presence.'
  },
  'ZR-U02': {
    conflictingSku: 'ZR-M03',
    title: 'Kashmiri Saffron vs Assam Wild Oud',
    difference: 'ZR-U02 (Saffron Nomade) radiates golden bittersweet saffron with myrrh and amber. ZR-M03 (Oud Samarkhand) commands with wild oud, green hojari frankincense, and smoked leather.',
    pairingNotes: 'The Silk Road Collection: Saffron Nomade for art exhibitions and Oud Samarkhand for state banquets.'
  },
  'ZR-U05': {
    conflictingSku: 'ZR-W01',
    title: 'Sacred Karnataka Sandalwood vs Florentine Iris Butter',
    difference: 'ZR-U05 (Mysore Santal) delivers creamy, milky sandalwood with benzoin warmth. ZR-W01 (Orris Soie) is a velvet powdery iris with white suede and ambrette.',
    pairingNotes: 'The Sacred & Aristocratic Pairing: Mysore Santal for spiritual contemplation and Orris Soie for evening elegance.'
  },
  'ZR-U07': {
    conflictingSku: 'ZR-M01',
    title: 'Kyoto Kuromoji vs Kiso Valley Hinoki',
    difference: 'ZR-U07 (Kuromoji Glacé) is a delicate floral-spice with electric Sichuan pepper and linalool-rich wood. ZR-M01 (Kiso Silence) is a dense, resinous temple cedarwood with smoked frankincense.',
    pairingNotes: 'The Japanese Conifer Journey: Kuromoji Glacé for creative morning work and Kiso Silence for commanding evening authority.'
  },
  'ZR-U08': {
    conflictingSku: 'ZR-U04',
    title: 'Beach-Combed Ambergris vs Atlantic Buchu Storm',
    difference: 'ZR-U08 (Ambergris Australe) is a contemplative saline-amber with ethical ambergris tincture and Irish moss. ZR-U04 (Buchu Sauvage) is an electrifying aromatic oceanic with Cape buchu and cold surf.',
    pairingNotes: 'The Oceanic Collection: Ambergris Australe for quiet luxury and Buchu Sauvage for active coastal energy.'
  },
  'ZR-U10': {
    conflictingSku: 'ZR-W05',
    title: 'Ethiopian Fig & Coffee vs Mediterranean Citrus Blossom',
    difference: 'ZR-U10 (Figuier Éthiopien) is a verdant highland fig with green coffee and geranium. ZR-W05 (Nectar d\'Agrumes) is a sun-soaked Mediterranean neroli and blood orange.',
    pairingNotes: 'The Brunch Discovery Set: Figuier Éthiopien for creative garden mornings and Nectar d\'Agrumes for coastal afternoon radiance.'
  }
};

// 1. GET /api/products — Catalog with filtering & sorting
app.get('/api/products', (req, res) => {
  let products = [...catalogData.products];
  const { gender, tier, olfactive_family, season, occasion, search, sort } = req.query;

  if (gender) {
    products = products.filter(p => p.gender.toLowerCase() === gender.toLowerCase());
  }

  if (tier) {
    products = products.filter(p => p.tier === tier);
  }

  if (olfactive_family) {
    products = products.filter(p => p.olfactive_family.toLowerCase().includes(olfactive_family.toLowerCase()));
  }

  if (season) {
    products = products.filter(p => p.when_to_apply?.seasons?.some(s => s.toLowerCase() === season.toLowerCase()));
  }

  if (occasion) {
    products = products.filter(p => p.when_to_apply?.occasions?.some(o => o.toLowerCase().includes(occasion.toLowerCase())));
  }

  if (search) {
    const q = search.toLowerCase();
    products = products.filter(p => {
      const allNotes = p.all_notes || [
        ...(p.notes?.top || []),
        ...(p.notes?.middle || []),
        ...(p.notes?.base || []),
        ...(p.notes?.main || [])
      ];
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.inspired_by.brand.toLowerCase().includes(q) ||
        p.inspired_by.original_name.toLowerCase().includes(q) ||
        p.olfactive_family.toLowerCase().includes(q) ||
        p.main_accords.some(a => a.toLowerCase().includes(q)) ||
        allNotes.some(n => n.toLowerCase().includes(q))
      );
    });
  }

  // Sorting
  if (sort === 'rating') {
    products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  } else if (sort === 'reviews') {
    products.sort((a, b) => (b.reviews_count || 0) - (a.reviews_count || 0));
  } else if (sort === 'score') {
    products.sort((a, b) => (b.commercial_score || 0) - (a.commercial_score || 0));
  } else {
    // Default: Sort by commercial_rank ascending (#1 to #20)
    products.sort((a, b) => (a.commercial_rank || 99) - (b.commercial_rank || 99));
  }

  res.json({
    total: products.length,
    format: '50ml Refillable Super-Flint PCR Flacon (20%–30% Extrait)',
    products
  });
});

// 2. GET /api/products/:sku — Single product with comparison & wear guidance
app.get('/api/products/:sku', (req, res) => {
  const { sku } = req.params;
  const product = catalogData.products.find(p => p.sku.toUpperCase() === sku.toUpperCase() || p.id == sku);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const comparison = COMPARISON_MAP[product.sku] || null;

  res.json({
    product,
    comparison,
    guarantee: 'Authentic 20%–30% Extrait de Parfum in 50ml 40% PCR Super-Flint Refillable Flacon with SNI-15 Threaded Neck, Cold Zamac Magnetic Closure, and Numbered Single-Origin Certificate.'
  });
});

// 3. GET /api/search — Fast multi-field search
app.get('/api/search', (req, res) => {
  const q = (req.query.q || '').trim().toLowerCase();
  if (!q) {
    return res.json({ query: q, results: [] });
  }

  const results = catalogData.products.filter(p => {
    const allNotes = p.all_notes || [
      ...(p.notes?.top || []),
      ...(p.notes?.middle || []),
      ...(p.notes?.base || []),
      ...(p.notes?.main || [])
    ];
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.inspired_by.brand.toLowerCase().includes(q) ||
      p.inspired_by.original_name.toLowerCase().includes(q) ||
      p.olfactive_family.toLowerCase().includes(q) ||
      p.main_accords.some(a => a.toLowerCase().includes(q)) ||
      allNotes.some(n => n.toLowerCase().includes(q))
    );
  }).map(p => ({
    id: p.id,
    sku: p.sku,
    name: p.name,
    inspired_by: p.inspired_by,
    tier: p.tier,
    price: p.price,
    price_eur: p.price_eur || Math.round(p.price / 90),
    size: '50ml Super-Flint Flacon',
    image_url: p.image_url,
    rating: p.rating,
    commercial_score: p.commercial_score
  }));

  res.json({ query: q, total: results.length, results });
});

// 4. POST /api/matchmaker — Interactive Olfactive Matchmaker
app.post('/api/matchmaker', (req, res) => {
  const { vibe, accords = [], gender, season } = req.body;

  let scored = catalogData.products.map(p => {
    let score = 0;

    // Gender match
    if (!gender || gender === 'All' || p.gender.toLowerCase() === gender.toLowerCase() || p.gender === 'Unisex') {
      score += 25;
    }

    // Accords overlap
    if (accords.length > 0) {
      const matchedAccords = p.main_accords.filter(a => accords.some(userA => a.toLowerCase().includes(userA.toLowerCase())));
      score += matchedAccords.length * 15;
    }

    // Season match
    if (season && p.when_to_apply?.seasons?.some(s => s.toLowerCase() === season.toLowerCase())) {
      score += 20;
    }

    // Commercial quality bonus
    score += (p.commercial_score || 80) * 0.2;

    return { product: p, score: Math.round(score) };
  });

  scored.sort((a, b) => b.score - a.score);
  const recommendations = scored.slice(0, 3).map(item => ({
    product: item.product,
    matchPercentage: Math.min(99, Math.max(82, Math.round(item.score * 0.95))),
    recommendedRole: item.product.tier === 'TIER_1_HERO' ? 'Crown Signature' : 'Wardrobe Essential'
  }));

  res.json({ recommendations });
});

// 5. POST /api/wardrobe/calculate — Sovereign Collection Pricing
app.post('/api/wardrobe/calculate', (req, res) => {
  const { items = [] } = req.body;
  const count = items.length;

  const originalSubtotal = items.reduce((sum, item) => {
    const sku = typeof item === 'string' ? item : (item.sku || item.product?.sku);
    const prod = catalogData.products.find(p => p.sku === sku);
    const qty = item.quantity || 1;
    return sum + ((prod ? prod.price : 19500) * qty);
  }, 0);

  const bundleDiscount = 0;
  const bundleName = count > 1 ? `Sovereign Collection (${count} Flacons)` : 'Haute Parfumerie Flacon';
  const prepaidDiscount = 0;
  const finalTotal = originalSubtotal;

  res.json({
    bottleCount: count,
    originalSubtotal,
    bundleName,
    bundleDiscount: 0,
    prepaidDiscount: 0,
    freeShipping: true,
    finalTotal
  });
});

// 6. GET /api/blitznow/pincode/:pincode — Hyperlocal Delivery SLA
app.get('/api/blitznow/pincode/:pincode', (req, res) => {
  const { pincode } = req.params;
  const cleanPin = (pincode || '').trim();

  // Tier 1 Metro Pincode prefix checks
  const isMumbai = cleanPin.startsWith('400');
  const isDelhi = cleanPin.startsWith('110') || cleanPin.startsWith('122') || cleanPin.startsWith('201');
  const isBengaluru = cleanPin.startsWith('560');
  const isHyderabad = cleanPin.startsWith('500');
  const isPune = cleanPin.startsWith('411');
  const isChennai = cleanPin.startsWith('600');

  if (isMumbai || isDelhi || isBengaluru || isHyderabad || isPune || isChennai) {
    const hub = isMumbai ? 'Mumbai-MUM' : 'Kanpur-KNP';
    res.json({
      pincode: cleanPin,
      serviceable: true,
      slaType: 'Blitznow Prime Same-Day Delivery',
      estimatedDeliveryText: 'Delivered TODAY by 9:00 PM (Order before 1:00 PM)',
      hub,
      countdownMinutes: 135 // ~2h 15m left for today
    });
  } else if (cleanPin.length === 6 && /^\d+$/.test(cleanPin)) {
    res.json({
      pincode: cleanPin,
      serviceable: true,
      slaType: 'Blitznow Express Air (Next-Day Delivery)',
      estimatedDeliveryText: 'Delivered within 24–48 Hours via Express Air Courier',
      hub: 'Central Express Hub',
      countdownMinutes: 240
    });
  } else {
    res.status(400).json({ serviceable: false, error: 'Invalid 6-digit Indian PIN code' });
  }
});

// 7. POST /api/gokwik/checkout — GoKwik 1-Click Checkout Simulator
app.post('/api/gokwik/checkout', (req, res) => {
  const { phone, items, paymentMethod = 'UPI', address } = req.body;

  if (!phone || !items || items.length === 0) {
    return res.status(400).json({ error: 'Phone and items required' });
  }

  // AI RTO Risk Assessment Simulation
  const isHighRiskPhone = phone.endsWith('0000') || phone.endsWith('9999');
  const rtoScore = isHighRiskPhone ? 88.5 : 12.3;
  const isRtoFlagged = rtoScore > 60;

  // Sovereign Pricing calculation
  const total = items.reduce((sum, item) => {
    const sku = typeof item === 'string' ? item : (item.sku || item.product?.sku);
    const prod = catalogData.products.find(p => p.sku === sku);
    const qty = item.quantity || 1;
    return sum + ((prod ? prod.price : 19500) * qty);
  }, 0);

  const orderNumber = 'ZR-' + Math.floor(100000 + Math.random() * 900000);
  const orderData = {
    orderNumber,
    items,
    total,
    phone,
    paymentMethod,
    rtoScore,
    isRtoFlagged,
    status: paymentMethod === 'COD' && isRtoFlagged ? 'COD_BLOCKED_UPI_REQUIRED' : 'CONFIRMED',
    blitznowAwb: 'BLITZ-' + Math.floor(10000000 + Math.random() * 90000000),
    macerationInstructions: 'Spray 3 test pumps into air, rest bottle in dark drawer for 24-48h to settle transit oils.',
    createdAt: new Date().toISOString()
  };

  ordersDb.set(orderNumber, orderData);

  res.json({
    success: true,
    gokwikOrderId: 'GK-' + Math.floor(1000000 + Math.random() * 9000000),
    order: orderData
  });
});

// 8. GET /api/orders/:orderNumber — Order Tracking & Maceration Protocol
app.get('/api/orders/:orderNumber', (req, res) => {
  const order = ordersDb.get(req.params.orderNumber);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json({
    order,
    trackingMilestones: [
      { status: 'Order Confirmed', time: 'Just now', completed: true },
      { status: 'Bottled & Sealed at ZORUNE Atelier', time: 'In progress', completed: true },
      { status: 'Blitznow Express Pickup', time: 'Next', completed: false },
      { status: 'Out for Same-Day Delivery', time: 'Pending', completed: false }
    ],
    whatsappMacerationCard: {
      headline: 'The Connoisseur Resting Protocol',
      instruction: 'Artisanal Extrait de Parfum Elixir (30%) experiences kinetic agitation in transit. Follow the 48-hour transit rest protocol in a cool, dark drawer before testing to let the quad co-solvent matrix stabilize.'
    }
  });
});

// In-memory rate limiting store for contact submissions (OWASP A04:2021)
const contactRateLimits = new Map();
const contactInquiriesDb = [];

// 9. POST /api/contact — OWASP Top 10 Secure Concierge Inquiries
app.post('/api/contact', (req, res) => {
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  
  // Rate limiting: max 5 requests per IP in 10 minutes
  const ipHistory = contactRateLimits.get(clientIp) || [];
  const recentSubmissions = ipHistory.filter(t => now - t < 10 * 60 * 1000);
  if (recentSubmissions.length >= 5) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait before submitting another inquiry or contact our concierge directly via phone/WhatsApp.'
    });
  }

  const { name, email, phone, subject, message, hp_field, clientTimestamp } = req.body || {};

  // OWASP A04: Honeypot trap check (bots fill hidden field)
  if (hp_field) {
    return res.status(400).json({ success: false, error: 'Suspicious request rejected.' });
  }

  // OWASP A04: Bot timing check (submission under 1 second from rendering)
  if (clientTimestamp && (now - clientTimestamp < 1000)) {
    return res.status(400).json({ success: false, error: 'Automated submission detected.' });
  }

  // OWASP A03: Injection prevention & strict regex validation
  // Name validation: only alphabetical characters, spaces, periods, apostrophes, hyphens (2-60 chars)
  const nameRegex = /^[a-zA-Z\s'.-]{2,60}$/;
  if (!name || typeof name !== 'string' || !nameRegex.test(name.trim())) {
    return res.status(400).json({
      success: false,
      error: 'Invalid name. Only letters, spaces, hyphens, and apostrophes (2-60 characters) are permitted.'
    });
  }

  // Email validation: RFC 5322 compliance, no CRLF header injection
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim()) || /[\r\n]/.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid email address.'
    });
  }

  // Phone validation: Indian 10-digit mobile starting with 6-9
  const phoneClean = (phone || '').replace(/\D/g, '');
  const phoneRegex = /^[6-9]\d{9}$/;
  if (phone && !phoneRegex.test(phoneClean)) {
    return res.status(400).json({
      success: false,
      error: 'Please provide a valid 10-digit Indian mobile number.'
    });
  }

  // Whitelist subject categories
  const allowedSubjects = [
    'Fragrance Consultation & Scent Matching',
    'Order Status & Metro Express Dispatch',
    '48-Hour Maceration & Application Advice',
    'Custom Corporate & Wedding Gifting',
    'Atelier Partnership & Press',
    'General Inquiries'
  ];
  const safeSubject = allowedSubjects.includes(subject) ? subject : 'General Inquiries';

  // Message validation & sanitization
  if (!message || typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 1000) {
    return res.status(400).json({
      success: false,
      error: 'Message must be between 10 and 1000 characters.'
    });
  }

  // XSS Sanitization: strip harmful HTML tags and scripts
  const sanitize = (str) => String(str)
    .replace(/[<>%$&;{}()+=/\\*]/g, '')
    .trim();

  const safeName = sanitize(name);
  const safeMessage = sanitize(message);

  const ticketId = 'ZR-CON-' + Math.floor(100000 + Math.random() * 900000);
  const inquiry = {
    ticketId,
    name: safeName,
    email: email.trim().toLowerCase(),
    phone: phoneClean,
    subject: safeSubject,
    message: safeMessage,
    ateliers: ['Kanpur', 'Mumbai'],
    supportLines: ['+91 9777776016', '+91 9999903311'],
    submittedAt: new Date().toISOString()
  };

  contactInquiriesDb.push(inquiry);
  recentSubmissions.push(now);
  contactRateLimits.set(clientIp, recentSubmissions);

  res.json({
    success: true,
    ticketId,
    message: `Thank you, ${safeName}. Your inquiry has been routed to our Kanpur & Mumbai concierge team. We will respond within 2 to 4 business hours.`,
    inquiry
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', service: 'ZORUNE Commerce Engine', version: '1.0.0' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`ZORUNE Backend running on port ${PORT}`);
  });
}

module.exports = app;
