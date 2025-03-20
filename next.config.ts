/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // Ignore les erreurs de type pendant le build
        ignoreBuildErrors: true,
    },
    // Configuration des domaines d'images autorisés
    images: {
        domains: ['images.unsplash.com'],
    },
};

module.exports = nextConfig;