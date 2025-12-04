import { Link } from "@/components/Link";
import { siteConfig } from "@/data/site";

export const metadata = {
  title: `Privacy - ${siteConfig.title}`,
  description: "Privacy policy for kaveh.page",
};

export default function Privacy() {
  return (
    <div className="prose prose-lg max-w-none pb-8 pt-4 text-justify dark:prose-dark md:pt-10 md:prose-xl xl:pt-20">
      <h1 className="text-xl text-primary-500">kaveh.page</h1>
      <p>
        This website uses <Link href="https://umami.is/">Umami</Link> for
        analytics and does not collect any personally identifiable information
        about you. See Umami&apos;s privacy policy{" "}
        <Link href="https://umami.is/privacy"> here </Link>.
      </p>

      <h1 className="text-xl pt-8 text-primary-200">Chrome Extensions</h1>
      <p>
        The Chrome extensions I have developed collect no personal information
        whatsoever and reside locally on your own machine. All extensions are
        open source and free to use.
      </p>
      <p>
        Find all repositories{" "}
        <Link href="https://github.com/kavehtehrani"> here.</Link>
      </p>

      <hr className="my-4 border-0 bg-gray-300 dark:bg-gray-700" />
    </div>
  );
}
