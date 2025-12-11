import { Link } from "./Link";
import { kebabCase } from "@/lib/client-utils";

export function Tag({ text }: { text: string }) {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 text-sm font-medium text-[#cc6600] dark:text-[#ff8800] hover:text-[#994400] dark:hover:text-[#ffaa00] border border-gray-300 dark:border-[#404040] hover:border-[#cc6600] dark:hover:border-[#ff8800] px-2 py-1 md:text-base"
    >
      #{text.split(" ").join("-")}
    </Link>
  );
}
