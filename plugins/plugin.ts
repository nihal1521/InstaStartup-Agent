/**
 * Plugin interface for InstaStartup marketplace
 */
export interface Plugin {
  /** Unique plugin identifier */
  id: string;
  /** Human-readable plugin name */
  name: string;
  /** Short description of plugin functionality */
  description: string;
  /**
   * Execute plugin logic with given parameters
   * @param params Arbitrary input parameters (e.g., idea, config)
   */
  run: (params: Record<string, any>) => Promise<any>;
}
