export type DeploymentMode = 'STANDALONE' | 'MULTI_TENANT';

export interface AppConfig {
  deploymentMode: DeploymentMode;
  licenseKey?: string;
  databaseUrl?: string;
  tenantId?: string;
}

export function getConfig(): AppConfig {
  return {
    deploymentMode: (process.env.DEPLOYMENT_MODE as DeploymentMode) || 'STANDALONE',
    licenseKey: process.env.LICENSE_KEY,
    databaseUrl: process.env.DATABASE_URL,
    tenantId: process.env.TENANT_ID
  };
}
