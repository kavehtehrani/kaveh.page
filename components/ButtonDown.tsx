import { siteMetadata } from '~/data/siteMetadata'

export default function ButtonDown() {
  return (
    <div className="flex flex-col justify-center items-center">
      <form
        action={`https://buttondown.email/api/emails/embed-subscribe/${siteMetadata.buttondown}`}
        method="post"
        target="popupwindow"
        className="gap-x-4"
      >
        <input
          type="email"
          name="email"
          placeholder="you@domain.com"
          className="text-sm rounded-l-xl ml-2 dark:text-gray-800 dark:bg-neutral-300 "
        />
        <input type="hidden" value="1" name="embed" />
        <button
          className="text-sm rounded-r-xl focus:shadow-outline-blue inline border border-transparent
              bg-stone-600 px-4 py-2 text-white shadow transition-colors
              duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500"
          type="submit"
          value="Subscribe"
        >
          Subscribe
        </button>
        <p className="text-sm text-stone-400 dark:text-stone-500 mt-1">
          {' '}
          No spam. Not selling anything. Max 1-2 newsletters a month.{' '}
        </p>
      </form>
    </div>
  )
}
