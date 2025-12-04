import { Link } from "./Link"
import { kebabCase } from "@/lib/utils"

export function Tag({ text }: { text: string }) {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 text-sm font-medium text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 md:text-base"
    >
      #{text.split(" ").join("-")}
    </Link>
  )
}

