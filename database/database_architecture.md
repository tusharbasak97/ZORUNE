# ZORUNE Database Architecture & Data Dictionary

## 1. Overview
The ZORUNE database is engineered for high-concurrency luxury e-commerce across global markets, featuring:
- **PostgreSQL 16+** with `UUIDv7` for time-sortable, unguessable identifiers.
- **pgvector** extension for semantic olfactive similarity queries (Olfactive Matchmaker).
- **Prisma ORM** schema with strict typing and relations.
- **Enriched Product Model:** Standardized to the **50ml Sovereign Terroir Flacon** architecture across 20 SKUs, priced at **₹14,800–₹27,000 / €165–€300 / $180–$330**.

## 2. SKU Naming Convention
- `ZR-W01` to `ZR-W05` — Women's Masterpiece Portfolio (5 creations)
- `ZR-M01` to `ZR-M05` — Men's Structured Formulations (5 creations)
- `ZR-U01` to `ZR-U10` — Unisex Terroir Vanguard (10 creations)

## 3. Commercial Tiers in the Database
- `TIER_1_HERO`: 12 SKUs — Flagship terroir formulations with highest commercial scores, prime homepage placement.
- `TIER_2_REVENUE`: 8 SKUs — Curated signature collection, seasonal features, and wardrobe rotation pieces.

## 4. Files in this Directory
- `schema.prisma`: The complete Prisma ORM definition with Product, Cart, Order, GoKwik, and Blitznow models.
- `init.sql`: Pure PostgreSQL 16 DDL with extensions, enums, full-text search indexes (`tsvector`), GIN indexes on accords, and table constraints.
- `seed.js`: Ingestion script reading `zorune_perfumes.json` and enriching it with terroir data, multi-currency pricing (INR/EUR/USD), and collection metadata.
- `seeded_products.json`: The compiled, production-ready JSON dataset of all 20 enriched sovereign terroir formulations.

## 5. Vector Search Architecture (`pgvector`)
Products store a 1536-dimensional embedding vector derived from their:
`name + terroir.origin + terroir.cooperative + olfactive_family + main_accords + top_notes + middle_notes + base_notes + occasions + climate_role`

When a user answers the Olfactive Matchmaker quiz, the backend generates an embedding for their desired mood (e.g. *"cool meditative Japanese wood for spring office wear"*) and executes:
```sql
SELECT sku, name, collection, 1 - (embedding <=> $user_vector) AS match_score
FROM products
ORDER BY embedding <=> $user_vector ASC
LIMIT 3;
```
