import { Link } from '~/components/Link'

export default function FourZeroFour() {
  return (
    <div
      className="flex flex-col items-start justify-start gap-y-4
      pt-4 md:pt-10 xl:pt-20"
    >
      <h1 className="text-2xl text-primary-500">kaveh.page</h1>
      <p>
        This website uses <Link href="https://umami.is/">Umami</Link> for analytics and does not
        collect any personally identifiable information about you. See Umami's privacy policy{' '}
        <Link href="https://umami.is/privacy"> here </Link>.
      </p>

      <h1 className="text-2xl text-primary-500">Chrome Extensions</h1>
      <p>
        The Chrome extensions I have developed collect no personal information whatsoever and reside
        locally on your own machine. All extensions are open source and free to use.
      </p>

      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-full h-px my-4 bg-gray-300 border-0 dark:bg-gray-700" />
      </div>
      <p>
        Find all repositories <Link href="https://github.com/kavehtehrani"> here.</Link>
      </p>
    </div>
  )
}
