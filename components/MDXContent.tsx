"use client";

import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { MDXComponents } from "./MDXComponents";

export function MDXContent({ content }: { content: string }) {
  // Compiled synchronously so the body is present in the server-rendered HTML.
  // "use client" marks the hydration boundary; it does not skip the server render.
  //
  // mdx-bundler compiles to a code string that must be evaluated to get a
  // component, so this is the library's documented pattern. It is memoised on
  // `content`, which is stable for the lifetime of a page, so the identity never
  // churns and nothing remounts.
  const MDXComponent = useMemo(() => getMDXComponent(content), [content]);

  // eslint-disable-next-line react-hooks/static-components
  return <MDXComponent components={MDXComponents} />;
}
