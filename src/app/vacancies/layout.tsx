"use client";
import { Sidebar } from "@/src/components/SideBar/SideBar";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function VacanciesContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSearchPage = pathname === "/vacancies";
  const isDetailPage = !isSearchPage && pathname.startsWith("/vacancies/");
  return (
    <div className="flex w-full min-h-screen font-sans justify-center bg-[#eff2f6]">
      <div
        className={clsx(
          "grid w-full max-w-[1280px] gap-6 px-4 py-6",
          isDetailPage
            ? "grid-cols-[244px_1fr_300px]"
            : "grid-cols-[244px_964px]"
        )}
      >
        <aside className="shrink-0">
          <Sidebar />
        </aside>

        <main className="min-w-0">{children}</main>

        {isDetailPage && (
          <aside className="hidden xl:block">
            <div className="sticky top-6"></div>
          </aside>
        )}
      </div>
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
