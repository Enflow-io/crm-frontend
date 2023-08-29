/** @type {import('next').NextConfig} */

// next.config.js

module.exports = {
  lessLoaderOptions: {
    /* ... */
    javascriptEnabled: true
  },
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/s3/:path*',
        destination: 'https://crm2605.storage.yandexcloud.net/:path*' // Proxy to Backend
      }
    ]
  }


};