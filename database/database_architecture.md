# ZORUNE Database Architecture & Data Dictionary

## 1. Overview
The ZORUNE database is engineered for high-concurrency luxury e-commerce in India, featuring:
- **PostgreSQL 16+** with `UUIDv7` for time-sortable, unguessable identifiers.
- **pgvector** extension for semantic olfactive similarity queries (Matchmaker Quiz).
- **Prisma ORM** schema with strict typing and relations.
- **Enriched Product Model:** Standardized to the **Uniform 20ml @ ₹999** architecture across all 30 SKUs.

## 2. Commercial Tiers in the Database
- `TIER_1_HERO`: 10 SKUs (50% inventory volume, top search ranking, prime homepage placement).
- `TIER_2_REVENUE`: 13 SKUs (35% inventory volume, signature daily wear, curated collections).
- `TIER_3_NICHE`: 7 SKUs (15% inventory volume, connoisseurs, rescue playbooks, and bundle add-ons).

## 3. Files in this Directory
- `schema.prisma`: The complete Prisma ORM definition with Product, Cart, Order, GoKwik, and Blitznow models.
- `init.sql`: Pure PostgreSQL 16 DDL with extensions, enums, full-text search indexes (`tsvector`), GIN indexes on accords, and table constraints.
- `seed.js`: Ingestion script reading `zorune_perfumes.json` and enriching it with commercial pricing, arbitrage data, and rescue metadata.
- `seeded_products.json`: The compiled, production-ready JSON dataset of all 30 enriched fragrances.

## 4. Vector Search Architecture (`pgvector`)
Products store a 1536-dimensional embedding vector derived from their:
`name + inspired_by + olfactive_family + main_accords + top_notes + middle_notes + base_notes + occasions`

When a user answers the 3-question visual quiz, the backend generates an embedding for their desired mood (e.g. *"dark smoky winter date night"*) and executes:
```sql
SELECT sku, name, 1 - (embedding <=> $user_vector) AS match_score
FROM products
ORDER BY embedding <=> $user_vector ASC
LIMIT 3;
```
