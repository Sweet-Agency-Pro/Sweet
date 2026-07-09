/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // ESLint est réactivé après la migration ; on ne bloque pas le build dessus pendant la bascule.
  eslint: { ignoreDuringBuilds: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Images du portfolio stockées dans Supabase Storage
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
};

export default nextConfig;
