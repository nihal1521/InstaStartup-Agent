// Built-In A/B Testing

/**
 * Configuration for an A/B test experiment
 */
export interface ABTestConfig {
  experimentId: string;
  variations: string[];
  trafficSplit: number[]; // sum to 100
}

/**
 * Start an A/B test and assign a variation to a user
 */
export function startABTest(config: ABTestConfig, userId: string): string {
  // TODO: Implement split logic and record assignment
  const variation = config.variations[Math.floor(Math.random() * config.variations.length)];
  console.log(`User ${userId} assigned to variation ${variation}`);
  return variation;
}
