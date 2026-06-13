import { Helmet } from "react-helmet-async";

interface ArticleMeta {
  publishedTime: string;   // ISO 8601, e.g. "2026-04-10T00:00:00Z"
  modifiedTime?: string;
  author?: string;
  section?: string;        // e.g. "Retail Security"
  tags?: string[];
}

interface PageSEOProps {
  title: string;
  description: string;
  canonical: string;
  ogType?: "website" | "article";
  ogImage?: string;
  ogImageAlt?: string;
  ldJson?: string;
  keywords?: string;
  noindex?: boolean;
  /** Pass for article / blog pages */
  articleMeta?: ArticleMeta;
  /** Breadcrumb trail accepts either tuple [name, url] or object {name, url} format */
  breadcrumbs?: ([string, string] | { name: string; url: string })[];
}

const DEFAULT_IMAGE = "https://mykei.io/social-share.png";
const DEFAULT_IMAGE_ALT = "Mykei Securities, anti-resale crime and asset integrity";
const TWITTER_HANDLE = "@MykeisecLtd";

export default function PageSEO({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  ogImageAlt = DEFAULT_IMAGE_ALT,
  ldJson,
  keywords,
  noindex = false,
  articleMeta,
  breadcrumbs,
}: PageSEOProps) {
  const breadcrumbJson = breadcrumbs
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, i) => {
          const name = Array.isArray(item) ? item[0] : item.name;
          const href = Array.isArray(item) ? item[1] : item.url;
          return {
            "@type": "ListItem",
            "position": i + 1,
            "name": name,
            "item": href.startsWith("http") ? href : `https://mykei.io${href}`,
          };
        }),
      })
    : null;

  return (
    <Helmet>
      {/* Core */}
      <html lang="en-GB" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"} />
      <meta name="author" content="Michael Esema, Mykei Securities Ltd" />
      <meta name="copyright" content="Mykei Securities Ltd" />
      <meta name="geo.region" content="GB-MAN" />
      <meta name="geo.placename" content="Manchester, United Kingdom" />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Mykei Securities" />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:type" content="image/png" />

      {/* Article-specific OG */}
      {articleMeta && <meta property="article:published_time" content={articleMeta.publishedTime} />}
      {articleMeta?.modifiedTime && <meta property="article:modified_time" content={articleMeta.modifiedTime} />}
      {articleMeta?.author && <meta property="article:author" content={articleMeta.author} />}
      {articleMeta?.section && <meta property="article:section" content={articleMeta.section} />}
      {articleMeta?.tags?.map(tag => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* Structured data */}
      {ldJson && <script type="application/ld+json">{ldJson}</script>}
      {breadcrumbJson && <script type="application/ld+json">{breadcrumbJson}</script>}
    </Helmet>
  );
}
