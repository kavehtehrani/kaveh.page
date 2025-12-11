import { formatDate } from "@/lib/client-utils";

interface BlogMetaProps {
  date: string;
  readingTime: {
    text: string;
    minutes: number;
  };
}

export function BlogMeta({ date, readingTime }: BlogMetaProps) {
  return (
    <dd className="flex flex-wrap text-sm font-medium leading-6 text-gray-500 dark:text-[#808080] md:text-base">
      <time dateTime={date} className="flex items-center justify-center">
        <span className="ml-1.5 md:ml-2">{formatDate(date)}</span>
      </time>
      <span className="mx-2 text-gray-400 dark:text-[#404040]">{` | `}</span>
      <div className="flex items-center">
        {String.fromCodePoint(0x2615).repeat(
          Math.ceil(readingTime.minutes / 5)
        )}
        <span className="ml-1.5 md:ml-2">
          {readingTime.text.replace("min", "mins")}
        </span>
      </div>
    </dd>
  );
}
