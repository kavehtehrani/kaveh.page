"use client";

export function PostsSearch({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative max-w-lg">
      <input
        aria-label="Search posts"
        type="text"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search posts..."
        className="block w-full rounded-lg border border-gray-300 dark:border-terminal-bg-lighter bg-gray-100 dark:bg-terminal-bg-light px-4 py-2 text-terminal-orange-dim dark:text-terminal-orange focus:border-terminal-orange-dim dark:focus:border-terminal-orange focus:outline-none focus:ring-1 focus:ring-terminal-orange-dim dark:focus:ring-terminal-orange transition-all duration-200 placeholder:text-gray-500 dark:placeholder:text-terminal-gray"
      />
      <svg
        className="absolute right-3 top-3 h-5 w-5 text-terminal-gray"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
}
