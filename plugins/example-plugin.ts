import { Plugin } from './plugin';

/**
 * Example plugin for the InstaStartup marketplace
 */
const examplePlugin: Plugin = {
  id: 'example',
  name: 'Example Plugin',
  description: 'An example plugin for demo purposes',
  run: async (params) => {
    // Demo logic: echo back the params
    return { message: 'Example plugin executed', params };
  }
};

export default examplePlugin;
