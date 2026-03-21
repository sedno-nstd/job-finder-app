"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserSidebar } from "../../shared/UserSidebar";
import { NAV_ITEMS } from "./components/config/type";
import { useSession } from "next-auth/react";
import { AuthBlock } from "./components/SidebarAuthBlock";
import { SideUserheader } from "./components/SidebarUserHeader";
import { useOutsideClick } from "@/src/hooks/ui/useOutsideClick";

interface Props {
  className?: string;
}

export function Sidebar({ className }: Props) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  const user = session?.user;
  const userRole = (user as any)?.role;

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRolePicker, setShowRolePicker] = useState(false);
  const menuRef = useOutsideClick<HTMLDivElement>(() => setShowUserMenu(false));

  const filteredNavItems = NAV_ITEMS.filter((item) => {
    const allowedRoles: string[] = ["everyone", userRole];

    return allowedRoles.includes(item.role);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || status === "loading") {
    return <div className="flex flex-col p-6 h-full w-[244px]" />;
  }

  return (
    <div className={clsx("flex flex-col p-0 xl:p-6 h-full", className)}>
      {user ? (
        <div className="relative" ref={menuRef}>
          <SideUserheader
            role={userRole}
            setShowUserMenu={setShowUserMenu}
            userName={user.name}
            userImage={user.image}
            showUserMenu={showUserMenu}
          />

          {showUserMenu && <UserSidebar className="absolute" />}
        </div>
      ) : (
        <AuthBlock
          setShowRolePicker={setShowRolePicker}
          showRolePicker={showRolePicker}
        />
      )}

      <div className="h-[1px] my-4 bg-black/5" />

      <nav className="flex flex-col gap-1">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "py-3 px-4 flex items-center gap-3 rounded-lg transition-colors",
                isActive
                  ? "bg-[#6380A61A] text-blue-700"
                  : "hover:bg-[#6380A61A] text-[#2d3540]",
              )}
            >
              <Icon
                size={22}
                className={isActive ? "text-blue-700" : "text-blue-600"}
              />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
