# Retail POS

Multi-tenant (SaaS) + Standalone (Dedicated/License Key) Retail POS for clothing, electronics, hardware, parts shops.

## Features
- Product variants (Color/Size/Gender) with SKU/Barcode auto-generate
- Serial numbers & Warranty for electronics/machinery
- Branch-wise inventory, PO → GRN
- POS with barcode scanning, cart, payments (Cash/Card/Mobile/Split/Credit)
- Sales history, returns/exchanges, warranty claims
- Master data: Customers/Suppliers/Categories/Brands/Units/Branches/Users/Roles
- PIN login, License activation (Standalone), Tenant isolation (Multi-tenant)

## Quick Start

### Development
```bash
npm install
npm run dev
```

### Standalone (Dedicated) - License Key
```bash
docker compose -f docker/docker-compose.standalone.yml up --build
```
Access: http://localhost:5173 | API: http://localhost:8000 | Admin: http://localhost:8000/admin
Default: admin / 1234 (after seed)

### Multi-tenant (SaaS) - Subscription
```bash
docker compose -f docker/docker-compose.multi-tenant.yml up --build
```
Optimized for server deployment with tenant isolation. DB on 5433, Redis on 6380.

## Default Credentials
- Admin: username `admin`, PIN `1234`
