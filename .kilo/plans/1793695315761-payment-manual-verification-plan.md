# Payment Integration - Manual Verification (KPay/AYA Pay/CB Pay)

## Goal
Add manual payment verification for digital wallets (KPay, AYA Pay, CB Pay) where customer pays and uploads screenshot/proof, cashier/admin verifies manually.

Supports both Standalone and Multi-tenant deployments.

## Current State
- Basic payment model exists (CASH/CARD/MOBILE/SPLIT/CREDIT)
- POS has payment modal with methods
- Need to extend for wallet payments with proof upload & verification

## Requirements
- Support KPay, AYA Pay, CB Pay as payment methods
- Customer uploads payment screenshot/proof
- Cashier/Manager verifies and approves/rejects
- Track payment status (PENDING_VERIFICATION, VERIFIED, REJECTED)
- Store proof image/reference
- Works for both deployment modes

## Plan

### 1) Backend Models
- Update `Payment` model:
  - Add method: `KPAY`, `AYAPAY`, `CBPAY`
  - Add fields: `proof_image`, `reference_no`, `verified_by`, `verified_at`, `verification_status`, `notes`
- Add `PaymentVerification` log if needed

### 2) Backend API
- `POST /api/sales/payments/upload-proof/` - upload screenshot + reference
- `POST /api/sales/payments/verify/` - verify/reject by cashier/manager
- Update `create_sale` to handle PENDING_VERIFICATION status
- Add permissions (only CASHIER/MANAGER/ADMIN can verify)

### 3) Web POS
- Add wallet payment options (KPay/AYA Pay/CB Pay) in payment modal
- Show QR code / payment info per method (configurable)
- Upload screenshot after payment
- Show "Pending Verification" status
- Verification screen for cashier (pending payments list)

### 4) Mobile App
- Similar flow for mobile POS

### 5) Settings/Config
- Add payment methods config (enable/disable, account info/QR)
- Per tenant/shop config

## Implementation Steps
1. Update Payment model + migration
2. Add upload/verify endpoints
3. Update POS UI for wallet payments + proof upload
4. Add verification panel
5. Test AYA Pay flow

## Notes
- AYA Pay mentioned as testable
- Manual verification only (no auto API integration initially)
- Screenshot upload needed
- Keep simple and practical
