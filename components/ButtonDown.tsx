import { siteConfig } from "@/data/site"

export function ButtonDown() {
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        action={`https://buttondown.email/api/emails/embed-subscribe/${siteConfig.buttondown}`}
        method="post"
        target="popupwindow"
        className="gap-x-4"
      >
        <input
          type="email"
          name="email"
          placeholder="you@domain.com"
          className="ml-2 rounded-l-xl text-sm dark:bg-neutral-300 dark:text-gray-800"
        />
        <input type="hidden" value="1" name="embed" />
        <button
          className="inline rounded-r-xl border border-transparent bg-stone-600 px-4 py-2 text-sm text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue dark:hover:bg-blue-500"
          type="submit"
        >
          Subscribe
        </button>
        <p className="mt-1 text-sm text-stone-400 dark:text-stone-500">
          No spam. Not selling anything. Max 1-2 newsletters a month.
        </p>
      </form>
    </div>
  )
}

