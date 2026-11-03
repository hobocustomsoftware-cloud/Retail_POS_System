# Restaurant Bar POS (Kitchen & BBQ) Plan

## Goal
Build a POS system for restaurant/bar with Kitchen & BBQ operations. Targets: Web app, Mobile app, Desktop (Electron), tablets/POS terminals.

Deployment models:
- **Standalone (dedicated)**: Single business deployment, licensed via license key. One-time purchase/license to "produce" for that business.
- **Multi-tenancy (SaaS)**: Hosted multi-tenant, subscription-based.

## Known context
- Repo: /workspace/app (empty except README.md)
- Use case: restaurant bar, Kitchen & BBQ
- Platforms: Web, Mobile, Desktop (Electron), tablets/POS terminals

## Questions to resolve (one by one)

### 1) Architecture / Monorepo
**Q:** Monorepo (shared types/API/UI) vs separate apps?  
**Recommended:** Monorepo (e.g., Turborepo) with shared packages (types, utils, API contracts). Easier to share logic across web/mobile/desktop/Electron.

### 2) Delivery/distribution for Standalone (dedicated)
**Q:** For standalone "produce once" - how to distribute? Options:
- **Docker image** (self-hostable): Customer runs `docker compose up`. License checked at startup/runtime. Easy to update via new image.
- **Installer** (Electron/desktop app with bundled server): One installer (Windows/Mac/Linux), includes local server + DB. Simpler for non-technical.
- **Source/code delivery** restricted (not recommended).
- **Binary/package + license activation**.

**Recommended:** Support both paths? Or pick one to start. Docker is cleaner for multi-device on LAN (server on PC/router + tablets). Installer better for single-PC "all-in-one".

Which is preferred as primary for standalone?

### 3) License key model (standalone)
**Q:** License enforcement - online activation required? Or offline activation (generate key tied to hardware/machine ID)?  
**Recommended:** Hybrid - online first, allow offline grace/activation via generated request code. Need to prevent easy copying; consider machine binding (CPU/OS/hw id) with grace period. Also need "license check" service or embedded validation.

How strict should enforcement be (online mandatory vs offline-allowed)?

### 4) Multi-tenancy model
**Q:** Shared DB with tenant_id on all tables vs schema-per-tenant vs DB-per-tenant?  
**Recommended:** Shared DB + `tenant_id` (row-level) is simpler for SaaS; need strong isolation + indexes. Schema-per-tenant cleaner isolation but harder to migrate. DB-per-tenant most isolated but operationally heavy.

Which approach?

### 5) Tech stack
**Q:** Preferred stack?  
**Recommended:** TypeScript end-to-end. Options:
- **Fullstack TS**: Next.js (web) + Expo/React Native (mobile) + Electron (desktop) sharing packages, backend via Next.js API routes or separate Node.js (Fastify/Nest) with WebSocket. Can serve web + API from same app.
- Or **Tauri** (Rust) for desktop+smaller bundle.
- Or **Flutter** for cross-platform.

Need preference.

### 6) Backend / DB
**Q:** Standalone needs embedded/local DB? Multi-tenant needs central DB?  
**Recommended:** 
- Standalone (dedicated): SQLite (file-based) embedded in app/Docker volume, or PostgreSQL in docker-compose. SQLite simpler for all-in-one; Postgres better if multiple devices hit same server.
- Multi-tenant: PostgreSQL (central).

Also need real-time sync (WebSocket/Socket.io) for multi-terminal.

### 7) Roles & auth
**Q:** Roles needed? PIN login for POS terminals?  
**Recommended:** RBAC, PIN quick login, sessions/tokens. For multi-tenant need tenant-scoped auth.

### 8) Ordering flow
**Q:** Dine-in (tables/floors/sections), takeout, delivery? Bar tabs?  
**Recommended:** All common for restaurant/bar.

### 9) Kitchen/BBQ workflow
**Q:** Single KDS or separate (Kitchen + BBQ/Grill + Bar)? Station routing by category? Course firing, timers, bump?  
**Recommended:** Station-based routing, separate KDS per station.

### 10) Menu/modifiers
**Q:** Modifiers, add-ons, variants, combos, cooking temp (rare/med/well), BBQ options/weight?  
**Recommended:** Flexible modifier system.

### 11) Payments
**Q:** Cash, card, split bill/items, discounts, tax/VAT, service charge?  
**Recommended:** Full payment flexibility.

### 12) Printing
**Q:** ESC/POS thermal printers per station, receipt printer, cash drawer?  
**Recommended:** Printer routing by station/category.

### 13) Offline / real-time
**Q:** Multi-terminal needs real-time; standalone should work on LAN. Offline resilience?  
**Recommended:** WebSocket for live updates; consider offline queue if needed.

## Next step
Q2 most urgent given standalone+license requirement - Docker vs installer as primary distribution? And do you want to support both from start?
