"use client";
import { MapPin, Mic, Search, X } from "lucide-react";
import { Input } from "../ui/JobSearchForm";
import { useTranslation } from "react-i18next";
import { useJobSearch } from "@/src/hooks/useJobSearch";
import { useSearchStore } from "@/src/store/useSearchStore";
import { SearchSuggestions } from "../ui/SearchSuggestions";
import { useEffect, useState } from "react";
import { useUserHistory } from "@/src/hooks/useUserHistory";
import { SearchHistory } from "../ui/SearchHistory";

export function VacancySearch() {
  const { prof, loc, locRef, profRef, history, selectOption } = useJobSearch();
  const { locationQuery, triggerSearch } = useSearchStore();
  const { options, clear } = useUserHistory();
  const { t } = useTranslation("common");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  return (
    <div className="flex flex-row w-full bg-white h-[56px] items-center text-white rounded-lg">
      <div className="relative h-full" ref={profRef}>
        <Input
          value={prof.query}
          onChange={(e) => prof.setQuery(e.target.value)}
          onFocus={() => prof.setIsFocused(true)}
          placeholder={isMounted ? t("placeholder") : ""}
          variant="vacancy"
          icon={Search}
          icon2={prof.query.length <= 0 ? Mic : X}
          icon2ClassName={
            prof.query.length <= 0
              ? "text-blue-600 hover:bg-blue-100/50"
              : "text-gray-400 hover:text-black hover:bg-[#6380a61a] "
          }
          className="w-[436px]  h-full"
        />
        {prof.showSuggestions && prof.isFocused ? (
          <div>
            <SearchSuggestions
              sliceOptions={10}
              query={prof.query}
              isShowOptions={prof.showSuggestions}
              isOpen={prof.showSuggestions}
              setQuery={prof.setQuery}
              className="max-w-[816px] text-main"
              data={prof.suggestions}
            />
          </div>
        ) : (
          history.options.length > 0 && (
            <SearchHistory
              data={history.options}
              isOpen={prof.isFocused && prof.query.length === 0}
              setQuery={selectOption}
              isShowOptions={prof.isFocused && prof.query.length === 0}
              clear={history.clear}
            />
          )
        )}
      </div>
      <div className="mx-1.5 min-w-[1px] z-10 py-0.5 bg-gray-400/70 h-full max-h-[37px] w-[1px]"></div>
      <div className="relative h-full" ref={locRef}>
        <Input
          onFocus={() => loc.setIsFocused(true)}
          onChange={(e) => loc.setQuery(e.target.value)}
          value={loc.query}
          placeholder={isMounted ? t("location") : ""}
          variant="vacancy"
          icon={MapPin}
          icon2={locationQuery.length <= 0 ? undefined : X}
          icon2ClassName={
            locationQuery.length > 0
              ? "text-gray-400 hover:text-black hover:bg-[#6380a61a]"
              : ""
          }
          className="w-[436px] h-full"
        />
        <SearchSuggestions
          sliceOptions={5}
          isShowOptions={loc.showSuggestions}
          data={loc.suggestions}
          isOpen={loc.isFocused}
          query={loc.query}
          setQuery={loc.setQuery}
          className="text-main"
        />
      </div>
      <button
        onClick={() => triggerSearch()}
        className="p-2 m-2 bg-blue-600 rounded-lg cursor-pointer hover:bg-blue-700 ml-2"
      >
        <span className="font-medium">{isMounted ? t("search") : ""}</span>
      </button>
    </div>
  );
}
