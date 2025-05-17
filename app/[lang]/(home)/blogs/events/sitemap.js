
import { FetchEventsFunction } from "@/app/[lang]/functions";

export const revalidate = 24 * 60 * 60;

export default async function sitemap() {
  const BASE_URL = process.env.NEXT_PUBLIC_PANOTECH_BASE_URL;
  const events = await FetchEventsFunction();

  const faSitemap = events.map(
    (event) =>
      event.status === "enable" &&
      {
        url: `${BASE_URL}/fa/blogs/events/${event.slug.fa}`,
        lastModified: event.updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
      }
  );

  const enSitemap = events.map(
    (event) =>
      event.status === "enable" &&
      {
        url: `${BASE_URL}/en/blogs/events/${event.slug.en}`,
        lastModified: event.updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
      }
  );

  const arSitemap = events.map(
    (event) =>
      event.status === "enable" && 
      {
        url: `${BASE_URL}/ar/blogs/events/${event.slug.ar}`,
        lastModified: event.updatedAt,
        changeFrequency: "daily",
        priority: 0.8,
      }
  );

  if (events) {
    return [...faSitemap, ...enSitemap, ...arSitemap];
  } else {
    return [];
  }
}
