/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile external packages with ES Modules (e.g., framer-motion) to avoid missing .mjs imports
  transpilePackages: ['framer-motion'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config) => {
    const path = require('path');
    // Aliases for stubbed modules
    config.resolve.alias = {
      ...config.resolve.alias,
      'graphql-yoga': path.resolve(__dirname, 'lib/empty-graphql.ts'),
      'graphql-type-json': path.resolve(__dirname, 'lib/empty-json.ts'),
      // Alias framer-motion to its CommonJS entry point
      'framer-motion': require.resolve('framer-motion'),
      '@emotion/is-prop-valid': path.resolve(__dirname, 'lib/empty-emotion.ts'),
      // Resolve Firestore internal imports
      '@firebase/firestore': require.resolve('firebase/firestore')
    };
    // Ensure .mjs extensions are resolved (e.g., for framer-motion)
    if (!config.resolve.extensions.includes('.mjs')) {
      config.resolve.extensions.push('.mjs');
    }
    // Allow webpack to properly parse .mjs files in node_modules
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });
    return config;
  },
};

module.exports = nextConfig;
