const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Load enriched catalog data
const catalogPath = path.join(__dirname, '../../database/seeded_products.json');
let catalogData = { metadata: {}, products: [] };

try {
  if (fs.existsSync(catalogPath)) {
    catalogData = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
  } else {
    const rawPath = path.join(__dirname, '../../zorune_perfumes.json');
    catalogData = JSON.parse(fs.readFileSync(rawPath, 'utf-8'));
  }
} catch (err) {
  console.error('Error loading catalog data:', err);
}

// In-memory store for demo orders & tracking
const ordersDb = new Map();

// Cannibalization defusal pair mappings
const COMPARISON_MAP = {
  'ZR-01': {
    conflictingSku: 'ZR-04',
    title: 'The Armani SWY Flanker Decision',
    difference: 'ZR-01 (Intense) is warm, sweet toffee and cinnamon for dates and parties. ZR-04 (Absolute) is a mature, boozy rum and glazed chestnut blend for intimate dinners.',
    bundleSuggestion: 'The Sweet & Boozy Duo (Get Both for ₹1,799)'
  },
  'ZR-04': {
    conflictingSku: 'ZR-01',
    title: 'The Armani SWY Flanker Decision',
    difference: 'ZR-04 (Absolute) offers aged French rum and smoky vanilla reserve. ZR-01 (Intense) delivers projecting toffee-cinnamon sweetness.',
    bundleSuggestion: 'The Sweet & Boozy Duo (Get Both for ₹1,799)'
  },
  'ZR-07': {
    conflictingSku: 'ZR-08',
    title: 'The Blue Fragrance Persona',
    difference: 'ZR-07 (Apex) is crisp green apple and sage for high-energy daily wear and gym. ZR-08 (Bleu) is refined grapefruit and smoky incense for executive boardrooms.',
    bundleSuggestion: 'The Executive & Everyday Duo (Get Both for ₹1,799)'
  },
  'ZR-08': {
    conflictingSku: 'ZR-15',
    title: 'The Blue Fragrance Persona',
    difference: 'ZR-08 (Bleu) is poised Chanel-style boardroom elegance. ZR-15 (Savage) is raw, magnetic spicy mandarin and sandalwood projection for nightlife.',
    bundleSuggestion: 'The Day & Night Blue Duo (Get Both for ₹1,799)'
  },
  'ZR-15': {
    conflictingSku: 'ZR-08',
    title: 'The Blue Fragrance Persona',
    difference: 'ZR-15 (Savage) cuts through cool night air with spicy mandarin and olibanum. ZR-08 (Bleu) is quieter, aristocratic incense.',
    bundleSuggestion: 'The Day & Night Blue Duo (Get Both for ₹1,799)'
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
    // Default: Sort by commercial_rank ascending (#1 to #30)
    products.sort((a, b) => (a.commercial_rank || 99) - (b.commercial_rank || 99));
  }

  res.json({
    total: products.length,
    uniform_format: '20ml Extrait de Parfum (28%) @ ₹999',
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
    guarantee: 'Authentic 28% Extrait de Parfum in 20ml Obsidian Flacon (~300 sprays / 2 months daily wear).'
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
    price: 999,
    size: '20ml',
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

// 5. POST /api/wardrobe/calculate — Dynamic Wardrobe Pricing
app.post('/api/wardrobe/calculate', (req, res) => {
  const { items = [], isPrepaidUpi = true } = req.body;
  const count = items.length;

  const basePricePerBottle = 999;
  const originalSubtotal = count * basePricePerBottle;

  let bundleDiscount = 0;
  let bundleName = 'Solo Flacon';

  if (count === 2) {
    bundleDiscount = 199; // 2 x 999 = 1998 -> 1,799
    bundleName = 'Day & Night Duo (Save ₹199)';
  } else if (count === 3) {
    bundleDiscount = 498; // 3 x 999 = 2997 -> 2,499
    bundleName = 'The 3-Season Wardrobe (Save ₹498)';
  } else if (count >= 4) {
    bundleDiscount = (count * 999) - (count * 799); // ₹799 per bottle for 4+
    bundleName = `The Connoisseur's Collection (${count} Bottles @ ₹799/ea)`;
  }

  const subtotalAfterBundle = originalSubtotal - bundleDiscount;
  const prepaidDiscount = isPrepaidUpi && count > 0 ? 100 : 0;
  const finalTotal = Math.max(0, subtotalAfterBundle - prepaidDiscount);

  res.json({
    bottleCount: count,
    originalSubtotal,
    bundleName,
    bundleDiscount,
    prepaidDiscount,
    freeShipping: count >= 2 || finalTotal >= 999,
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

  // Pricing calculation
  const count = items.length;
  let bundleDiscount = count === 2 ? 199 : count === 3 ? 498 : count >= 4 ? (count * 200) : 0;
  let prepaidDiscount = paymentMethod === 'UPI' ? 100 : 0;
  let total = (count * 999) - bundleDiscount - prepaidDiscount;

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
      instruction: 'Artisanal Extrait de Parfum (28%) experiences kinetic agitation in transit. Allow 24 hours of resting in room temperature darkness for the top bergamot and heart notes to blossom.'
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

app.listen(PORT, () => {
  console.log(`ZORUNE Backend running on port ${PORT}`);
});
