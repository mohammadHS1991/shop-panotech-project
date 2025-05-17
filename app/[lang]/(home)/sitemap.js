export const revalidate = 24 * 60 * 60;

export default function sitemap() {
  const BASE_URL = process.env.NEXT_PUBLIC_PANOTECH_BASE_URL;

  return [
    {
      url: `${BASE_URL}/fa`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${BASE_URL}/fa/about`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/fa/contact-us`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/fa/technology`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/fa/gallery`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/fa/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/fa/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/fa/blogs/events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/fa/blogs/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/fa/faq`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${BASE_URL}/en/about`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/en/contact-us`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/en/technology`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/en/gallery`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/en/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/en/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/en/blogs/events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/en/blogs/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/en/faq`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/ar`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },

    {
      url: `${BASE_URL}/ar/about`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/ar/contact-us`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/ar/technology`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/ar/gallery`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/ar/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/ar/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/ar/blogs/events`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/ar/blogs/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },

    {
      url: `${BASE_URL}/ar/faq`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
