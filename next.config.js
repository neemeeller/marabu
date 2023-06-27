/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    // basePath: "/m",
    swcMinify: true,
    images: {
        unoptimized: true,
    },
    trailingSlash: true
};

module.exports = nextConfig;
