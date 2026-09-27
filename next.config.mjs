const isDev = process.env.NODE_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'console.cloudinary.com',
        port: '',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },

  async headers() {
    if (isDev) return []; // No headers in development

    return [
      {
        source: "/(.*)", // Applies to all routes
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; style-src 'self' 'unsafe-inline' https://gc.kis.v2.scr.kaspersky-labs.com; connect-src 'self' https://durekt-backend-engine.onrender.com;",
          },
          // {
          //   key: "Content-Security-Policy",
          //   value: "default-src 'self'; script-src 'self' 'unsafe-inline'; connect-src 'self' https://durekt-backend-engine.onrender.com;",
          // },
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
        ],
      },
    ];
  },

};

export default nextConfig;
