import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

const SITE_NAME = "Kiut Music Worldwide";
const SITE_URL = "https://kiutmusic.com";
const DEFAULT_OG_IMAGE = "/og-image.png";

function setMeta(selector: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (el) {
    el.setAttribute("content", value);
  }
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSeo({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  canonical,
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`.replace(
      ` | ${SITE_NAME} | ${SITE_NAME}`,
      ` | ${SITE_NAME}`
    );

    document.title = fullTitle;

    setMeta('meta[name="description"]', description);

    const resolvedOgTitle = ogTitle ?? title;
    const resolvedOgDesc = ogDescription ?? description;
    const resolvedCanonical = canonical ?? `${SITE_URL}${window.location.pathname}`;
    const absoluteOgImage = ogImage.startsWith("http")
      ? ogImage
      : `${SITE_URL}${ogImage}`;

    setMeta('meta[property="og:title"]', resolvedOgTitle);
    setMeta('meta[property="og:description"]', resolvedOgDesc);
    setMeta('meta[property="og:image"]', absoluteOgImage);
    setMeta('meta[property="og:url"]', resolvedCanonical);

    setMeta('meta[name="twitter:title"]', resolvedOgTitle);
    setMeta('meta[name="twitter:description"]', resolvedOgDesc);
    setMeta('meta[name="twitter:image"]', absoluteOgImage);

    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.setAttribute("name", "robots");
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute("content", noindex ? "noindex,nofollow" : "index,follow");

    setCanonical(resolvedCanonical);

    return () => {
      document.title = SITE_NAME;
    };
  }, [title, description, ogTitle, ogDescription, ogImage, canonical, noindex]);
}
