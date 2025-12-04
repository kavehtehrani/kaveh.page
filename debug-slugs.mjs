import { getAllFilesFrontMatter } from "./lib/mdx.js";
import { formatSlug } from "./lib/utils.js";

const posts = getAllFilesFrontMatter("blog");
console.log("Total posts:", posts.length);
console.log("\nFirst 5 posts:");
posts.slice(0, 5).forEach((post, i) => {
  console.log(`Post ${i + 1}:`);
  console.log("  slug:", post.slug);
  console.log("  title:", post.title);
  console.log("  slug type:", typeof post.slug);
  console.log("  slug truthy:", !!post.slug);
  console.log("---");
});

const undefinedSlugs = posts.filter(
  (p) => !p.slug || p.slug === "undefined" || p.slug === ""
);
console.log("\nPosts with undefined/empty slugs:", undefinedSlugs.length);
if (undefinedSlugs.length > 0) {
  console.log("Problematic posts:");
  undefinedSlugs.forEach((p) => {
    console.log(`  - Title: ${p.title}, Slug: ${p.slug}`);
  });
}

console.log("\nSample generateStaticParams output:");
const sampleParams = posts
  .filter((post) => post.slug && post.slug !== "undefined")
  .slice(0, 3)
  .map((post) => {
    const slugParts = post.slug.includes("/")
      ? post.slug.split("/")
      : [post.slug];
    return {
      slug: slugParts,
    };
  });
console.log(JSON.stringify(sampleParams, null, 2));
