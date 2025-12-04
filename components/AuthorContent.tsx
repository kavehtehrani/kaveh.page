"use client";

import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

export function AuthorContent({ content }: { content: string }) {
  const MDXContent = useMemo(() => getMDXComponent(content), [content]);

  return (
    <div className="prose prose-xl max-w-none pb-8 text-justify dark:prose-dark">
      {/* eslint-disable-next-line react-hooks/static-components */}
      <MDXContent />
    </div>
  );
}

