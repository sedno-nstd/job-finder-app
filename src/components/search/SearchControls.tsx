import { useSearchStore } from "@/src/store/useSearchStore";
import { useMemo, useRef, useState } from "react";
import { Search, MapPin, X } from "lucide-react";
import { vacancies } from "@/src/domain/vacancy/types";
import clsx from "clsx";

export function SearchControll() {
  const {
    setSearchQuery,
    triggerSearch,
    setLocationQuery,
    focusedField,
    setFocusedField,
  } = useSearchStore();
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

  console.log(location);

  return (
    <div className="flex flex-row rounded-xl justify-between bg-white w-full mb-3 ">
      <div className="flex flex-row">
        <div
          className={clsx(
            "flex flex-row items-center relative w-[436px] h-[56px] rounded-xl duration-200",
            "ring-0 ring-transparent",
            "focus-within:ring-2 focus-within:ring-blue-600 focus-within:shadow-sm",
            "hover:not-focus-within:ring-1 hover:not-focus-within:ring-blue-500/90"
          )}
        >
          <Search
            size={22}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 pointer-events-none"
          />
          <input
            type="text"
            value={search}
            placeholder="I search vacancies..."
            className=" pr-10 pl-12 rounded flex-1 h-full outline-0"
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
              setFocusedField("search");
            }}
            onFocus={() => {
              setFocusedField("search");
            }}
            onBlur={() => {
              setTimeout(() => {
                const currentFocus = useSearchStore.getState().focusedField;
                if (currentFocus === "search") {
                  setFocusedField(null);
                }
              }, 200);
            }}
          />
          {search && focusedField === "search" && (
            <button
              onClick={() => {
                setSearch("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 text-[#a1afc1] hover:text-black/80 transition-all rounded-md"
            >
              <X size={22} className="" />
            </button>
          )}{" "}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full pt-6 left-0 w-[450px]">
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
            </div>
          )}
        </div>
        <div className="bg-[#a1afc1] w-[1px] h-full mx-1"></div>
        <div
          className={clsx(
            "flex flex-row items-center w-[436px] pl-2 rounded-xl relative duration-200",
            "ring-0 ring-transparent",
            "focus-within:ring-2 focus-within:ring-blue-600 focus-within:shadow-sm",
            "hover:not-focus-within:ring-1 hover:not-focus-within:ring-blue-500/90"
          )}
        >
          <MapPin size={22} className="text-gray-400" />
          <input
            type="text"
            value={location}
            placeholder="In the region..."
            className="py-1 pl-3 rounded flex-1 h-full outline-none bg-transparent"
            onChange={(e) => setLocation(e.target.value)}
            ref={locationInputRef}
            onFocus={() => {
              setShowSuggestions(false);
              setFocusedField("location");
            }}
            onBlur={() => {
              const currentFocus = useSearchStore.getState().focusedField;
              if (currentFocus === "location") {
                setFocusedField(null);
              }
            }}
          />

          {location && focusedField === "location" && (
            <button
              onMouseDown={() => {
                setLocation("");
                console.log("reset-location");
              }}
              className="absolute z-50 right-3 top-1/2 -translate-y-1/2 p-2 flex items-center justify-center hover:bg-gray-100 cursor-pointer text-[#a1afc1] hover:text-black/80 duration-200 transition-all rounded-md"
            >
              <X size={22} />
            </button>
          )}
        </div>
        <div className="flex items-center pr-2 py-1 pl-2 ">
          <button
            className="max-h-[40px] cursor-pointer bg-[#0B64D9] hover:bg-[#0A58BF] duration-200 transition-all text-white px-3 rounded-lg h-full font-semibold"
            onClick={() => {
              setSearchQuery(search);
              setLocationQuery(location);
              triggerSearch();
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
