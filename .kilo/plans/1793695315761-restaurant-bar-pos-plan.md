# Restaurant Bar POS (Kitchen & BBQ) Plan

## Goal
Build a POS system for restaurant/bar with kitchen and BBQ operations.

## Known context
- Repo: /workspace/app (empty except README.md)
- Use case: restaurant bar, Kitchen & BBQ

## Questions to resolve
1. **Deployment target** - Web app (browser/POS terminal) vs desktop (Electron) vs tablet-first?
2. **Tech stack** - What framework/language? (e.g., Next.js/React+Node, Vue+Express, Laravel, etc.)
3. **Core features needed** - Order taking, table management, menu/categories, kitchen display (KDS), BBQ/grill stations, payments (cash/card), modifiers, splits, discounts, taxes?
4. **Data** - Users/roles (cashier, waiter, kitchen, admin), products, categories, orders, payments?
5. **Kitchen workflow** - Separate kitchen display for BBQ vs regular kitchen? Course firing/timers?
6. **Printing** - Receipt printer, kitchen/order tickets, cashier drawer?
7. **Integrations** - Any (inventory, accounting)? Or keep simple?
8. **Multi-language/UI** - Required?
9. **Auth/offline** - Need offline support or always online?

## Recommended approach
Start with web-based POS (tablet-friendly) - easier to deploy. Suggest modern stack (e.g., Next.js + TypeScript + Prisma + SQLite/Postgres). Core MVP: menu, tables/floors, cart/order, send to kitchen, KDS, payments, basic roles.

But need answers before finalizing.
