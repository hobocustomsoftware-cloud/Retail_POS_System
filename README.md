# Retail POS System

**Developed by HoBo Custom Software**  
**Copyright © 2026-present HoBo Custom Software. All Rights Reserved.**

Multi-tenant (SaaS) + Standalone (Dedicated/License Key) Retail POS for clothing, electronics, hardware, parts shops.

## Features
- Product variants (Color/Size/Gender) with SKU/Barcode auto-generate
- Serial numbers & Warranty for electronics/machinery
- Branch-wise inventory, PO → GRN
- POS with barcode scanning, cart, **Cash Only** (Wallets as Add-on)
- Sales history, returns/exchanges, warranty claims
- Master data: Customers/Suppliers/Categories/Brands/Units/Branches/Users/Roles
- PIN login, License activation (Standalone), Tenant isolation (Multi-tenant)
- Manual Billing: Screenshot only (KPay/AYA Pay/CB Pay), no Transaction ID
- 7 Days Free Trial / 1 Month + 7 Days = 37 days calendar-based, View Only after expiry
- Gmail-only Owner Registration, Shop Info required
- Custom Domain/Subdomain (Add-on)

## UI Design & Demo
- [UI Design Detailed (Page by Page)](docs/ui-design/UI_DESIGN_DETAILED_PAGES.md)
- [UI Design Spec](docs/ui-design/UI_DESIGN_SPEC.md)
- [UI Design Screenshots](docs/images/)
- [Design System](docs/ui-design/README.txt)

### Pages Overview
**System UI (Platform Admin):** Dashboard, Shops Management, Manual Payment Verification (Screenshot Only), Domain Requests, Subscription Plans, Add-ons  
**Shop UI:** POS (Cash Only), Products/Variants, Inventory, Purchases/GRN, Sales/Returns, Billing (Manual Screenshot), Settings  
**Auth:** Gmail-only Shop Registration, Trial 1 Month + 7 Days (37 days), View Only after expiry  
**Responsive:** Desktop / Tablet / Mobile

## Tech Stack
- Backend: Django REST Framework + Channels
- Web: React + Vite
- Mobile: React Native + Expo
- Desktop: Electron
- DB: PostgreSQL / SQLite
- Infra: Docker

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

### Multi-tenant (SaaS) - Subscription
```bash
docker compose -f docker/docker-compose.multi-tenant.yml up --build
```

## Trial Period
- **Duration:** 1 month + 7 days = 37 days (calendar-based using `relativedelta(months=1) + timedelta(days=7)`)
- **After expiry:** View Only until subscription paid and approved

## Downloads
- [UI Design ZIP](Retail_POS_Responsive_UI_Design_HoBo_Custom_Software.zip)
- [Deployment Guide](DEPLOYMENT.md)

## Legal Documents
- [Terms and Conditions](TERMS_CONDITIONS.md)
- [Privacy Policy](PRIVACY_POLICY.md)
- [Team & Conduction](TEAM_CONDUCTION.md)

## Copyright
Copyright © 2026-present HoBo Custom Software. All Rights Reserved.
