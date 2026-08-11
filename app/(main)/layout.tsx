import { Footer } from "@/components/Footer";
import { SiteChrome } from "@/components/SiteChrome";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Flex column + flex-1 on <main> keeps the footer at the bottom. This
    // replaces a `calc(100vh - 69px - 188px)` inline style whose hardcoded
    // header/footer pixel heights nothing kept in sync.
    <div className="flex min-h-screen w-full flex-col bg-white dark:bg-terminal-bg text-terminal-orange-dim dark:text-terminal-orange transition-colors duration-300 px-4">
      <SiteChrome />
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-3 sm:px-6 xl:max-w-5xl xl:px-0">
        <main className="flex-1 transition-colors duration-300 content-scaled">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
