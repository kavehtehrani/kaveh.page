interface SocialIconProps {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
}

export function SocialIcon({
  href,
  ariaLabel,
  children,
  className = "",
}: SocialIconProps) {
  const logoClassName =
    "h-1/2 w-1/2 mx-auto fill-current text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-400 hover:scale-[1.1]";

  return (
    <div
      className={`mx-auto grid aspect-square items-center border-2 ${className}`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
      >
        <svg className={logoClassName} viewBox="0 0 24 24" fill="currentColor">
          {children}
        </svg>
      </a>
    </div>
  );
}
