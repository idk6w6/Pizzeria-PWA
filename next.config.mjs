/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'yxkmbcfmwdoehvnbqgrh.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/imagenes/**'
      }
    ]
  }
};
export default nextConfig;
