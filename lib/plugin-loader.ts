import examplePlugin from '../plugins/example-plugin';
import { Plugin } from '../plugins/plugin';

// Register plugins here
const plugins: Plugin[] = [
  examplePlugin
];

/**
 * Retrieve all available plugins
 */
export function getPlugins(): Plugin[] {
  return plugins;
}

/**
 * Execute a plugin by its ID with given parameters
 * @param id Plugin identifier
 * @param params Input parameters for the plugin
 */
export async function runPlugin(id: string, params: Record<string, any>) {
  const plugin = plugins.find((p) => p.id === id);
  if (!plugin) {
    throw new Error(`Plugin not found: ${id}`);
  }
  return plugin.run(params);
}
