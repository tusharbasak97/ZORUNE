export type Gender = 'Male' | 'Female' | 'Unisex';

export type InventoryTier = 'TIER_1_HERO' | 'TIER_2_REVENUE' | 'TIER_3_NICHE';

export interface InspiredBy {
  brand: string;
  original_name: string;
}

export interface WhenToApply {
  seasons: string[];
  time_of_day: string[];
  occasions: string[];
}

export interface Notes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface TerroirData {
  origin: string;
  cooperative: string;
  coordinates: string;
  elevation: string;
  harvest_season: string;
}

export interface EcoPackaging {
  glass: string;
  neck: string;
  secondary: string;
  cap: string;
}

export interface ChemicalDossier {
  key_molecules: string[];
  co_solvent_matrix: string;
  water_content: string;
  carrier: string;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  brand: string;
  collection: string;
  inspired_by: InspiredBy;
  formula_code?: string;
  subtitle?: string;
  concept?: string;
  climate_role?: string;
  concentration: string;
  gender: Gender;
  rating: number;
  reviews_count: number;
  launch_year?: number;
  olfactive_family: string;
  perfumers?: string[];
  when_to_apply: WhenToApply;
  main_accords: string[];
  notes: Notes;
  all_notes?: string[];
  description: string;
  image_url: string;
  commercial_score: number;
  commercial_rank: number;
  size_ml: number;
  price: number;
  price_eur?: number;
  price_usd?: number;
  stock: number;
  tier: InventoryTier;
  is_rescue_sku: boolean;
  rescue_angle?: string;
  tagline?: string;
  longevity_hours: number;
  sillage_rating: string;
  flacon_spec?: string;
  terroir?: TerroirData;
  eco_packaging?: EcoPackaging;
  chemical_dossier?: ChemicalDossier;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ComparisonInfo {
  conflictingSku: string;
  title: string;
  difference: string;
  pairingNotes: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  phone: string;
  trackingAwb: string;
  estimatedDelivery: string;
  macerationInstructions: string;
}
