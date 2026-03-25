export function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-[34px] font-extrabold leading-10 tracking-tight text-terminal-orange-dim dark:text-terminal-orange md:text-5xl md:leading-14 lg:text-[54px] lg:leading-[64px]">
      {children}
    </h1>
  );
}
