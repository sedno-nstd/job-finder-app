import { HeaderNavigation } from "@/src/components/layout/NavigationSearchHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#eff2f6] flex flex-col">
      <header className="sticky top-0 z-50 bg-white">
        <HeaderNavigation />
      </header>

      <main className="w-full flex-1 h-full flex flex-col items-center">
        <div className="w-full flex-1 flex">{children}</div>
      </main>
    </div>
  );
}
