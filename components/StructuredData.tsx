import { siteConfig } from "@/data/site";

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
    image: image || `${siteConfig.url}/static/images/og-image.png`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl || siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.title,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/static/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: tags?.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
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
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Person",
      name: siteConfig.author,
    },
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
        __html: JSON.stringify(structuredData, null, 2),
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
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}
