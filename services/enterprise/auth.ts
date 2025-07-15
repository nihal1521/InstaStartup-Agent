// SSO & Role-Based Access Control (RBAC)

/**
 * Represents a user role within the system
 */
export type UserRole = 'admin' | 'agency' | 'client' | 'guest';

/**
 * Configuration for SSO integration (e.g., SAML, OAuth)
 */
export interface SSOConfig {
  provider: 'saml' | 'oauth2';
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
}

/**
 * Initialize SSO authentication
 */
export function initSSO(config: SSOConfig) {
  // TODO: Integrate with Passport.js or similar
  console.log('SSO initialized for provider', config.provider);
}
