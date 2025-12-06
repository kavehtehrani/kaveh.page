import { siteConfig } from "@/data/site";
import { BuiltWith } from "./BuiltWith";
import { SocialAccounts } from "./SocialAccounts";
import { ButtonDown } from "./ButtonDown";
import { Link } from "./Link";

export function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center justify-center gap-y-2 pb-2">
        <div className="mb-4">
          <SocialAccounts />
        </div>
        <ButtonDown />
        <div className="mt-2">
          <BuiltWith />
        </div>
      </div>
    </footer>
  );
}
