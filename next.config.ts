import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "readymadeui.com",
      },
    ],
  },

  // experimental: {
  //   // @ts-expect-error: allowedDevOrigins aún no está en los tipos
  //   allowedDevOrigins: [
  //     "http://192.168.100.167:3000", // acceso desde otros dispositivos en red
  //     "http://localhost:3000", // acceso desde el mismo equipo
  //   ],
  // },
};

export default nextConfig;
