import { MDXContent } from "./MDXContent";

export function AuthorContent({ content }: { content: string }) {
  return (
    <div className="prose prose-xl max-w-none pb-8 dark:prose-dark">
      <MDXContent content={content} />
    </div>
  );
}
