# Retail POS (Multi-branch Ready) Plan

## Goal
Build a POS system for retail shops (clothing/apparel, car parts/accessories, electronics, grocery/hardware/building materials etc.) with support for:
- Product variants (color, size)
- SKU/Barcode
- Stock/Inventory
- Pricing (retail/wholesale)
- Customers, Suppliers
- Purchases/GRN
- Sales (Invoice/Receipt)
- Returns/Exchanges
- Discounts/Promotions
- Multi-branch/Store support
- Users/Roles/PIN
- KDS not needed (retail) - focus on Sales/Purchase/Stock

Deployment models:
- **Standalone (dedicated)**: Single business/store, licensed via license key
- **Multi-tenancy (SaaS)**: Hosted multi-tenant, subscription-based

## Targets
Web app, Mobile app, Desktop (Electron), tablets/POS terminals

## Known context
- Repo: /workspace/app (empty/scaffold exists)
- Tech direction: Django REST Framework + React (Vite) + React Native (Expo) + Electron
- Docker support planned

## Decisions to confirm (one by one)

### 1) Product Variants
**Q:** Variants by attributes (color/size) with individual SKU per variant, or matrix?  
**Recommended:** Attribute-based (Product + ProductVariant with attribute values, SKU, price, stock). Support multiple attributes.

### 2) Barcode/Scanning
**Q:** Need barcode scanner support (USB/Bluetooth) for POS?  
**Recommended:** Support keyboard wedge + camera scanner; generate barcodes if needed.

### 3) Inventory Tracking
**Q:** Track stock by branch/store? Real-time stock deduction on sale? Allow negative stock?  
**Recommended:** Branch-wise stock (Warehouse/Store), deduct on completed sale, prevent negative or allow with permission.

### 4) Pricing
**Q:** Single price or multiple price lists (retail/wholesale)?  
**Recommended:** Base price + optional price lists per customer group.

### 5) Sales Flow
**Q:** Walk-in, customer selection, hold/suspend sale, layaway?  
**Recommended:** Walk-in default, customer optional, hold/resume, quick sale.

### 6) Payments
**Q:** Cash, Card, Mobile Money, Split payment, Credit (on account)?  
**Recommended:** Multiple payment methods, split, customer credit/debt.

### 7) Purchases/GRN
**Q:** Supplier, PO, Goods Received Note, purchase price, update stock/cost?  
**Recommended:** PO → GRN → update stock and average cost.

### 8) Returns
**Q:** Sales return/refund, exchange, return to stock or damaged?  
**Recommended:** Return by invoice, restock to branch or mark damaged.

### 9) Multi-branch
**Q:** Single branch or multi-branch from start? Transfer stock between branches?  
**Recommended:** Support branch/store model (user assigned to branch, can switch if permitted).

### 10) Tax/Discount
**Q:** Tax per item or invoice? Discount %/amount, by item/invoice?  
**Recommended:** Configurable tax, line/item and invoice discounts.

### 11) Categories/Brands/Suppliers
**Q:** Need brands, suppliers, units (pcs/kg/meter)?  
**Recommended:** Yes - Category, Brand, Supplier, Unit of Measure.

### 12) Users/Roles
**Q:** Roles (Admin, Manager, Cashier/Sales, Stock Keeper)? PIN login for POS?  
**Recommended:** RBAC + PIN for speed.

## Next step
Start with Q1 (Product Variants model) - confirm approach.
