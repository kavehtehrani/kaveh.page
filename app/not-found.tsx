import { Link } from "@/components/Link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center pt-4 md:pt-10 xl:pt-20">
      <div className="space-x-2 pt-8 md:space-y-5 md:pt-12 xl:pt-16">
        <div className="max-w-md text-center">
          <h1 className="text-6xl">
            Error <span className="text-primary-500 dark:text-primary-400">404</span>
          </h1>
          <p className="my-12 text-xl font-bold leading-normal md:text-2xl">
            Oops... it seems that you&apos;re looking for pages that don&apos;t exist! &#129488;
          </p>
          <Link href="/">
            <button
              className="mt-12 inline rounded-lg border border-transparent bg-stone-600 px-4 py-2 text-lg font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue dark:hover:bg-blue-500"
            >
              Back to homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

