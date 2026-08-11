"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Link } from "./Link";
import { MDX_IMAGE_FALLBACK } from "@/data/constants";

// Loaded on demand so chart.js stays out of the shared bundle for the other
// 49 MDX documents. The chart is a canvas with no crawlable content, so
// skipping SSR costs nothing.
const CorrChart = dynamic(() => import("@/components/charts/CorrelationChart"), {
  ssr: false,
  loading: () => <div className="terminal-chart-placeholder" aria-hidden="true" />,
});

// Terminal-styled image component for MDX
function TerminalImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, width, height, ...rest } = props;

  if (!src) return null;

  // Ensure src is a string (MDX always provides string URLs)
  const srcString = typeof src === "string" ? src : String(src);

  // Handle external URLs or if width/height are provided as strings
  if (srcString.startsWith("http") || srcString.startsWith("//")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={srcString} alt={alt || ""} className="terminal-image" {...rest} />
    );
  }

  // Handle local images with Next.js Image
  const imgWidth = width ? Number(width) : MDX_IMAGE_FALLBACK.width;
  const imgHeight = height ? Number(height) : MDX_IMAGE_FALLBACK.height;

  return (
    <Image
      src={srcString}
      alt={alt || ""}
      width={imgWidth}
      height={imgHeight}
      className="terminal-image"
      style={{ maxWidth: "100%", height: "auto" }}
      {...rest}
    />
  );
}

export const MDXComponents = {
  a: Link,
  img: TerminalImage,
  CorrChart,
};
