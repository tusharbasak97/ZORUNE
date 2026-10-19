-- ZORUNE Luxury Fragrance Database Initialization Script
-- Compatible with PostgreSQL 16+ with UUIDv7 and pgvector extensions

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Enum Types
CREATE TYPE gender_type AS ENUM ('MALE', 'FEMALE', 'UNISEX');
CREATE TYPE inventory_tier_type AS ENUM ('TIER_1_HERO', 'TIER_2_REVENUE', 'TIER_3_NICHE');
CREATE TYPE season_type AS ENUM ('SPRING', 'SUMMER', 'FALL', 'WINTER');
CREATE TYPE time_of_day_type AS ENUM ('MORNING', 'DAY', 'EVENING', 'NIGHT');
CREATE TYPE order_status_type AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED', 'RTO_RETURNED');
CREATE TYPE payment_method_type AS ENUM ('UPI_PREPAID', 'CARD_PREPAID', 'NET_BANKING', 'CASH_ON_DELIVERY');
CREATE TYPE payment_status_type AS ENUM ('INITIATED', 'SUCCESS', 'FAILED', 'REFUNDED');

-- Products Table (The 7 Master Formulations: 20ml @ ₹999)
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sku VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(50) DEFAULT 'ZORUNE',
    concentration VARCHAR(50) DEFAULT 'Extrait de Parfum (30%)',
    size_ml INT DEFAULT 50,
    price DECIMAL(10, 2) DEFAULT 19500.00,
    stock INT DEFAULT 100,
    gender gender_type NOT NULL,
    commercial_score INT NOT NULL,
    commercial_rank INT NOT NULL,
    tier inventory_tier_type NOT NULL,
    
    -- Inspiration Details
    inspired_brand VARCHAR(100) NOT NULL,
    original_name VARCHAR(150) NOT NULL,
    original_price_usd DECIMAL(10, 2),
    arbitrage_savings DECIMAL(5, 2),
    
    -- Olfactive DNA
    olfactive_family VARCHAR(100) NOT NULL,
    perfumers TEXT[],
    launch_year INT,
    rating DECIMAL(3, 2),
    reviews_count INT DEFAULT 0,
    
    -- Notes & Accords
    main_accords TEXT[] NOT NULL,
    top_notes TEXT[] NOT NULL,
    middle_notes TEXT[] NOT NULL,
    base_notes TEXT[] NOT NULL,
    
    -- Application Guidance
    seasons TEXT[] NOT NULL,
    times_of_day TEXT[] NOT NULL,
    occasions TEXT[] NOT NULL,
    
    -- Presentation & Media
    description TEXT NOT NULL,
    tagline VARCHAR(255),
    image_url TEXT NOT NULL,
    
    -- Rescue Playbook & Performance Badges
    is_rescue_sku BOOLEAN DEFAULT FALSE,
    rescue_angle TEXT,
    longevity_hours INT DEFAULT 8,
    sillage_rating VARCHAR(30) DEFAULT 'Heavy',
    
    -- Vector Embeddings for AI Olfactive Matchmaker
    embedding vector(1536),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Fast Catalog Browsing & Full-Text Search
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_tier ON products(tier);
CREATE INDEX idx_products_gender ON products(gender);
CREATE INDEX idx_products_commercial_rank ON products(commercial_rank);
CREATE INDEX idx_products_commercial_score ON products(commercial_score);
CREATE INDEX idx_products_accords ON products USING GIN(main_accords);
CREATE INDEX idx_products_occasions ON products USING GIN(occasions);
CREATE INDEX idx_products_seasons ON products USING GIN(seasons);

-- Full-Text Search Index over Name, Brand, Inspiration & Notes
CREATE INDEX idx_products_fts ON products USING GIN(
    to_tsvector('english', 
        name || ' ' || 
        inspired_brand || ' ' || 
        original_name || ' ' || 
        olfactive_family || ' ' || 
        array_to_string(top_notes, ' ') || ' ' || 
        array_to_string(middle_notes, ' ') || ' ' || 
        array_to_string(base_notes, ' ') || ' ' || 
        array_to_string(main_accords, ' ')
    )
);

-- Carts Table
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items Table
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INT DEFAULT 1,
    price DECIMAL(10, 2) DEFAULT 999.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_cart_product UNIQUE(cart_id, product_id)
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number VARCHAR(30) UNIQUE NOT NULL,
    status order_status_type DEFAULT 'PENDING',
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    shipping_address JSONB NOT NULL,
    
    subtotal DECIMAL(10, 2) NOT NULL,
    bundle_discount DECIMAL(10, 2) DEFAULT 0.00,
    prepaid_discount DECIMAL(10, 2) DEFAULT 0.00,
    shipping_fee DECIMAL(10, 2) DEFAULT 0.00,
    total_amount DECIMAL(10, 2) NOT NULL,
    
    payment_method payment_method_type DEFAULT 'UPI_PREPAID',
    payment_status payment_status_type DEFAULT 'INITIATED',
    
    gokwik_order_id VARCHAR(100) UNIQUE,
    gokwik_rto_score DECIMAL(5, 2),
    is_rto_flagged BOOLEAN DEFAULT FALSE,
    
    blitznow_awb VARCHAR(100) UNIQUE,
    blitznow_status VARCHAR(50),
    estimated_delivery TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Order Items Table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INT DEFAULT 1,
    unit_price DECIMAL(10, 2) DEFAULT 999.00,
    total DECIMAL(10, 2) NOT NULL
);

-- GoKwik Transactions Log
CREATE TABLE gokwik_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    idempotency_key VARCHAR(150) UNIQUE NOT NULL,
    checkout_session VARCHAR(150) NOT NULL,
    rto_risk_level VARCHAR(20) NOT NULL,
    raw_payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blitznow Logistics Tracking
CREATE TABLE blitznow_shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    awb_number VARCHAR(100) UNIQUE NOT NULL,
    carrier VARCHAR(100) DEFAULT 'Blitznow Metro Express',
    origin_hub VARCHAR(100) NOT NULL,
    destination_pin VARCHAR(10) NOT NULL,
    current_status VARCHAR(50) NOT NULL,
    tracking_events JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
