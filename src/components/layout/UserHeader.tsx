"use client";
import Image from "next/image";
import { Heart, MessageSquare, User, Bell, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LocatioNSearch } from "../shared/search/JobSearchForm/LocationSearch";
import { ProfessionSearch } from "../shared/search/JobSearchForm/ProfessionSearch";
import { useJobSearch } from "../shared/search/JobSearchForm/useJobSearch";

const ACTIONS = [
  {
    id: "chats",
    icon: MessageSquare,
    hasLink: true,
    href: "/chats",
    label: "Chats",
  },
  { id: "saved", icon: Heart, hasLink: true, href: "/saved", label: "Saved" },
  {
    id: "profile",
    icon: User,
    hasLink: false,
    href: "",
    label: "Profile",
  },
];

const ProfileMopdalOptions = [{ label: "Theme", value: "theme" }];
export function UserHeader() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const [showProfileModal, setShowProfileModal] = useState(false);

  const { handleSearch, history, loc, prof, selectOption, t, locRef, profRef } =
    useJobSearch();
  useEffect(() => setIsMounted(true), []);

  return (
    <div className="max-h-[80px] text-main mt-2 mx-2 mb-1 flex flex-row items-center w-full">
      <div className="flex mx-8">
        <Image
          src="/images/HeaderNavigation/logo.png"
          width={120}
          height={50}
          alt="logo"
        />
      </div>
      <div className="flex flex-row">
        <div ref={profRef}>
          <ProfessionSearch
            clear={history.clear}
            history={history}
            isMounted={isMounted}
            onSelect={selectOption}
            prof={prof}
            t={t}
          />
        </div>
        <div ref={locRef}>
          <LocatioNSearch isMounted={isMounted} loc={loc} t={t} />
        </div>
        <div className="h-[48px]">
          <button
            onClick={() =>
              selectOption({
                profession: prof.query,
                region: loc.query,
              })
            }
            className="text-white py-[11px] px-[16px] bg-blue-600 rounded-r-lg hover:bg-blur-700 cursor-pointer font-medium h-full"
          >
            {isMounted ? t("search") : ""}
          </button>
        </div>
      </div>
      <div className="flex flex-1 items-center shrink-0">
        <div className="flex flex-row px-5 items-center relative">
          {ACTIONS.map((item) => (
            // <Link
            //   key={item.id}
            //   href={item.hasLink ? item.href : setIsShow(!isSHow)}
            //   onClick={(e) => {
            //     e.preventDefault()
            //   }}
            //   className="p-3 hover:bg-[#6380a61a] rounded-lg relative flex flex-row gap-2 text-[#5a6f87] hover:text-[#2d3540] font-medium"
            // >
            //   <item.icon size={24} className="" />
            //   <span>{item.label}</span>
            // </Link>
            <button
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                item.hasLink
                  ? router.push(item.href)
                  : setShowProfileModal(!showProfileModal);
              }}
              className="p-3 hover:bg-[#6380a61a] rounded-lg relative flex flex-row gap-2 text-[#5a6f87] hover:text-[#2d3540] font-medium"
            >
              <item.icon size={24} className="" />
              <span>{item.label}</span>
            </button>
          ))}
          {showProfileModal && (
            <div className="absolute left-1/2 text-main top-full justify-center items-center bg-white rounded-lg py-2 flex flex-col w-full max-w-[248px]">
              {ProfileMopdalOptions.map((item) => (
                <div key={item.value} className="font-medium">
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="h-8 w-0.5 my-2 mx-4 rounded-sm opacity-50 bg-[rgba(99,128,166,0.3)]"></div>
        <div className="flex items-center gap-8 ml-5 pr-4">
          <Bell
            size={22}
            className="text-[#5a6f87] hover:text-[#2d3540] cursor-pointer m-2"
          />
          <Menu
            size={22}
            className="text-[#5a6f87] hover:text-[#2d3540] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
