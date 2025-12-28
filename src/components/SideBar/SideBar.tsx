"use client";
import { useUserState } from "@/src/store/useUserState";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { RolePicker } from "./components/RolePicker";
import { UserMenu } from "./components/UserMenu";
import { NAV_ITEMS } from "./components/config/type";

export function Sidebar() {
  const pathname = usePathname();
  const { login, user, logout } = useUserState();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRolePicker, setShowRolePicker] = useState(false);

  return (
    <div className="flex flex-col p-6 h-full">
      {user ? (
        <div className="relative">
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="rounded-lg hover:bg-[#6380a61a] flex flex-row p-2 cursor-pointer w-full items-center"
          >
            <div className="mr-[12px] shrink-0">
              {user.image ? (
                <img
                  src={user.image}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full border border-gray-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[#6380a61a] flex items-center justify-center text-[#5a6f87] font-bold select-none">
                  {user.name[0]}
                </div>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[#2d3540] font-bold text-base truncate">
                {user.name}
              </span>
              <span className="text-[#5a6f87] text-sm select-none">
                My profile
              </span>
            </div>
            <Ellipsis size={22} className="ml-auto text-[#5a6f87]" />
          </div>

          {showUserMenu && <UserMenu logout={logout} />}
        </div>
      ) : (
        <div className="p-4 bg-white flex flex-col mb-4 border border-gray-100 rounded-xl">
          <span className="mb-3 text-sm text-[#5a6f87]">
            Employers will see you in our database and offer jobs.
          </span>
          <div className="flex flex-col gap-2 relative">
            <button className="rounded-lg py-2 bg-blue-700 text-white font-medium hover:bg-blue-800 transition-all">
              Create profile
            </button>

            <div className="relative">
              <button
                onClick={() => setShowRolePicker(!showRolePicker)}
                className={clsx(
                  "flex items-center justify-center gap-2 w-full py-2 border rounded-lg transition-all",
                  showRolePicker
                    ? "border-blue-600 text-blue-600 shadow-sm"
                    : "border-blue-600/30 text-blue-600 hover:bg-blue-50"
                )}
              >
                <span className="font-medium">Enter</span>
                <ArrowRight size={20} />
              </button>

              {showRolePicker && <RolePicker />}
            </div>
          </div>
        </div>
      )}

      <div className="h-[1px] my-4 bg-black/5" />

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
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
                  : "hover:bg-[#6380A61A] text-[#2d3540]"
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
