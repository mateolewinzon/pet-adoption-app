/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  images: { domains: ["res.cloudinary.com", "lh3.googleusercontent.com", "platform-lookaside.fbsbx.com"] },
};

module.exports = nextConfig;
