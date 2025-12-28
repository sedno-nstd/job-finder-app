import { HeaderNavigation } from "@/src/components/layout/NavigationSearchHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#eff2f6] flex flex-col">
      <header className=" top-0 z-50 bg-white">
        <HeaderNavigation />
      </header>

      <main className="w-full max-w-[1280px] mx-auto px-4 py-6 flex justify-center">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
