import { Link } from "./Link"

export function BlogLinks() {
  return (
    <div className="flex flex-col space-y-1.5">
      <Link className="w-fit text-[#cc6600] no-underline hover:text-[#994400] hover:underline dark:text-[#ff8800] dark:hover:text-[#ffaa00]" href="/">
        <span>&#x270D;&#x1F3FC;</span>
        <span className="ml-1.5">My writings</span>
      </Link>
      <Link className="w-fit text-[#cc6600] no-underline hover:text-[#994400] hover:underline dark:text-[#ff8800] dark:hover:text-[#ffaa00]" href="/snippets">
        <span>&#x1F4CB;</span>
        <span className="ml-1.5">My snippets collection</span>
      </Link>
      <Link className="w-fit text-[#cc6600] no-underline hover:text-[#994400] hover:underline dark:text-[#ff8800] dark:hover:text-[#ffaa00]" href="/projects">
        <span>&#x1F6E0;&#xFE0F;</span>
        <span className="ml-1.5">What have I built?</span>
      </Link>
    </div>
  )
}

