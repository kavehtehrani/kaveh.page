export function TagText({ text }: { text: string }) {
  return (
    <span className="mr-3 text-sm font-medium text-primary-500 dark:text-primary-400 md:text-base">
      #{text.split(" ").join("-")}
    </span>
  );
}

