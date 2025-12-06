import { Link } from "./Link";
import { DevIcon } from "./DevIcon";
import { siteConfig } from "@/data/site";

export function BuiltWith() {
  return (
    <div className="flex items-center justify-center gap-x-2 text-sm text-neutral-400 dark:text-neutral-500">
      <span>{siteConfig.title}</span>
      <span>•</span>
      <Link
        href="/privacy"
        className="text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
      >
        Privacy
      </Link>
      <span>•</span>
      <Link
        href="https://github.com/kavehtehrani/kaveh.page"
        className="text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
      >
        View source
      </Link>
      <span>•</span>
      <Link
        href="/feed.xml"
        className="flex items-center gap-1 text-gray-500 hover:underline underline-offset-4 dark:text-gray-400"
      >
        RSS
        <img
          src="/icons/rss.svg"
          alt="RSS"
          className="h-4 w-4 opacity-70 dark:opacity-100 dark:invert"
        />
      </Link>
    </div>
  );
}
