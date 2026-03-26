"use client";
import { JoobleLogo } from "@/public/images/userHeader/logo";
import { HeaderNavigation } from "../components/layout/configs/navigation";
import { useEffect, useState } from "react";
import { useOutsideClick } from "../hooks/ui/useOutsideClick";
import { ProfessionSearch } from "../components/shared/search/JobSearchForm/ProfessionSearch";
import { LocatioNSearch } from "../components/shared/search/JobSearchForm/LocationSearch";
import { useJobSearch } from "../hooks/useJobSearch";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { RolePicker } from "../components/search/SideBar/components/RolePicker";

export default function Home() {
  const { data } = useSession();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showRolePicker, setShowRolePicker] = useState(false);
  const profileRef = useOutsideClick(() => setShowProfileModal(false));
  const pickerRef = useOutsideClick<HTMLDivElement>(() =>
    setShowRolePicker(false),
  );
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const { handleSearch, history, loc, prof, selectOption, t, locRef, profRef } =
    useJobSearch();

  useEffect(() => setIsMounted(true), []);

  return (
    <div className="w-full min-h-screen bg-white">
      <header className="w-full flex flex-row justify-between items-center p-4 md:px-10">
        <JoobleLogo height={80} width={120} />
        {data?.user ? (
          <HeaderNavigation
            profileRef={profileRef}
            showProfileModal={showProfileModal}
            setShowProfileModal={setShowProfileModal}
          />
        ) : (
          <div className="relative" ref={pickerRef}>
            <button
              onClick={() => setShowRolePicker(!showRolePicker)}
              className="text-slate-700 font-medium hover:text-blue-600 transition-colors cursor-pointer"
            >
              Enter
            </button>

            {showRolePicker && (
              <div className="absolute right-full mr-20 mt-2 z-50">
                <RolePicker />
              </div>
            )}
          </div>
        )}
      </header>

      <main className="w-full flex flex-col items-center pt-[80px] md:pt-[160px] px-6 pb-[100px]">
        <div className="w-full max-w-[1248px] flex flex-col">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-3xl md:text-5xl text-[#2d3540] leading-tight text-center md:text-left">
              <span className="text-blue-600">Your new job</span>, vacancies
              around all World
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-[700px] text-center md:text-left mx-auto md:mx-0">
              Over 29,400 active job openings from 740 sites available to you.
              Find your new job today.
            </p>
          </div>

          <div
            className={clsx(
              "mt-10 w-full flex flex-col md:flex-row  items-stretch",
              isMounted ? "opacity-100" : "opacity-0",
            )}
          >
            <div ref={profRef} className="flex-[3]">
              <ProfessionSearch
                className="w-full h-[56px]   max-xl:rounded-r-lg md:h-[64px] max-sm:border-r border-gray-400  max-sm:rounded-lg"
                clear={history.clear}
                history={history}
                isMounted={isMounted}
                onSelect={selectOption}
                prof={prof}
                t={t}
                placeholder="What job interests you?"
                borderClassName="rounded-l-lg border-hover:blue-500 border-r"
              />
            </div>

            <div ref={locRef} className="  md:mt-0 items-center">
              <LocatioNSearch
                suggestionClassName="max-w-full md:max-w-[280px]"
                placeholder="City"
                isMounted={isMounted}
                loc={loc}
                t={t}
                className="w-full h-[56px] max-xl:rounded-r-lg max-xl:mb-1  max-xl:rounded-l-lg max-xl:mt-2 md:h-[64px] md:border-l md:border-l-gray-300 max-sm:rounded-lg max-sm:mt-1 max-sm:mb-3"
              />
            </div>

            <button
              onClick={() => {
                handleSearch();
                router.push("/vacancies");
              }}
              className="w-full cursor-pointer md:w-[200px] bg-blue-600 text-white font-semibold 
                         mt-[-1px] lg:mt-0
                         rounded-b-lg md:rounded-bl-none md:rounded-r-lg 
                         hover:bg-blue-700 transition-colors duration-200 
                         h-[56px] md:h-[64px] flex items-center justify-center"
            >
              {isMounted ? t("search") : "Search"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
