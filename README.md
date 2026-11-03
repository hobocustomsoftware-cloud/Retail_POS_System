# Retail POS

Multi-tenant (SaaS) + Standalone (license key) Retail POS for clothing, electronics, hardware, parts shops.

## Features
- Product variants (Color/Size/Gender) with SKU/Barcode auto-generate
- Serial numbers & Warranty for electronics/machinery
- Branch-wise inventory, PO → GRN
- POS with barcode scanning, cart, split payments
- Sales history, returns, warranty claims
- Customers/Suppliers, Users/Roles/PIN login
- Docker standalone deployment

## Quick Start

### Development
```bash
npm install
npm run dev
```

### Standalone (Docker)
```bash
npm run docker:standalone
```

Access: Web http://localhost:5173, API http://localhost:8000, Admin http://localhost:8000/admin
