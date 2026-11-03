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

## Trial & Subscription
- **Trial**: ဆိုင်အသစ်ဖွင့်ချိန်မှ စတင်၍ **၁လ (၃၀ရက်) သို့မဟုတ် ၇ရက် Trial** ပေးသုံးနိုင်ပါသည်။ လက်ရှိစနစ်မှာ **၇ ရက် Free Trial** သတ်မှတ်ထားပါသည်။
- **After Trial**: Trial ကုန်ဆုံးပြီးနောက် **View Only** သာရှိမည်။ ဆက်လက်သုံးလိုပါက **Subscription Fee** ပေးဆောင်ရမည်။
- **Owner Registration**: Owner များက **Gmail ဖြင့်သာ** ဝင်ရောက်ခွင့်ရှိပါသည်။ Reset Password မလိုအပ်ပါ။
- **Shop Info**: ဆိုင်အမည်၊ လိပ်စာအပြည့်အစုံ၊ ဖုန်းနံပါတ်၊ အီးမေးလ် စသည်တို့ကို အပြည့်အစုံ ထည့်သွင်းရမည်။
- **Subscription Plans**: Billing > Plans မှတဆင့် ကြည့်ရှုနိုင်ပြီး Manual Payment (KPay/AYA Pay/CB Pay Screenshot) ဖြင့် ပေးဆောင်နိုင်ပါသည်။

## Theme & Branding
- **Primary Color:** `#aa0000` (Red)
- **Secondary Color:** `#151515` (Black)
- **Font:** `Myanmar Thuriya`
- **Logo:** Upload per shop allowed. Organization-wide custom domain/subdomain available as Add-on.

## Trial Policy
- **New Shop:** 7 days Free Trial
- **After Trial:** View Only mode until subscription/payment approved
- **Subscription:** Pay via Manual Verification (Screenshot only) for KPay/AYA Pay/CB Pay

## Trial Period
- **Duration:** 1 month + 7 days = 37 days (calendar-based)
- **Calculation:** Add 1 calendar month from registration date + 7 additional days
- **Example:** Registered on Jan 1 → trial ends Feb 7 (31 days Jan remaining logic) = 37 days total
- **Leap/Short months:** Uses calendar month addition (e.g., Feb gives 28/29 days + 7 = 35/36 days total)
- **After expiry:** Account becomes View Only until subscription is paid and approved

## UI Design & Demo
- [UI Design Detailed (Page by Page)](docs/ui-design/UI_DESIGN_DETAILED_PAGES.md)
- [UI Design Spec](docs/ui-design/UI_DESIGN_SPEC.md)
- [UI Design Screenshots](docs/images/)
- [Design System](docs/ui-design/README.txt)

### Pages Overview
**System UI (Platform Admin):** Dashboard, Shops, Manual Payment Verification (Screenshot Only), Domain Requests, Subscriptions, Add-ons  
**Shop UI:** POS (Cash Only), Products/Variants, Inventory, Purchases/GRN, Sales/Returns, Billing (Manual Screenshot), Settings  
**Auth:** Gmail-only Shop Registration, Trial 1 Month + 7 Days (37 days), View Only after expiry  
**Responsive:** Desktop/Tablet/Mobile
