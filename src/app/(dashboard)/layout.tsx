import { UserHeader } from "@/src/components/layout/UserHeader";
export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#eff2f6] flex flex-col">
      <header className="sticky top-0 z-50 bg-white">
        <UserHeader />
      </header>

      <main className="flex-1 overflow-y-auto w-full">
        <div className="min-h-full w-full flex justify-center">{children}</div>
      </main>
    </div>
  );
}
