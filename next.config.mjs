/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/simulador-credito', destination: '/simuladores#simulador-credito', permanent: false },
      { source: '/simulador-cdt', destination: '/simuladores#simulador-cdt', permanent: false },
      { source: '/contacto', destination: '/#contacto', permanent: false },
    ];
  },
};

export default nextConfig;
