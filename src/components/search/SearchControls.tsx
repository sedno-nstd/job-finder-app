import { useSearchStore } from "@/app/store/useSearchStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { Search, MapPin } from "lucide-react";
import { vacancies } from "@/app/search/domain/vacancy/types";
import clsx from "clsx";

export function SearchControll() {
  const { setSearchQuery, triggerSearch } = useSearchStore();
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [location, setLocation] = useState("");
  const locationInputRef = useRef<HTMLInputElement>(null);

  const suggestions = useMemo(() => {
    if (search.length < 1) return [];

    return vacancies
      .map((v) => v.title)
      .filter(
        (title, index, self) =>
          title.toLowerCase().includes(search.toLowerCase()) &&
          self.indexOf(title) === index
      )
      .slice(0, 5);
  }, [search]);

  const selectSuggestion = (value: string) => {
    setSearch(value);
    setSearchQuery(value);

    locationInputRef.current?.focus();
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-row rounded-xl justify-between bg-white w-full mb-3 ">
      <div className="flex flex-row">
        <div
          className={clsx(
            "flex flex-row items-center relative w-[436px] h-[56px] pl-4 border-2 hover:border-blue-500 border-transparent hover:border-[1px] focus-within:border-blue-500 rounded-xl transition-all duration-200"
          )}
        >
          <Search
            size={22}
            className=" text-gray-400 group-focus-within:text-blue-500"
          />
          <input
            type="text"
            value={search}
            placeholder="I search vacancies..."
            className="py-1 pl-3 pr-5 rounded flex-1 h-full outline-0"
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
          />
          <div className="absolute top-full pt-6 left-0 w-[450px]">
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute left-0 w-full bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden py-2">
                <ul className="flex flex-col">
                  {suggestions.map((title, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 p-4 hover:bg-blue-50 cursor-pointer transition-colors border-b last:border-0 border-gray-50"
                      onClick={() => selectSuggestion(title)}
                    >
                      <Search size={22} className="text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">
                        {title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="bg-[#a1afc1] w-[1px] h-full mx-1"></div>
        <div className="flex flex-row items-center w-[436px] pl-2 border-2 border-transparent hover:border-blue-500 hover:border-[1px] focus-within:border-blue-500 rounded-xl transition-all duration-200">
          <MapPin size={22} className="text-gray-400" />
          <input
            type="text"
            value={location}
            placeholder="In the region..."
            className="py-1 pl-3 rounded flex-1 h-full outline-none bg-transparent"
            onChange={(e) => setLocation(e.target.value)}
            ref={locationInputRef}
            onFocus={() => setShowSuggestions(false)}
          />
        </div>
      </div>
      <div>
        <button
          className="cursor-pointer bg-[#0B64D9] hover:bg-[#0A58BF] duration-200 transition-all text-white px-3 rounded-md h-full font-semibold"
          onClick={() => triggerSearch()}
        >
          Search
        </button>
      </div>
    </div>
  );
}
