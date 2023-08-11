import { Link } from '../Link'

export function BlogLinks() {
  return (
    <div className="inline-flex flex-col space-y-1.5">
      <Link href="/">
        <span>&#x270D;&#x1F3FC;</span>
        <span data-umami-event="home-link-blog" className="ml-1.5">
          My writings
        </span>
      </Link>
      <Link href="/snippets">
        <span>&#x1F4CB;</span>
        <span data-umami-event="home-link-snippets" className="ml-1.5">
          My snippets collection
        </span>
      </Link>
      <Link href="/projects">
        <span>&#x1F6E0;&#xFE0F;</span>
        <span data-umami-event="home-link-projects" className="ml-1.5">
          What have I built?
        </span>
      </Link>
      <Link href="/about">
        <span>&#x1F4D3;</span>
        <span data-umami-event="home-link-about" className="ml-1.5">
          About me
        </span>
      </Link>
    </div>
  )
}
