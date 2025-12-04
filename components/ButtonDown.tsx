import { siteConfig } from "@/data/site"

export function ButtonDown() {
  return (
    <div className="flex flex-col items-center justify-center">
      <form
        action={`https://buttondown.email/api/emails/embed-subscribe/${siteConfig.buttondown}`}
        method="post"
        target="popupwindow"
        className="flex items-center gap-0"
        onSubmit={() => {
          // Open in popup window as specified by Buttondown
          const width = 600;
          const height = 600;
          const left = window.screen.width / 2 - width / 2;
          const top = window.screen.height / 2 - height / 2;
          window.open(
            "",
            "popupwindow",
            `width=${width},height=${height},left=${left},top=${top}`
          );
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="you@domain.com"
          required
          className="rounded-l-xl border border-r-0 border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-neutral-300 dark:text-gray-800 dark:placeholder:text-gray-600"
        />
        <input type="hidden" value="1" name="embed" />
        <button
          className="rounded-r-xl border border-transparent bg-stone-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors duration-150 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:hover:bg-primary-500"
          type="submit"
        >
          Subscribe
        </button>
      </form>
      <p className="mt-1 text-sm text-stone-400 dark:text-stone-500">
        No spam. Not selling anything. Max 1-2 newsletters a month.
      </p>
    </div>
  );
}

