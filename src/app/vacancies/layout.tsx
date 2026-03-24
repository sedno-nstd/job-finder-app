"use client";
import { Sidebar } from "@/src/components/search/SideBar/SideBar";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { FullPageLoader } from "@/src/components/ui/base/Loader";
import { Menu } from "lucide-react";
import { FullScreenModal } from "@/src/components/ui/SideBarModal";

function VacanciesContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const isSearchPage = pathname === "/vacancies";
  const isDetailPage = !isSearchPage && pathname.startsWith("/vacancies/");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#eff2f6]">
        <FullPageLoader />
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen font-sans justify-center bg-[#eff2f6] relative">
      <div className="xl:hidden absolute top-6 left-4 right-4 z-40 flex items-center justify-between">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm text-gray-700 hover:text-blue-600 active:scale-95 transition-all"
        >
          <Menu size={24} />
        </button>
        <div className="w-6" />{" "}
      </div>
      <div
        className={clsx(
          "w-full px-4 xl:max-w-[1280px] xl:py-6 max-xl:mt-10 max-md:mt-10 max-sm:mt-10",
          "xl:grid xl:gap-6",
          isDetailPage
            ? "xl:grid-cols-[244px_1fr_300px]"
            : "xl:grid-cols-[244px_964px]",
          "flex flex-col items-start",
          "min-h-screen",
        )}
      >
        <aside className="shrink-0 hidden xl:block">
          <Sidebar />
        </aside>

        <main
          className={clsx(
            "w-full min-w-0 flex flex-col items-center xl:items-start",

            "mt-16 sm:mt-20 md:mt-24 xl:mt-0",
          )}
        >
          <div className="w-full max-w-[640px] xl:max-w-none">{children}</div>
        </main>

        {isDetailPage && (
          <aside className="hidden xl:block">
            <div className="sticky top-6"></div>
          </aside>
        )}
      </div>

      {isMobileSidebarOpen && (
        <FullScreenModal
          className="max-w-[300px]"
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        >
          <Sidebar className="w-full" />
        </FullScreenModal>
      )}
    </div>
  );
}
export default function VacanciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <VacanciesContent>{children}</VacanciesContent>;
}
