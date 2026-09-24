import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    // AVIF первым: на обложках кейсов даёт ~30% к WebP при том же качестве.
    formats: ["image/avif", "image/webp"],

    // Раскомментируй, если решишь тянуть превью прямо с боевых доменов
    // вместо локальных скриншотов в /public/cases.
    // remotePatterns: [
    //   { protocol: "https", hostname: "www.v-clubvillas.kz" },
    //   { protocol: "https", hostname: "montera-phi.vercel.app" },
    //   { protocol: "https", hostname: "las-casas.vercel.app" },
    //   { protocol: "https", hostname: "sympohia.vercel.app" },
    //   { protocol: "https", hostname: "snp-arch.vercel.app" },
    // ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
