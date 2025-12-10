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
        className="block w-full border border-gray-300 dark:border-[#404040] bg-gray-100 dark:bg-[#2d2d2d] px-4 py-2 text-[#cc6600] dark:text-[#ff8800] focus:border-[#cc6600] dark:focus:border-[#ff8800] focus:outline-none focus:ring-1 focus:ring-[#cc6600] dark:focus:ring-[#ff8800] placeholder:text-gray-500 dark:placeholder:text-[#808080]"
      />
      <svg
        className="absolute right-3 top-3 h-5 w-5 text-[#808080]"
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
