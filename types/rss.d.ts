declare module "rss" {
  interface RSSOptions {
    title: string;
    description: string;
    site_url: string;
    feed_url: string;
    language?: string;
    managingEditor?: string;
    webMaster?: string;
    pubDate?: Date;
  }

  interface RSSItem {
    title: string;
    description?: string;
    url: string;
    guid?: string;
    date: Date;
    categories?: string[];
  }

  class RSS {
    constructor(options: RSSOptions);
    item(item: RSSItem): void;
    xml(options?: { indent?: boolean }): string;
  }

  export = RSS;
}

