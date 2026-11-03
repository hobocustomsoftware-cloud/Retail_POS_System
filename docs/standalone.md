## Standalone Deployment (Dedicated)

For single-business deployment with license key.

### Docker (Recommended for multi-device LAN)
```bash
docker compose -f docker/docker-compose.standalone.yml up --build
```

### License Key
Standalone mode requires `LICENSE_KEY`. Get key from vendor, activate on first run.

### Database
Uses PostgreSQL in Docker or can use SQLite for all-in-one setup.
