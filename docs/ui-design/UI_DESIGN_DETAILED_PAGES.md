# Retail POS - Page by Page Detailed UI Design
**HoBo Custom Software | © 2026-present**

## Design System
- Primary: `#aa0000` | Secondary/Sidebar: `#151515` | Background: `#f9fafb` | Surface: `#ffffff`
- Text: `#151515` / `#6b7280` | Font: `Myanmar Thuriya`
- Border: `#e5e7eb` | Success: `#059669` | Warning: `#f59e0b` | Danger: `#dc2626`

## 1. SYSTEM UI (Platform Admin)

### 1.1 Admin Login
- Layout: Centered card
- Fields: Email/Username, Password
- Button: "Login" (primary red)
- Logo: HoBo Custom Software

### 1.2 Platform Admin Dashboard (/admin/dashboard)
**Layout**: Sidebar (#151515) + Header + Content
**Cards**: Total Shops, Active Subscriptions, Trial Shops, Pending Payments, Expired, Revenue
**Tables**: Recent Shops, Recent Payments
**Actions**: Quick links

### 1.3 Shops Management (/admin/shops)
**List**: DataTable with columns (Shop Name, Owner Gmail, Status, Trial Ends, Subscription, Actions)
**Filters**: Status (All/Trial/Active/Expired/View Only), Search
**Actions**: View Detail, Login as Shop, Suspend/Activate
**Detail Modal**: Shop Info, Owner, Trial dates, Subscription history, Invoices

### 1.4 Manual Payment Verification (/admin/billing/verification) - Screenshot Only
**Table**: Invoice No, Shop, Method (KPay/AYA Pay/CB Pay), Amount, Submitted Date, Status
**View Screenshot Modal**: Full image preview, zoom
**Actions**: Approve (green), Reject (red) with reason note
**Note**: NO Transaction ID field - screenshot only (Lazynerds style)

### 1.5 Domain Requests (/admin/domains)
**Table**: Shop, Requested Domain, Type (Custom/Subdomain), Status, Requested Date
**Actions**: Approve (with DNS notes), Reject (with reason)

### 1.6 Subscription Plans (/admin/plans)
**CRUD**: Name, Duration (days), Price (MMK), Features, Active toggle

### 1.7 Add-ons (/admin/addons)
**List**: Custom Domain, Subdomain, Extra Branches, Advanced Reports, Pricing

## 2. SHOP UI (Tenant)

### 2.1 Shop Registration (/register-shop) - Gmail Only
**Steps**:
1. Gmail Login/Signup (no password reset)
2. Shop Details Form (ALL required): Shop Name, Full Address, Phone, Shop Email
3. Submit → Creates shop with 1 month + 7 days trial (calendar-based)
**Note**: "Trial: 1 month + 7 days (37 days approx). After expiry: View Only until subscription approved."

### 2.2 Login/PIN Login
**Options**: Username/Password or PIN (for POS terminal)

### 2.3 POS Terminal (/pos) - CASH ONLY
**Layout**: Left sidebar (minimal) + Product Grid + Right Cart Panel
**Product Grid**: Categories tabs, Search by name/SKU, Barcode scan input
**Cart**: Items, Qty +/-/Remove, Subtotal/Total
**Payment**: "Pay Cash" button only (Wallets as Add-on - disabled/grayed)
**Actions**: Hold, Resume, Clear Cart
**Receipt**: Print preview

### 2.4 Products (/products)
**Tabs**: Products List | Attributes | Variants
**List**: DataTable with SKU, Name, Category, Price, Stock, Variants count, Actions
**Add/Edit Modal**: Name, Category, Brand, Unit, Has Variants toggle, Track Serial, Warranty
**Variant Matrix**: Select attributes (Color/Size/Gender) → Generate variants with SKU/Barcode auto-generate

### 2.5 Inventory (/inventory)
**Table**: Product/Variant, SKU, Branch, Quantity, Min Qty, Status (OK/LOW)
**Filters**: Branch, Low Stock
**Actions**: Stock Adjustment (with permission)

### 2.6 Purchases/GRN (/purchases)
**Tabs**: Purchase Orders | GRN
**PO Create**: Supplier, Items, Qty, Cost Price
**GRN Receive**: Receive button updates stock

### 2.7 Sales History (/sales)
**Table**: Invoice No, Date, Customer, Total, Status, Payment Status
**Actions**: View, Print Receipt, Return/Exchange
**Returns**: Select items, Restock/Damaged

### 2.8 Master Data
**Pages**: Customers, Suppliers, Categories, Brands, Units, Branches, Users/Roles
**All CRUD with Search/Filter/Pagination**

### 2.9 Shop Billing (/billing)
**Plans**: Monthly/Yearly plans
**Create Invoice** → Pay page
**Pay Page (Screenshot Only)**:
- Invoice No, Amount (MMK)
- Select Method: KPay / AYA Pay / CB Pay
- Payment info (Account/QR)
- Upload Payment Screenshot (required, image only)
- Optional: Sender Phone
- Note: "Write Invoice No. in Transfer Note/Remark"
- Submit for Verification
**History**: Status badges (PENDING/PAID/REJECTED), Rejected shows admin note

### 2.10 Shop Settings (/settings)
**Tabs**: Shop Info, Logo Upload, Users/Roles, Printer, License (if standalone), Domain Request (Add-on)

## Responsive
- Desktop (>=1024): Full layout
- Tablet (768-1023): Collapsible sidebar, adapted grids
- Mobile (<768): Bottom nav or hamburger, stacked layouts, touch-optimized

## States
- Trial active: Full access
- Trial expired (>7+days): View Only banner, block transactions
- No subscription: View Only
- Subscription approved: Full access
