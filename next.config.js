/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

module.exports = withLess({
  lessLoaderOptions: {
    /* ... */
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["media.kitsu.io"],
    deviceSizes: [546, 768, 1200],
  },
});
