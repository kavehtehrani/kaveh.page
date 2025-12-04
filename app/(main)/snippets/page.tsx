import { getAllSnippetsFrontMatter } from "@/lib/mdx";
import { SnippetCard } from "@/components/SnippetCard";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `Snippets - ${siteConfig.title}`,
  description: "Little code snippets / system config stuff I have found useful",
};

export default async function SnippetsPage() {
  const snippets = getAllSnippetsFrontMatter();

  return (
    <div>
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Snippets
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Little code snippets / system config stuff I have found useful
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.slug} snippet={snippet} />
        ))}
      </div>
    </div>
  );
}

