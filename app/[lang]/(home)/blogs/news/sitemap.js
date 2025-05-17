import { FetchNewsFunction } from "@/app/[lang]/functions";

export const revalidate = 24 * 60 * 60;

export default async function sitemap() {
  const BASE_URL = process.env.NEXT_PUBLIC_PANOTECH_BASE_URL;
  const news = await FetchNewsFunction();

  const faSitemap = news.map(
    (singleNews) =>
      singleNews.status === "enable" &&
      {
        url: `${BASE_URL}/fa/blogs/news/${singleNews.slug.fa}`,
        lastModified: singleNews.updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
      }
  );

  const enSitemap = news.map(
    (singleNews) =>
      singleNews.status === "enable" &&
      {
        url: `${BASE_URL}/en/blogs/news/${singleNews.slug.en}`,
        lastModified: singleNews.updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
      }
  );

  const arSitemap = news.map(
    (singleNews) =>
      singleNews.status === "enable" &&
      {
        url: `${BASE_URL}/ar/blogs/news/${singleNews.slug.ar}`,
        lastModified: singleNews.updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
      }
  );

  if (news) {
    return [...faSitemap, ...enSitemap, ...arSitemap];
  } else {
    return [];
  }
}
