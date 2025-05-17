/** @type {import('next').NextConfig} */

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' maps.googleapis.com https://www.google.com/ https://www.gstatic.com/recaptcha/ www.googletagmanager.com/gtag/js;
    script-src-elem 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com/ https://www.gstatic.com/recaptcha/ www.googletagmanager.com/gtag/js;
    connect-src 'self' www.google-analytics.com/ https://www.gstatic.com/recaptcha/;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/;
    img-src 'self' blob: data: maps.gstatic.com *.googleapis.com *.ggpht.com https://www.googletagmanager.com/;
    font-src 'self' data: https://fonts.googleapis.com/ https://fonts.gstatic.com/;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src https://www.google.com/ https://recaptcha.google.com/recaptcha/;
    upgrade-insecure-requests;
`;

const nextConfig = {
  images: {
    domains: ["https://www.google.com/maps"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
