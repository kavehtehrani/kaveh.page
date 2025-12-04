import Image from "next/image";

// Map icon types to their public paths
const DevIconsMap: Record<string, string> = {
  React: "/icons/react.svg",
  Git: "/icons/git.svg",
  GitHub: "/icons/github.svg",
  Javascript: "/icons/javascript.svg",
  Typescript: "/icons/typescript.svg",
  Node: "/icons/nodejs.svg",
  Bash: "/icons/bash.svg",
  Liquid: "/icons/liquid.svg",
  Markdown: "/icons/markdown.svg",
  NextJS: "/icons/nextjs.svg",
  TailwindCSS: "/icons/tailwind.svg",
  Umami: "/icons/umami.svg",
  Ubuntu: "/icons/ubuntu.svg",
  Vercel: "/icons/vercel.svg",
  Railway: "/icons/railway.svg",
  Spotify: "/icons/spotify.svg",
  RSS: "/icons/rss.svg",
  Chrome: "/icons/chrome.svg",
  Close: "/icons/close.svg",
  Linux: "/icons/linux.svg",
};

export function DevIcon({
  type,
  className,
}: {
  type: string;
  className?: string;
}) {
  const iconSrc = DevIconsMap[type];
  if (!iconSrc) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded bg-gray-100 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300 lg:h-14 lg:w-14 xl:h-24 xl:w-24">
        {type}
      </div>
    );
  }

  const defaultClass = "h-16 w-16 lg:h-14 lg:w-14 xl:h-24 xl:w-24";
  // Always include dev-icon class for theme-aware styling
  const finalClassName = className 
    ? `${className} dev-icon`
    : `${defaultClass} dev-icon`;

  return (
    <div className={finalClassName}>
      <Image
        src={iconSrc}
        alt={type}
        width={96}
        height={96}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
