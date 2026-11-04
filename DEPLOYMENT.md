# Deployment Guide - Retail POS

**Copyright © 2026-present HoBo Custom Software. All Rights Reserved.**

## 1. Web App Deployment
```bash
cd apps/web
npm install
npm run build
# Serve dist/ with nginx/apache
```

## 2. Desktop EXE (Windows)
```bash
cd apps/desktop
npm install
npm run dist
# Output: dist/Retail POS - HoBo Custom Software Setup.exe
```

## 3. Mobile APK (Android)
```bash
cd apps/mobile
npm install
eas build --platform android --profile production
# or expo build:android
```

## 4. Standalone (Dedicated) - Docker
```bash
docker compose -f docker/docker-compose.standalone.yml up -d
```

## 5. Multi-Tenancy (SaaS) - Docker
```bash
docker compose -f docker/docker-compose.multi-tenant.yml up -d
```

## Requirements
- Node.js 18+
- Python/Django runtime in Docker
- PostgreSQL, Redis

## Legal
See TERMS_CONDITIONS.md, PRIVACY_POLICY.md, TEAM_CONDUCTION.md
