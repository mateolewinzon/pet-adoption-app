/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en", "es"],
  },
  images: { domains: ["res.cloudinary.com", "lh3.googleusercontent.com"] },
};

module.exports = nextConfig;
