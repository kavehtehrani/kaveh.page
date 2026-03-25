import { Link } from "./Link";
import { kebabCase } from "@/lib/client-utils";

export function Tag({ text }: { text: string }) {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 text-sm font-medium text-terminal-orange-dim dark:text-terminal-orange hover:text-terminal-orange-dark dark:hover:text-terminal-orange-bright border border-gray-300 dark:border-terminal-bg-lighter hover:border-terminal-orange-dim dark:hover:border-terminal-orange px-2 py-1 rounded-md transition-colors duration-150 md:text-base"
    >
      #{text.split(" ").join("-")}
    </Link>
  );
}
