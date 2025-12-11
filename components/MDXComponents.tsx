import { Link } from "./Link";
import Image from "next/image";
import CorrChart from "@/data/blog/charts/CorrelationChart";

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
      <img
        src={srcString}
        alt={alt || ""}
        className="terminal-image"
        {...rest}
      />
    );
  }

  // Handle local images with Next.js Image
  const imgWidth = width ? Number(width) : 800;
  const imgHeight = height ? Number(height) : 600;

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
  CorrChart: CorrChart,
};
