import { PostListItem } from "@/components/PostListItem";
import type { BlogFrontMatter } from "@/components/PostListItem";

interface PostListProps {
  posts: BlogFrontMatter[];
  emptyMessage?: string;
  className?: string;
}

export function PostList({
  posts,
  emptyMessage = "No posts found.",
  className = "",
}: PostListProps) {
  return (
    <ul className={className}>
      {!posts.length && (
        <li className="text-gray-500 dark:text-[#808080] py-4">
          {emptyMessage}
        </li>
      )}
      {posts.map((post) => (
        <PostListItem key={post.slug} frontMatter={post} />
      ))}
    </ul>
  );
}
