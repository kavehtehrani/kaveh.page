"use client";

import { useState, useEffect } from "react";
import type { ComponentType } from "react";
import { MDXComponents } from "./MDXComponents";

export function MDXContent({ content }: { content: string }) {
  const [mounted, setMounted] = useState(false);
  const [MDXComponent, setMDXComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    setMounted(true);
    // Only import and get the component on client side
    if (typeof window !== "undefined") {
      import("mdx-bundler/client").then((mod) => {
        const Component = mod.getMDXComponent(content);
        setMDXComponent(() => Component);
      });
    }
  }, [content]);

  if (!mounted || !MDXComponent) {
    return null;
  }

  return <MDXComponent components={MDXComponents} />;
}
