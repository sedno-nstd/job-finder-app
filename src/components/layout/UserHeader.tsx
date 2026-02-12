"use client";
import { Bell, Menu, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LocatioNSearch } from "../shared/search/JobSearchForm/LocationSearch";
import { ProfessionSearch } from "../shared/search/JobSearchForm/ProfessionSearch";
import { useJobSearch } from "../../hooks/useJobSearch";
import { JoobleLogo } from "@/public/images/userHeader/logo";
import { useOutsideClick } from "@/src/hooks/useOutsideClick";
import { HeaderNavigation } from "./configs/navigation";

export function UserHeader() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const profileRef = useOutsideClick<HTMLDivElement>(() =>
    setShowProfileModal(false),
  );

  const { handleSearch, history, loc, prof, selectOption, t, locRef, profRef } =
    useJobSearch();

  useEffect(() => setIsMounted(true), []);

  return (
    <div
      className="max-h-[80px] relative text-main py-4 flex flex-row items-center w-full
    max-lg:px-2 max-lg:h-[56px] lg:h-[80px]
    "
    >
      <div className="lg:hidden absolute m-2 ">
        <ArrowLeft className="text-gray-400" size={22} />
      </div>
      <div className="lg:hidden right-2 absolute m-2 ">
        <Bell className="text-gray-400" size={22} />
      </div>
      <div className="flex ml-4 w-full lg:justify-center max-lg:justify-center">
        <JoobleLogo height={36} width={108} />
      </div>
      <div className="flex flex-row max-lg:hidden">
        <div ref={profRef}>
          <ProfessionSearch
            className="lg:w-[820px] max-lg:w-[600px] md:w-[230px]"
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
            onClick={() => {
              handleSearch();
              router.push("/vacancies");
            }}
            className="text-white py-[11px] px-[16px] bg-blue-600 rounded-r-lg hover:bg-blur-700 cursor-pointer font-medium h-full"
          >
            {isMounted ? t("search") : ""}
          </button>
        </div>
      </div>
      <div
        className="flex items-center shrink-0
      max-lg:hidden
      "
      >
        <HeaderNavigation
          profileRef={profileRef}
          setShowProfileModal={setShowProfileModal}
          showProfileModal={showProfileModal}
        />
        <div className="h-8 w-0.5 my-2 mx-4 rounded-sm opacity-50 bg-[rgba(99,128,166,0.3)]"></div>
        <div className="flex items-center gap-8 ml-5 pr-4">
          <div className="p-3 hover:bg-[#6380a61a] rounded-lg duration-200 transition-colors cursor-pointer ">
            <Bell
              size={22}
              className="text-[#5a6f87] hover:text-[#2d3540] cursor-pointer"
            />
          </div>
          <div className="p-3 hover:bg-[#6380a61a] rounded-lg duration-200 transition-colors cursor-pointer">
            <Menu
              size={22}
              className="text-[#5a6f87] hover:text-[#2d3540]  cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
