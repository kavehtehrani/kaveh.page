export function SectionContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full divide-y divide-gray-200 dark:divide-[#404040]">
      {children}
    </div>
  );
}
