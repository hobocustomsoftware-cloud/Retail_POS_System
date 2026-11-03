# Retail POS

**Developed by HoBo Custom Software**  
**Copyright © 2026-present HoBo Custom Software. All Rights Reserved.**

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

## Team & Conduction
- **Owner/Developer:** HoBo Custom Software
- **Project Type:** Custom Retail POS Solution
- **Development Team:** HoBo Custom Software Development Team
- **Conduction:** This software is developed and maintained by HoBo Custom Software. Use is subject to the terms and conditions outlined herein.

## Privacy Policy
- **Data Collection:** All business data (products, sales, customers, inventory) remains under the control of the licensee/tenant.
- **Data Storage:** For Standalone deployments, data is stored locally on the customer's server/database. For SaaS Multi-tenant deployments, data is stored securely with tenant-level isolation.
- **Data Security:** Access control via role-based permissions and PIN authentication.
- **No Third-Party Sharing:** Customer data is not shared with third parties without explicit consent.
- **License Compliance:** Standalone usage requires valid license key issued by HoBo Custom Software.

## License & Copyright
**All rights reserved.** This software and its documentation are the intellectual property of **HoBo Custom Software**.  
Unauthorized copying, modification, distribution, or commercial use without written permission from HoBo Custom Software is strictly prohibited.

## Legal Documents
- [Terms and Conditions](TERMS_CONDITIONS.md)
- [Privacy Policy](PRIVACY_POLICY.md)
- [Team & Conduction](TEAM_CONDUCTION.md)

## Copyright
Copyright © 2026-present-present HoBo Custom Software. All Rights Reserved.  
No part of this software may be reproduced without written permission from HoBo Custom Software.
