import { StartupData } from '@/utils/startup-generator';

// In-memory store for generated startups (for demo purposes)
const startupStore = new Map<string, StartupData>();

/**
 * Save startup data in memory
 */
export function saveStartup(data: StartupData) {
  startupStore.set(data.id, data);
}

/**
 * Retrieve startup data by ID
 */
export function getStartup(id: string): StartupData | undefined {
  return startupStore.get(id);
}
