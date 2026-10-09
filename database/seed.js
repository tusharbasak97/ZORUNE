// ZORUNE Database Seeder (Normalized)
// Ingests zorune_perfumes.json and enriches data with 20ml @ ₹999 parameters,
// Commercial Tiers, Arbitrage calculations, Rescue Badges, and normalized notes pyramids.

const fs = require('fs');
const path = require('path');

const rawCatalogPath = path.join(__dirname, '../zorune_perfumes.json');
const outputPath = path.join(__dirname, 'seeded_products.json');
const frontendOutputPath = path.join(__dirname, '../frontend/src/data/products.json');

const rawCatalog = JSON.parse(fs.readFileSync(rawCatalogPath, 'utf-8'));

// Tier assignment based on commercial analysis
const TIER_1_SKUS = ['ZR-03', 'ZR-15', 'ZR-27', 'ZR-05', 'ZR-12', 'ZR-10', 'ZR-30', 'ZR-01', 'ZR-20', 'ZR-13'];
const TIER_2_SKUS = ['ZR-08', 'ZR-29', 'ZR-24', 'ZR-07', 'ZR-17', 'ZR-09', 'ZR-02', 'ZR-11', 'ZR-18', 'ZR-19', 'ZR-06', 'ZR-26', 'ZR-28'];

// Original retail MSRP in USD for arbitrage comparison
const MSRP_USD_MAP = {
  'ZR-03': 350.00, // LV Imagination
  'ZR-15': 145.00, // Dior Sauvage Eau de Toilette
  'ZR-27': 325.00, // MFK Baccarat Rouge 540
  'ZR-05': 150.00, // JPG Le Male Elixir
  'ZR-12': 410.00, // LV Ombre Nomade
  'ZR-10': 255.00, // By Kilian Angels' Share
  'ZR-30': 295.00, // Tom Ford Tobacco Vanille
  'ZR-01': 160.00, // Armani SWY Intensely
  'ZR-20': 165.00, // YSL Libre
  'ZR-13': 168.00, // Burberry Goddess
  'ZR-08': 175.00, // Chanel Bleu de Chanel
  'ZR-29': 115.00, // Paco Rabanne 1 Million
  'ZR-24': 105.00, // Versace Eros
  'ZR-07': 155.00, // YSL Y EDP
  'ZR-17': 155.00, // Carolina Herrera Good Girl
  'ZR-09': 350.00, // LV Afternoon Swim
  'ZR-02': 130.00, // Azzaro The Most Wanted
  'ZR-11': 495.00, // Creed Aventus
  'ZR-18': 145.00, // YSL Black Opium
  'ZR-19': 168.00, // Gucci Flora Gorgeous Gardenia
  'ZR-06': 330.00, // YSL Tuxedo
  'ZR-26': 145.00, // Armani My Way
  'ZR-28': 115.00, // Versace Bright Crystal
  'ZR-16': 225.00, // Byredo Gypsy Water
  'ZR-22': 210.00, // Tom Ford Black Orchid
  'ZR-04': 150.00, // Armani SWY Absolutely
  'ZR-23': 165.00, // Jo Malone English Pear & Freesia
  'ZR-25': 175.00, // Dior J'adore
  'ZR-14': 395.00, // Amouage Interlude Man
  'ZR-21': 35.00   // Davidoff Cool Water
};

const RESCUE_METADATA = {
  'ZR-21': {
    isRescueSku: true,
    rescueAngle: '1988 Vintage Marine Extrait (30% concentration — outlasts modern watery reformulations)',
    tagline: 'The Original 1988 High-Concentration Marine Wave'
  },
  'ZR-14': {
    isRescueSku: true,
    rescueAngle: 'Connoisseur Strength — Nuclear smoky resinous projection (Recommended for experienced perfume enthusiasts)',
    tagline: 'Royal Blue Frankincense & Nuclear Smoke'
  },
  'ZR-09': {
    isRescueSku: false,
    rescueAngle: 'The Extrait Fix — Reformulated with 28% oil to deliver 8+ hours where the original fades in 2 hours',
    tagline: 'Photorealistic Mediterranean Citrus Splash'
  },
  'ZR-16': {
    isRescueSku: false,
    rescueAngle: 'The Extrait Fix — Rich woody-vanilla base engineered for intimate, sustained all-day skin projection',
    tagline: 'Quiet Luxury Pine Needles & Soft Vanilla'
  },
  'ZR-04': {
    isRescueSku: true,
    rescueAngle: 'The Connoisseur Reserve Flanker — Rum liqueur and glazed chestnuts for intimate formal dinners',
    tagline: 'Aged French Rum & Glazed Chestnut Reserve'
  }
};

const enrichedProducts = rawCatalog.products.map(p => {
  const sku = p.sku;
  let tier = 'TIER_3_NICHE';
  if (TIER_1_SKUS.includes(sku)) {
    tier = 'TIER_1_HERO';
  } else if (TIER_2_SKUS.includes(sku)) {
    tier = 'TIER_2_REVENUE';
  }

  const msrpUsd = MSRP_USD_MAP[sku] || 150.00;
  const zorunePriceUsd = 12.00; // ₹999
  const arbitragePercent = Math.round(((msrpUsd - zorunePriceUsd) / msrpUsd) * 100);

  const rescue = RESCUE_METADATA[sku] || {
    isRescueSku: false,
    rescueAngle: null,
    tagline: `${p.inspired_by.original_name} Reimagined in 28% Extrait de Parfum`
  };

  // Normalize notes so top, middle, base are always valid arrays
  let topNotes = [];
  let middleNotes = [];
  let baseNotes = [];

  if (p.notes && Array.isArray(p.notes.top)) {
    topNotes = p.notes.top;
    middleNotes = p.notes.middle || [];
    baseNotes = p.notes.base || [];
  } else if (p.notes && Array.isArray(p.notes.main)) {
    if (sku === 'ZR-09') {
      topNotes = ['Mandarin Orange', 'Sicilian Orange', 'Bergamot'];
      middleNotes = ['Ginger'];
      baseNotes = ['Ambergris'];
    } else if (sku === 'ZR-30') {
      topNotes = ['Tobacco Leaf', 'Spices'];
      middleNotes = ['Tonka Bean', 'Tobacco Blossom', 'Vanilla', 'Cacao'];
      baseNotes = ['Dried Fruits', 'Woody Notes'];
    } else {
      topNotes = p.notes.main.slice(0, 2);
      middleNotes = p.notes.main.slice(2, 4);
      baseNotes = p.notes.main.slice(4);
    }
  }

  const allNotes = Array.from(new Set([...topNotes, ...middleNotes, ...baseNotes]));

  return {
    ...p,
    brand: 'ZORUNE',
    size_ml: 20,
    price: 999,
    concentration: 'Extrait de Parfum (28%)',
    stock: tier === 'TIER_1_HERO' ? 500 : tier === 'TIER_2_REVENUE' ? 250 : 100,
    tier: tier,
    original_price_usd: msrpUsd,
    original_price_inr: Math.round(msrpUsd * 83),
    arbitrage_savings_percent: arbitragePercent,
    is_rescue_sku: rescue.isRescueSku,
    rescue_angle: rescue.rescueAngle,
    tagline: rescue.tagline,
    longevity_hours: sku === 'ZR-14' || sku === 'ZR-12' ? 14 : sku === 'ZR-05' || sku === 'ZR-15' || sku === 'ZR-01' ? 12 : 8,
    sillage_rating: sku === 'ZR-14' || sku === 'ZR-12' ? 'Nuclear' : sku === 'ZR-05' || sku === 'ZR-15' ? 'Heavy' : 'Moderate to Heavy',
    notes: {
      top: topNotes,
      middle: middleNotes,
      base: baseNotes
    },
    all_notes: allNotes
  };
});

const payload = JSON.stringify({
  metadata: {
    ...rawCatalog.metadata,
    uniform_size: '20ml',
    uniform_price: 999,
    currency: 'INR',
    tier_distribution: {
      tier_1_heroes: TIER_1_SKUS.length,
      tier_2_revenue: TIER_2_SKUS.length,
      tier_3_niche_and_rescue: enrichedProducts.length - (TIER_1_SKUS.length + TIER_2_SKUS.length)
    }
  },
  products: enrichedProducts
}, null, 2);

fs.writeFileSync(outputPath, payload);
fs.writeFileSync(frontendOutputPath, payload);

console.log(`Successfully seeded ${enrichedProducts.length} enriched and normalized ZORUNE products into ${outputPath} and ${frontendOutputPath}`);
