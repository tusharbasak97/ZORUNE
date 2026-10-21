// ZORUNE Database Seeder (Sovereign Haute Niche Parfumerie Edition)
// Synchronizes 20 sovereign terroir formulations (50ml refillable flacons) into database & frontend

const fs = require('fs');
const path = require('path');

const rawCatalogPath = path.join(__dirname, '../zorune_perfumes.json');
const outputPath = path.join(__dirname, 'seeded_products.json');
const frontendOutputPath = path.join(__dirname, '../frontend/src/data/products.json');
const backendOutputPath = path.join(__dirname, '../backend/data/seeded_products.json');

const rawCatalog = JSON.parse(fs.readFileSync(rawCatalogPath, 'utf-8'));

const enrichedProducts = rawCatalog.products.map(p => {
  const topNotes = p.notes && Array.isArray(p.notes.top) ? p.notes.top : [];
  const middleNotes = p.notes && Array.isArray(p.notes.middle) ? p.notes.middle : [];
  const baseNotes = p.notes && Array.isArray(p.notes.base) ? p.notes.base : [];
  const allNotes = Array.from(new Set([...topNotes, ...middleNotes, ...baseNotes]));

  return {
    ...p,
    brand: 'ZORUNE',
    collection: p.collection || 'Unisex Terroir Collection',
    size_ml: p.size_ml || 50,
    price: p.price,
    price_eur: p.price_eur || Math.round(p.price / 90),
    price_usd: p.price_usd || Math.round(p.price / 83),
    concentration: p.concentration || 'Extrait de Parfum (25%)',
    stock: p.stock || 65,
    tier: p.tier || (p.commercial_rank <= 12 ? 'TIER_1_HERO' : 'TIER_2_REVENUE'),
    is_rescue_sku: false,
    tagline: p.tagline,
    longevity_hours: p.longevity_hours || 16,
    sillage_rating: p.sillage_rating || 'Intimate to Enveloping',
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
    total_products: enrichedProducts.length,
    flacon_format: '50mL Master Super-Flint Crystal Flacon (Refillable)',
    flagship_currency: 'INR',
    international_currencies: ['EUR', 'USD', 'JPY'],
    tier_distribution: {
      tier_1_heroes: enrichedProducts.filter(p => p.tier === 'TIER_1_HERO').length,
      tier_2_revenue: enrichedProducts.filter(p => p.tier === 'TIER_2_REVENUE').length
    }
  },
  products: enrichedProducts
}, null, 2);

fs.writeFileSync(outputPath, payload);
fs.writeFileSync(frontendOutputPath, payload);
fs.writeFileSync(backendOutputPath, payload);

console.log(`✅ Successfully seeded ${enrichedProducts.length} Sovereign Terroir ZORUNE formulations into all data stores.`);
