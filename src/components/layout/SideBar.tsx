"use client";
import { useUserState } from "@/src/store/useUserState";
import clsx from "clsx";
import {
  Search,
  Heart,
  MessageSquare,
  Bell,
  Wallet,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Ellipsis, EllipsisVertical } from "lucide-react";

export const NAV_ITEMS = [
  { name: "search", label: "Search", href: "/vacancies", icon: Search },
  { name: "saved", label: "Saved", href: "/saved", icon: Heart },
  { name: "chats", label: "Chats", href: "/chats", icon: MessageSquare },
  {
    name: "notifications",
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  { name: "salary", label: "Salaries", href: "/salaries", icon: Wallet },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const { login, user, logout } = useUserState();

  return (
    <div className="flex flex-col p-6">
      <div></div>
      {user ? (
        <div className="rounded-lg hover:bg-[#6380a61a] flex flex-row p-2 cursor-pointer  w-full">
          <div className="flex flex-row ">
            <div className="mr-[12px] flex items-center">
              {user.image ? (
                <img
                  src={user.image}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full  border border-gray-200"
                />
              ) : (
                <div className="w-12 h-12 rounded-full text-md bg-[#6380a61a] flex items-center justify-center text-[#5a6f87] font-bold">
                  <span>{user.name[0]}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col ">
              <span
                className={clsx(
                  "text-[##2d3540] font-bold text-base leading-6 font-sans"
                )}
              >
                {user.name}
              </span>
              <span className="text-[#5a6f87] font-normal text-sm leading-5 font-sans">
                My profile
              </span>
            </div>
          </div>
          <div className="flex items-center text-[#5a6f87] ml-auto">
            <Ellipsis size={22} />
          </div>
        </div>
      ) : (
        <div className="p-[16px] bg-white flex flex-col mb-4">
          <span className="mb-[12px] text-sm text-[#5a6f87]">
            Employers will see you in our database and will be able to offer you
            jobs themselves.
          </span>
          <div className="flex flex-col gap-[6px] text-lg font-medium relative">
            <button className="rounded-lg py-[6px] px-[16px] bg-blue-700 hover:bg-blue-800 text-white cursor-pointer duration-200 transition-all">
              Create profile
            </button>
            <div
              className={clsx(
                "rounded-lg transition-all duration-200",

                showModal ? "bg-blue-600/25 p-[3px]" : "p-[3px] bg-transparent"
              )}
            >
              <button
                onClick={() => setShowModal(!showModal)}
                className={clsx(
                  "flex items-center justify-center gap-2 w-full",
                  "relative rounded-md px-4 py-1.5",
                  "cursor-pointer duration-200 transition-all border",

                  showModal
                    ? "bg-white border-blue-600 text-blue-600"
                    : "bg-white border-blue-600/30 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600"
                )}
              >
                <span className="text-lg font-medium">Enter</span>
                <ArrowRight size={22} />
              </button>

              <div className="absolute justify-center rounded-lg bg-white left-1/2 -translate-x-1/2 w-full">
                {showModal && (
                  <div className="rounded-lg flex flex-col border-[1px] border-[rgba(99,128,166,0.1)] min-w-max duration-200 transition-all c">
                    <Link
                      href="/register?role=applicant"
                      className="py-3 px-4 hover:bg-gray-300/35 flex justify-start border-b-[1px] border-[rgba(99,128,166,0.1)] cursor-pointer"
                    >
                      <span className="text-[#2d3540] font-normal text-[16px] leading-[24px] font-sans whitespace-nowrap">
                        As an applicant
                      </span>
                    </Link>
                    <button className="py-3 px-4 hover:bg-gray-300/35 flex justify-start cursor-pointer">
                      <span className="text-[#2d3540] font-normal text-[16px] leading-[24px] font-sans whitespace-nowrap">
                        As an employer
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button className="rounded-lg py-[6px] px-[16px] text-blue-600 hover:bg-blue-600/10 cursor-pointer duration-200">
              <span className="font-lg">For employer</span>{" "}
            </button>
          </div>
        </div>
      )}
      <div className="h-[1px] my-2 mx-4 bg-black/5"></div>
      <div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              href={item.href}
              key={item.name}
              className={`py-3 px-4 flex items-center justify-start rounded-lg cursor-pointer transition-colors duration-200 
          ${
            isActive
              ? "bg-[#6380A61A] text-blue-700"
              : "hover:bg-[#6380A61A] text-[#2d3540]"
          }
        `}
            >
              <div className="flex flex-row gap-2 items-center">
                <span className={isActive ? "text-blue-700" : "text-blue-600"}>
                  <Icon size={22} />
                </span>
                <span className="font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="h-[1px] my-2 mx-4  bg-black/5"></div>
    </div>
  );
}
