import { BuiltWith } from "./BuiltWith";
import { SocialAccounts } from "./SocialAccounts";
import { ButtonDown } from "./ButtonDown";

export function Footer() {
  return (
    <footer className="border-t border-terminal-bg-lighter mt-8 pt-4">
      <div className="flex flex-col items-center justify-center gap-y-2 pb-2">
        <div className="mb-4 text-terminal-gray">
          <SocialAccounts />
        </div>
        <ButtonDown />
        <div className="mt-2 text-terminal-gray">
          <BuiltWith />
        </div>
      </div>
    </footer>
  );
}
