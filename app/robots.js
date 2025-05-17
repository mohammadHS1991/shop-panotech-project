export default function robots() {
  const BASE_URL = process.env.NEXT_PUBLIC_PANOTECH_BASE_URL;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["fa/profile/*", "en/profile/*", "ar/profile/*", "fa/admin/*", "en/admin/*", "ar/admin/*"],
    },
    sitemap: [
      `${BASE_URL}/fa/sitemap.xml`,

      `${BASE_URL}/fa/blogs/events/sitemap.xml`,

      `${BASE_URL}/fa/blogs/news/sitemap.xml`,

      // `${BASE_URL}/fa/products/sitemap.xml`,
    ],
  };
}
