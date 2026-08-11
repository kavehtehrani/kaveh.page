import { siteConfig } from "@/data/site";

/**
 * Serialises JSON-LD for injection into a <script> tag.
 *
 * `<` is escaped because a title containing "</script>" would otherwise close
 * the tag early and let the remainder be parsed as markup.
 */
function jsonLd(data: unknown): string {
  return JSON.stringify(data, null, 2).replace(/</g, "\\u003c");
}

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  authorName: string;
  authorUrl?: string;
  image?: string;
  tags?: string[];
}

export function ArticleStructuredData({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  authorName,
  authorUrl,
  image,
  tags,
}: ArticleStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    ...(image && { image }),
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl || siteConfig.url,
    },
    publisher: { "@id": `${siteConfig.url}#person` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(tags?.length ? { keywords: tags.join(", ") } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd(structuredData),
      }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}#person`,
    name: siteConfig.author,
    url: siteConfig.url,
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.twitter,
      siteConfig.social.linkedin,
      siteConfig.social.medium,
    ].filter(Boolean),
    jobTitle: "Blogger",
    description: siteConfig.description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd(structuredData),
      }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd(structuredData),
      }}
    />
  );
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd(structuredData),
      }}
    />
  );
}
