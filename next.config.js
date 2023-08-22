/** @type {import('next').NextConfig} */
const nextConfig = {
  elastic: "@elastic/eui/lib/components/icon/icon.js",
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
        },
      };
    }
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    return config;
  },
};

module.exports = nextConfig;
