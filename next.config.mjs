/** @type {import('next').NextConfig} */
export default { images: { remotePatterns: [
 { protocol: 'https', hostname: 'images.unsplash.com' },
 { protocol: 'https', hostname: 'images.pexels.com' },
 { protocol: 'https', hostname: '*.supabase.co' } ] } };
