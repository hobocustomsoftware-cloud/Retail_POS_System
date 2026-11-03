# Retail POS - Responsive UI Design Spec
**Developed by HoBo Custom Software | Copyright © 2026-present**

## Design System
- Primary Color: #aa0000
- Secondary/Sidebar: #151515
- Background: #f9fafb
- Surface: #ffffff
- Text Primary: #151515
- Text Secondary: #6b7280
- Font: Myanmar Thuriya

## 1) Shop UI (Tenant)
### 1.1 Desktop POS Terminal (1440x900)
- Sidebar (#151515): POS Terminal, Products, Sales History, Purchases/GRN, Inventory, Warranty, Customers, Suppliers, Settings
- Header: Shop Logo, Shop Name, User, Trial Status
- Main: Product Grid with search/category
- Right Panel: Cart, Items, Total, "Pay Cash" (#aa0000)
- POS Mode: CASH ONLY (Wallets as Add-on)

### 1.2 Products & Inventory
- Table with SKU, Name, Price, Stock, Status
- Actions: Add Product, Variants, Attributes
- Filters + Search + Pagination

### 1.3 Tablet POS (1024px)
- Touch-optimized grid, larger buttons
- Cart panel adapted for tablet

### 1.4 Mobile POS (375-430px)
- Stacked layout, sticky bottom cart summary, "Pay Cash" button

## 2) System UI (Platform Admin)
### 2.1 Dashboard
Cards: Total Shops, Active, Trial, Pending Payments, Expired

### 2.2 Manual Payment Verification (Screenshot Only)
- Table: Invoice No, Shop, Method (KPay/AYA Pay/CB Pay), Amount, Submitted
- View Screenshot modal
- Approve/Reject with note
- NO Transaction ID field (screenshot only - Lazynerds style)

### 2.3 Shops Management
- Shop list, status (TRIAL/ACTIVE/EXPIRED), trial end, subscription

### 2.4 Domain Requests (Add-on)
- Custom domain/subdomain requests, approve/reject

## 3) Billing & Shop Registration
### 3.1 Shop Registration (Owner - Gmail only)
- Gmail login/signup only, no password reset required
- Shop Name, Full Address, Phone, Shop Email (all required)
- 7 Days Free Trial on creation
- After trial: View Only until subscription approved

### 3.2 Billing Upload (Screenshot Only)
- Select method (KPay/AYA Pay/CB Pay)
- Upload Payment Screenshot (required)
- Optional sender phone
- Note: Write Invoice No. in Transfer Note/Remark
- Submit for verification

### 3.3 Subscription Plans
Manual verification workflow

## Responsive Breakpoints
- Desktop: >=1024px
- Tablet: 768-1023px
- Mobile: <768px
