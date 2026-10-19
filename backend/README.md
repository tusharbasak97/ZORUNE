# ZORUNE Backend API Service

## 1. Overview
The ZORUNE Backend is an enterprise-grade RESTful Node.js / Express microservice that powers catalog retrieval, instant typo-tolerant search, the Olfactive Matchmaker, dynamic Wardrobe bundle calculation, GoKwik 1-Click Checkout, and Blitznow logistics tracking.

## 2. API Endpoints

### Catalog & Search
- `GET /api/products`: Full catalog with filters (`gender`, `tier`, `olfactive_family`, `season`, `occasion`, `search`, `sort`).
- `GET /api/products/:sku`: Single product profile with notes pyramid, longevity/sillage gauges, and comparison cards (cannibalization defusal).
- `GET /api/search?q=...`: High-speed instant search querying across perfume names, SKUs, inspired brands/names, accords, and notes.

### Scent Matchmaker & Wardrobe Builder
- `POST /api/matchmaker`: Algorithmic quiz scoring matching user preferences (vibe, accords, gender, season) against the 30 formulations.
- `POST /api/wardrobe/calculate`: Sovereign Collection acquisition calculation:
  - 50ml Master Flacons: ₹18,500 – ₹24,500
  - The Sovereign Discovery Coffret (7 × 3ml): ₹4,500
  - White-Glove Insured Courier: Complimentary on all orders
  - Numbered presentation casket certificate verification

### Indian E-Commerce Operations
- `GET /api/blitznow/pincode/:pincode`: Real-time Indian PIN code validator with Same-Day SLA detection for Mumbai, Delhi-NCR, Bengaluru, Hyderabad, Chennai, and Pune.
- `POST /api/gokwik/checkout`: Simulates GoKwik 1-Click checkout, AI RTO risk assessment, OTP validation, and order generation.
- `GET /api/orders/:orderNumber`: Live tracking milestones and WhatsApp "Fragrance Maceration Protocol" card.
- `GET /api/health`: Health status.

## 3. Running Locally
```bash
npm install
npm run dev
# Server listens on port 5001
```
