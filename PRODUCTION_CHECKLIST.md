# ZORUNE • Production Readiness Master Checklist

This document details every prerequisite, architecture change, security hardening measure, and deployment step required to take the **ZORUNE Haute Parfumerie** e-commerce platform from staging/demo mode to an enterprise-grade, high-volume production environment.

---

## 📊 High-Level Status Dashboard

| Checkpoint Domain | Core Objective | Status | Priority |
| :--- | :--- | :---: | :---: |
| **1. Database & Persistence** | PostgreSQL + Prisma migration from in-memory Map | 🟡 Architecture Ready | **CRITICAL (P0)** |
| **2. Payments & Checkout** | Live GoKwik / Razorpay gateway + secure webhooks | 🟡 Mock Implemented | **CRITICAL (P0)** |
| **3. Security & OWASP** | Secrets management, CORS lock, Helmet, Rate Limits | 🟢 Partially Done | **CRITICAL (P0)** |
| **4. Logistics & SLA** | Live Blitznow / Delhivery / Shiprocket tracking | 🟡 Mock Implemented | **HIGH (P1)** |
| **5. Transactional Comms** | Automated WhatsApp, SMS & Email notifications | ⚪ Not Started | **HIGH (P1)** |
| **6. Frontend & SEO** | Chunk optimization, Schema.org JSON-LD, WebP CDN | 🟢 Built & Clean | **MEDIUM (P2)** |
| **7. Observability & Logs** | Sentry error monitoring, structured logs, GA4 events | ⚪ Not Started | **MEDIUM (P2)** |
| **8. Vercel & CI/CD** | Multi-service routing, custom domains, automated tests | 🟢 Configured | **HIGH (P1)** |

---

## Checkpoint 1: Database & Persistent Storage (P0 - CRITICAL)

> **Current State:** The backend currently stores orders in a transient in-memory `Map` (`ordersDb`) in [`backend/src/server.js`](backend/src/server.js) and loads catalog data from JSON files. On serverless deployments (Vercel), memory resets on cold starts.
> 
> **Target State:** Managed PostgreSQL 16+ with persistent tables via Prisma ORM defined in [`database/schema.prisma`](database/schema.prisma).

- [ ] **1.1 Provision Managed PostgreSQL Database**
  - [ ] Set up a production database instance on Supabase, Neon Serverless, AWS RDS, or Vercel Postgres.
  - [ ] Enable connection pooling (PgBouncer or Prisma Accelerate) for high-concurrency serverless connections.
  - [ ] Configure automatic daily automated backups and point-in-time recovery (PITR).

- [ ] **1.2 Initialize Database Schema & Extensions**
  - [ ] Install Prisma in backend: `npm install @prisma/client` and `npm install -D prisma`.
  - [ ] Run `npx prisma db push` or `npx prisma migrate deploy` using [`database/schema.prisma`](database/schema.prisma).
  - [ ] Enable `pgvector` extension if semantic fragrance similarity search is enabled.
  - [ ] Verify creation of tables: `Product`, `Order`, `OrderItem`, `ContactTicket`, `CartSession`, `BlitznowPincode`.

- [ ] **1.3 Database Seeding & Catalog Sync**
  - [ ] Run [`database/seed.js`](database/seed.js) to ingest all 30 master formulation perfumes into the database.
  - [ ] Verify SKU uniqueness (`ZR-01` to `ZR-30`) and uniform commercial pricing (₹999 @ 20ml Extrait de Parfum).
  - [ ] Verify index health on `sku`, `gender`, `tier`, `olfactive_family`, and price columns.

- [ ] **1.4 Refactor Backend to Prisma Client**
  - [ ] Replace `ordersDb = new Map()` in [`backend/src/server.js`](backend/src/server.js) with `prisma.order.create` and `prisma.order.findUnique`.
  - [ ] Replace local file reading in `/api/products` with `prisma.product.findMany`.
  - [ ] Store customer contact inquiries in `prisma.contactTicket.create` instead of memory-only tracking.

---

## Checkpoint 2: Payments, Checkout & Webhooks (P0 - CRITICAL)

> **Current State:** `/api/gokwik/checkout` generates a simulated order ID and returns a mock payment status for UX demonstration.

- [ ] **2.1 Production Gateway Activation**
  - [ ] Complete KYC verification on **GoKwik Checkout** and/or **Razorpay** / **Cashfree** live accounts.
  - [ ] Obtain live production API keys (`MID`, `App Secret`, `API Key`).
  - [ ] Configure allowed payment instruments: UPI (PhonePe, GPay, Paytm), Cards, Netbanking, COD (Cash on Delivery with OTP verification).

- [ ] **2.2 Cryptographic Webhook Security**
  - [ ] Set up secure `/api/webhooks/payment` endpoint in Express.
  - [ ] Use `express.raw({ type: 'application/json' })` to capture the unparsed request payload.
  - [ ] Verify HMAC-SHA256 signature using payment provider webhook secret before updating order status:
    ```javascript
    const expectedSig = crypto
      .createHmac('sha256', process.env.PAYMENT_WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');
    ```
  - [ ] Reject any webhook requests with mismatched signatures (`HTTP 401 Unauthorized`).

- [ ] **2.3 Server-Side Order Price Validation (Zero Trust)**
  - [ ] Never calculate order totals from client-submitted prices.
  - [ ] Recalculate item subtotals, quantity discounts, wardrobe bundle savings (e.g. ₹500 off on 2+ bottles), and shipping fees exclusively on the backend from database records before creating the payment session.
  - [ ] Implement idempotency keys to avoid duplicate order charges on repeated network requests.

- [ ] **2.4 Refund & Cancellation Workflow**
  - [ ] Connect Transit Guarantee breakage claims and cancellation requests to automated gateway refund APIs.
  - [ ] Store refund transaction IDs in the `Order` audit log.

---

## Checkpoint 3: Security & OWASP Hardening (P0 - CRITICAL)

- [ ] **3.1 Secrets & Environment Isolation**
  - [ ] Remove all dummy secrets or fallback strings from code.
  - [ ] Verify `.env` is listed in [`.gitignore`](.gitignore) and no credentials are committed to Git.
  - [ ] Add production secrets into the Vercel Dashboard (`Settings > Environment Variables`).
  - [ ] Maintain separate configurations for `Development`, `Preview`, and `Production` environments.

- [ ] **3.2 HTTP Security Headers with Helmet**
  - [ ] Install `helmet` in backend (`npm install helmet`).
  - [ ] Apply `app.use(helmet())` with custom Content Security Policy (CSP):
    - Whitelist fonts from Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`).
    - Whitelist payment gateway iframes (`api.gokwik.co`, `api.razorpay.com`).
  - [ ] Enable HTTP Strict Transport Security (`HSTS`) with `maxAge: 31536000, includeSubDomains: true, preload: true`.

- [ ] **3.3 Strict CORS Policy**
  - [ ] Replace wildcard `app.use(cors())` with strict origin validation:
    ```javascript
    const allowedOrigins = [
      'https://zorune.com',
      'https://www.zorune.com',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    app.use(cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Blocked by CORS security policy'));
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS']
    }));
    ```

- [ ] **3.4 Distributed API Rate Limiting**
  - [ ] Install `express-rate-limit` (or Upstash Redis rate limiting for serverless):
    - `/api/contact`: Limit to **5 submissions per IP per 15 minutes**.
    - `/api/gokwik/checkout`: Limit to **10 attempts per IP per 10 minutes**.
    - `/api/matchmaker`: Limit to **20 requests per IP per minute**.
    - General `/api/*`: Limit to **100 requests per IP per minute**.

- [ ] **3.5 Input Sanitization & Payload Protection**
  - [ ] Set JSON request limit to `app.use(express.json({ limit: '30kb' }))` to prevent payload memory exhaustion.
  - [ ] Keep server-side regex and XSS strip filters on all user text inputs (names, addresses, inquiries).

---

## Checkpoint 4: Logistics, Couriers & Dispatch SLAs (P1 - HIGH)

> **Current State:** `/api/blitznow/pincode/:pincode` in `server.js` evaluates hardcoded pincode zones (Tier 1 Metros: Delhi NCR, Mumbai, Bengaluru, Kanpur).

- [ ] **4.1 Real-Time Courier Aggregator Integration**
  - [ ] Create commercial accounts with **Blitznow**, **Shiprocket**, or **Delhivery Express**.
  - [ ] Connect live courier serviceability API:
    - Tier-1 Metro SLA: 24–48 hour delivery guarantee.
    - Tier-2 & Rest of India: 48–72 hour delivery.
  - [ ] Store real-time shipping costs and estimate delivery dates at checkout based on destination pincode.

- [ ] **4.2 Automated AWB Generation & Dispatch Manifest**
  - [ ] Trigger Air Waybill (AWB) generation automatically upon payment confirmation.
  - [ ] Assign dispatch batches to fulfillment hubs (**Kanpur Atelier** or **Mumbai BKC**).
  - [ ] Expose real-time tracking webhook to update customers on transit milestones.

- [ ] **4.3 Transit Breakage Guarantee Policy Flow**
  - [ ] Implement photo-upload endpoint for transit breakage claims under the 100% Replacement Guarantee.
  - [ ] Automatically route claims to concierge queue with priority dispatch SLA.

---

## Checkpoint 5: Customer Notifications & Transactional Communications (P1 - HIGH)

- [ ] **5.1 Transactional Email Service**
  - [ ] Set up **Resend**, **Postmark**, or **Amazon SES** with dedicated custom domain records (`SPF`, `DKIM`, `DMARC`).
  - [ ] Create responsive HTML luxury email templates:
    - Order Confirmation with itemized breakdown & ₹999 Extrait badges.
    - Dispatch Notification with tracking link & courier partner.
    - Contact Inquiry Receipt with Reference Ticket (`ZR-CON-XXXXXX`).
    - 48-Hour Maceration & Application Guide tips sent 2 days post-delivery.

- [ ] **5.2 WhatsApp Business & SMS Notification System**
  - [ ] Register WhatsApp Business API (via Gupshup, Wati, or Twilio).
  - [ ] Pre-approve Meta message templates:
    - `zorune_order_placed`
    - `zorune_out_for_delivery`
    - `zorune_concierge_reply`
  - [ ] Provide instant WhatsApp concierge opt-in at checkout.

---

## Checkpoint 6: Frontend Performance, Assets & SEO (P2 - MEDIUM)

- [ ] **6.1 Vite Build Chunking & Optimization**
  - [ ] In [`frontend/vite.config.ts`](frontend/vite.config.ts), split heavy dependencies (`lucide-react`, `framer-motion`, `lenis`) into manual vendor chunks to keep bundle chunks below 300 kB:
    ```typescript
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-motion': ['framer-motion', 'lenis'],
            'vendor-icons': ['lucide-react']
          }
        }
      }
    }
    ```

- [ ] **6.2 Image & Media Delivery Optimization**
  - [ ] Ensure all 30 bottle images and editorial hero banners are compressed in `.webp` or `.avif` formats.
  - [ ] Host product images on high-speed CDN (Cloudinary, Cloudflare R2, or Vercel Blob) with proper caching headers (`Cache-Control: public, max-age=31536000, immutable`).
  - [ ] Add `width` and `height` attributes to avoid Cumulative Layout Shift (CLS).

- [ ] **6.3 Structured Data & E-Commerce SEO**
  - [ ] In [`frontend/index.html`](frontend/index.html), add JSON-LD structured data for:
    - `Organization` (ZORUNE Haute Parfumerie, Atelier locations in Kanpur & Mumbai).
    - `Product` schema for each perfume (price: ₹999, currency: INR, availability: InStock, Extrait de Parfum Elixir 30%).
    - `FAQPage` schema corresponding to the policy FAQ items.
  - [ ] Add Open Graph (`og:image`, `og:title`, `og:description`) and Twitter card tags.
  - [ ] Deploy dynamic or static `sitemap.xml` and `robots.txt` in `frontend/public/`.

- [ ] **6.4 Global Error Boundary & Graceful Fallbacks**
  - [ ] Wrap the root application in a React `ErrorBoundary` component to present a luxury styled error screen instead of an unhandled crash if a client-side exception occurs.

---

## Checkpoint 7: Observability, Error Tracking & Analytics (P2 - MEDIUM)

- [ ] **7.1 Error & Performance Monitoring**
  - [ ] Integrate **Sentry** or **LogRocket** in the frontend (`@sentry/react`).
  - [ ] Integrate Sentry in the Express backend (`@sentry/node`).
  - [ ] Configure alert rules for unhandled 5xx errors and failed checkout webhooks sent to Slack/Email.

- [ ] **7.2 Backend Structured Logging**
  - [ ] Replace `console.log` and `console.error` in [`backend/src/server.js`](backend/src/server.js) with structured JSON logging (`pino` or `winston`).
  - [ ] Include request IDs (`x-request-id`) across request lifecycles for tracing.

- [ ] **7.3 Analytics & E-Commerce Event Telemetry**
  - [ ] Integrate **Google Tag Manager (GTM)** or **GA4**.
  - [ ] Implement standard GA4 e-commerce events:
    - `view_item` (when opening perfume details)
    - `add_to_cart` (cart drawer addition)
    - `begin_checkout` (opening checkout modal)
    - `purchase` (confirmed payment with revenue & transaction ID)
  - [ ] Integrate Meta Pixel for conversion tracking on Indian ad platforms.

- [ ] **7.4 24/7 Uptime Health Monitoring**
  - [ ] Add automated uptime ping on `/api/health` using **UptimeRobot**, **BetterStack**, or **Checkly**.
  - [ ] Configure SMS/Call alerts for downtime exceeding 1 minute.

---

## Checkpoint 8: Deployment, Domain & CI/CD (P1 - HIGH)

- [ ] **8.1 Custom Domain & DNS Configuration**
  - [ ] Purchase/configure custom domain: `zorune.com` and `www.zorune.com`.
  - [ ] Add DNS records pointing to Vercel:
    - `A` Record: `@` &rarr; `76.76.21.21`
    - `CNAME` Record: `www` &rarr; `cname.vercel-dns.com`
  - [ ] Ensure automatic SSL/TLS certificate is generated and valid.

- [ ] **8.2 Vercel Services Verification**
  - [ ] Test [`vercel.json`](vercel.json) deployment routing:
    - Frontend serves client assets from Vite build.
    - `/api/*` rewrites correctly route to Express serverless handlers.
  - [ ] Verify HTTP 200 on `/api/health` on live production domain.

- [ ] **8.3 Automated CI/CD Pipeline (GitHub Actions)**
  - [ ] Create `.github/workflows/ci.yml` to run automated verification on every PR:
    ```bash
    # Frontend verification
    cd frontend && npm ci && npm run build && npm run lint

    # Backend verification
    cd backend && npm ci && node -e "require('./src/server.js')"
    ```
  - [ ] Protect the `main` branch with required status checks before merging.

---

## 🔐 Appendix: Production Environment Variables Reference

Create these variables in the **Vercel Project Settings (`Environment Variables`)**:

```ini
# ==============================================================================
# BACKEND RUNTIME ENVIRONMENT VARIABLES
# ==============================================================================
NODE_ENV="production"
PORT=5001

# Database Connection (Neon / Supabase / AWS RDS PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-host.region.aws.neon.tech/zorunedb?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://user:password@ep-host.region.aws.neon.tech/zorunedb?sslmode=require"

# Security & CORS
FRONTEND_URL="https://zorune.com"
ALLOWED_ORIGINS="https://zorune.com,https://www.zorune.com"
JWT_SECRET="generate-a-strong-random-64-char-secret-string"

# GoKwik / Payment Gateway Live Credentials
GOKWIK_APP_ID="prod_gk_app_xxxxxx"
GOKWIK_APP_SECRET="prod_gk_secret_xxxxxx"
GOKWIK_ENV="production"
PAYMENT_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxx"

# Courier & Logistics (Blitznow / Shiprocket / Delhivery)
BLITZNOW_API_KEY="blitz_prod_live_xxxxxx"
SHIPROCKET_API_USER="operations@zorune.com"
SHIPROCKET_API_PASS="super_secure_password"

# Transactional Communications (Resend / Gupshup)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
GUPSHUP_APP_NAME="ZoruneAlerts"
GUPSHUP_API_KEY="prod_gupshup_xxxxxx"

# Sentry Monitoring
SENTRY_DSN="https://xxxx@o0.ingest.sentry.io/xxxx"

# ==============================================================================
# FRONTEND BUILD-TIME VARIABLES (Vite - prefixed with VITE_)
# ==============================================================================
VITE_API_URL="/api"
VITE_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
VITE_META_PIXEL_ID="XXXXXXXXXXXXXXX"
VITE_SENTRY_FRONTEND_DSN="https://xxxx@o0.ingest.sentry.io/xxxx"
```

---

## 🚀 Pre-Launch Go/No-Go Checklist

Before driving public ad traffic or announcing the launch:

- [ ] Place a real ₹999 live order using a real UPI ID / Credit Card.
- [ ] Confirm funds arrive in Merchant Settlement Account.
- [ ] Verify order record persists in the PostgreSQL database with correct items and pricing.
- [ ] Confirm receipt of Order Confirmation Email and WhatsApp message within 60 seconds.
- [ ] Trigger an inquiry submission on the unified **Contact Us** form & verify receipt of Reference Ticket email.
- [ ] Run Google Lighthouse Audit on mobile: target scores &gt; 90 for Performance, Accessibility, and SEO.
- [ ] Verify `/api/health` returns status `healthy` with `200 OK`.
