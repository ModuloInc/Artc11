/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // Ignore les erreurs de type pendant le build
        ignoreBuildErrors: true,
    },
};

module.exports = nextConfig;