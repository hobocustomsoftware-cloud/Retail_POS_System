import * as crypto from 'crypto';
import * as os from 'os';
import { getConfig } from '@pos/config';

export function getMachineId(): string {
  const data = [os.hostname(), os.platform(), os.arch()].join('|');
  return crypto.createHash('sha256').update(data).digest('hex');
}

export async function validateLicense(licenseKey?: string): Promise<{ valid: boolean; reason?: string }> {
  const config = getConfig();
  const key = licenseKey || config.licenseKey;
  
  if (config.deploymentMode === 'MULTI_TENANT') {
    return { valid: true };
  }
  
  if (!key) {
    return { valid: false, reason: 'License key required for standalone mode' };
  }
  
  // Basic validation - in production, would verify with license server
  // Supports offline validation pattern
  if (key.startsWith('POS-') && key.length >= 12) {
    return { valid: true };
  }
  
  return { valid: false, reason: 'Invalid license key' };
}

export function generateLicenseRequest(): string {
  const machineId = getMachineId();
  return Buffer.from(JSON.stringify({ machineId, ts: Date.now() })).toString('base64');
}
