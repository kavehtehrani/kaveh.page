import { dimensionsForPublicPath } from "@/lib/image-size";

interface HastNode {
  type?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

/**
 * Rehype plugin that stamps every local <img> with its real intrinsic
 * width/height at build time.
 *
 * Without this, MDX images fall back to a fixed 800x600 box. Whenever the true
 * aspect ratio differs the page reflows once the image loads, which is a direct
 * Cumulative Layout Shift penalty on 49 images across the corpus.
 *
 * Hand-rolled tree walk rather than unist-util-visit so this adds no dependency.
 */
export function rehypeImageDimensions() {
  return (tree: HastNode) => {
    const visit = (node: HastNode) => {
      if (node.type === "element" && node.tagName === "img" && node.properties) {
        const src = node.properties.src;
        if (
          typeof src === "string" &&
          node.properties.width === undefined &&
          node.properties.height === undefined
        ) {
          const dimensions = dimensionsForPublicPath(src);
          if (dimensions) {
            node.properties.width = dimensions.width;
            node.properties.height = dimensions.height;
          }
        }
      }

      node.children?.forEach(visit);
    };

    visit(tree);
  };
}
