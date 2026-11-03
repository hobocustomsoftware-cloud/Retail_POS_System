# Restaurant Bar POS (Kitchen & BBQ) Plan

## Goal
Build a POS system for restaurant/bar with Kitchen & BBQ operations. Targets: Web app, Mobile app, Desktop (Electron), tablets/POS terminals.

## Known context
- Repo: /workspace/app (empty except README.md)
- Use case: restaurant bar, Kitchen & BBQ
- Platforms: Web, Mobile, Desktop (Electron), tablets/POS terminals

## Questions to resolve (one by one)

### 1) Architecture / Monorepo
**Q:** Monorepo (shared types/API/UI) vs separate apps?  
**Recommended:** Monorepo (e.g., Turborepo) with shared packages (types, utils, API contracts). Easier to share logic across web/mobile/desktop/Electron.

### 2) Tech stack
**Q:** Preferred stack?  
**Recommended:** TypeScript end-to-end. Options:
- **Fullstack TS**: Next.js (web) + Expo/React Native (mobile) + Tauri/Electron (desktop) sharing packages, backend via Next.js API routes or separate Node.js (Fastify/Express/Nest). 
- Or **Flutter** for all (web/mobile/desktop) + backend.

Need user preference.

### 3) Backend / DB
**Q:** Self-hosted/local first or cloud? Need multi-device sync?  
**Recommended:** Start with Node.js + Prisma + PostgreSQL (or SQLite for single-terminal/offline-first). For multi-terminal (kitchen/cashier/bar) need real-time sync (WebSocket).

### 4) Roles & auth
**Q:** Roles needed? (cashier, waiter/server, bartender, kitchen/chef, BBQ/grill, admin/manager)? PIN login or accounts?  
**Recommended:** Role-based access control, PIN login for speed on POS terminals.

### 5) Ordering flow
**Q:** Table service (dine-in with table/floor), takeout, delivery? Bar tab?  
**Recommended:** Support dine-in (tables/floors/sections), takeout, bar tabs.

### 6) Kitchen/BBQ workflow
**Q:** Single KDS or separate displays (Kitchen + BBQ/Grill)? Need routing by station/category? Course firing, fire times, hold/fire all, bump orders?  
**Recommended:** Station-based routing (items go to kitchen/BBQ/bar based on category/station), separate KDS per station with timers/colors.

### 7) Menu/modifiers
**Q:** Modifiers, add-ons, variants, combos, cooking instructions (rare/medium/well), BBQ weight/options?  
**Recommended:** Modifiers with required/optional, price adjustments, notes per item.

### 8) Payments
**Q:** Methods (cash, card, split bill, split items, discount %, discount amount, tax/VAT, service charge)?  
**Recommended:** Flexible payment with splits/combinations.

### 9) Printing
**Q:** Thermal receipt printer (ESC/POS), kitchen ticket printers per station, cash drawer, barcode?  
**Recommended:** ESC/POS support, printer routing by station.

### 10) Offline / real-time
**Q:** Must work offline if network drops or always online?  
**Recommended:** For multi-terminal real-time sync preferred; consider offline queue for orders/payments.

### 11) UI/UX priorities
**Q:** Touch-first for tablets/POS, or also mouse/keyboard? Speed critical?  
**Recommended:** Touch-optimized, large buttons, minimal taps.

## Next step
Start with Q1 (monorepo architecture) - get answer before deciding stack details.
