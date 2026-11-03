# Retail POS (Multi-branch Ready) Plan

## Goal
Build a POS system for retail shops (clothing/apparel, car parts/accessories, electronics, grocery/hardware/building materials etc.) with support for:
- Product variants (color, size, gender/category attributes)
- SKU/Barcode (auto-generate if not provided)
- Serial numbers + Warranty (electronics/machinery)
- Stock/Inventory (branch-wise)
- Pricing (retail/wholesale)
- Customers, Suppliers
- Purchases/GRN
- Sales (Invoice/Receipt) with barcode scanning
- Returns/Exchanges
- Discounts/Promotions
- Multi-branch/Store support
- Users/Roles/PIN
- Multi-tenancy (SaaS) + Standalone (license key)

## Tech Stack
- **Backend**: Django REST Framework + Channels (WebSocket)
- **Web**: React + Vite
- **Mobile**: React Native + Expo
- **Desktop**: Electron
- **DB**: PostgreSQL (primary), SQLite for simple standalone
- **Infra**: Docker, Turborepo monorepo

## Deployment Models
- **Standalone (dedicated)**: Single business, license key activation (online/offline hybrid), self-hostable via Docker or installer
- **Multi-tenancy (SaaS)**: Hosted multi-tenant, subscription-based, row-level tenant isolation (`tenant_id`)

## Core Models (draft)

### Tenancy/Licensing
- `Tenant` (multi-tenant)
- `License` (standalone: key, machine_id, activated_at, expires_at, status)
- `Branch/Store` (multi-branch)

### Products/Inventory
- `Category`, `Brand`, `Supplier`, `Unit` (pcs/kg/meter)
- `Product` (base product, type, warranty config, has_variants)
- `Attribute`, `AttributeValue` (e.g. Color: Red/White/Black, Size: S/M/L/XL/XXL/XXXL, Gender: Men/Women/Kids)
- `ProductVariant` (product + attribute values, SKU, barcode auto-generated, price, cost, track_serial/warranty)
- `Stock` (branch + variant, qty, min_qty)
- `SerialNumber` (sold items, warranty tracking)

### Sales
- `Customer` (with credit/debt)
- `Sale/Invoice` (branch, customer, user, items, payments, discounts, tax)
- `SaleItem` (variant/product, qty, price, serials)
- `Payment` (cash/card/mobile/split/credit)
- `Hold/Suspend`

### Purchases/Returns/Warranty
- `PurchaseOrder`, `GoodsReceivedNote` (GRN)
- `PurchaseItem`
- `SalesReturn`, `SalesReturnItem`
- `WarrantyClaim` (serial, customer, issue, status, resolution)

### Users/Auth
- `User` (role, pin, branch, tenant)
- Roles: ADMIN, MANAGER, CASHIER, SALES, STOCK_KEEPER

## Key Features
- **Variants matrix**: Attribute-based variants (clothing sizes/colors/gender, flexible)
- **Barcode**: Auto-generate internal barcode/SKU if missing; keyboard wedge + camera scanner support
- **Warranty**: Product warranty config + serial tracking per sold item + warranty claims
- **Branch-wise stock**: Per branch/warehouse, real-time deduction on sale completion
- **Multi-payment**: Cash/Card/Mobile Money/Split/Credit
- **Purchases**: PO → GRN, update stock/cost
- **Returns/Exchanges**: By invoice, restock or damaged
- **License**: Standalone license key check/activation (hybrid online/offline)

## Implementation Plan

### Phase 1: Backend Core (Django)
1. Setup apps: `tenants`, `licensing`, `core`, `products`, `inventory`, `sales`, `purchases`, `customers`, `suppliers`, `warranty`, `accounts`
2. Models + migrations for all entities above
3. Multi-tenancy middleware (row-level by tenant_id) + standalone mode detection
4. License middleware/API (machine ID, activation)
5. RBAC + PIN auth
6. REST APIs (ViewSets) + permissions
7. Barcode auto-generation utility
8. Serial/warranty logic

### Phase 2: Real-time & POS APIs
1. Channels setup for stock updates (optional)
2. Sale completion logic (stock deduction, serial assignment)
3. Barcode lookup endpoint

### Phase 3: Web (React + Vite)
1. POS Screen (barcode scan, cart, variants, customer, payments)
2. Products/Variants management
3. Inventory/Stock by branch
4. Purchases/GRN
5. Sales history/Returns
6. Warranty claims
7. Users/Roles/Branches
8. License activation (standalone)
9. Settings/Tax/Discounts

### Phase 4: Mobile (Expo) + Desktop (Electron)
1. Mobile: POS/quick sale, stock lookup
2. Desktop: Electron wrapper + printer config (ESC/POS)

### Phase 5: Docker & Docs
1. Dockerfiles + docker-compose for standalone (backend/web/db/redis)
2. `.env.example`
3. Migration/seed scripts
4. Docs: setup, licensing, multi-tenancy

## Next Step
Switch to implementation agent to build backend models/migrations first.

