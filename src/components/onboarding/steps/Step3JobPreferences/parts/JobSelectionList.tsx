import { POPULAR_PROFESSIONS } from "@/src/config/searchOptions";
import { selectButtons } from "../../../helpers/helper";
import clsx from "clsx";
import { useMemo, useState } from "react";

interface Props {
  joobs: string[];
  selectProfession: (v: string) => void;
  query: string;
}

export function JobSelectionList({ joobs, query, selectProfession }: Props) {
  const vacancySearch = useMemo(() => {
    return POPULAR_PROFESSIONS.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const [visibleVacancies, setVisibleVacancies] = useState(5);

  return (
    <div
      className="
    max-sm:w-full max-sm:overflow-y-auto max-sm:flex-1  max-sm:overscroll-behavior
    
    "
    >
      {vacancySearch.length > 0 ? (
        <div className="px-6">
          {query.length >= 2 ? (
            <div className="py-2">
              {vacancySearch.map((job, index) => {
                const isSelected = joobs.includes(job);
                return (
                  <div
                    className="flex flex-col mb-3 
                    lg:items-start lg:justify-cetner 
                    max-sm:text-center 
                    "
                    key={index}
                  >
                    <button
                      className={clsx(
                        "w-full sm:w-auto px-4 py-2.5 transition-all text-center sm:text-left",
                        " md:text-sm sm:text-sm max-sm:text-sm",
                        selectButtons(isSelected),
                      )}
                      type="button"
                      onClick={() => selectProfession(job)}
                    >
                      {job}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col relative">
              <span
                className="text-secondary mb-4 mt-4
               sm:text-base
              "
              >
                Popular
              </span>
              <div className="flex flex-col">
                {POPULAR_PROFESSIONS.slice(0, visibleVacancies).map(
                  (job, index) => {
                    const isSelected = joobs.includes(job);
                    return (
                      <div className="mb-4" key={index}>
                        <button
                          className={clsx(
                            "w-full sm:w-auto px-4 py-3 transition-all",
                            "text-center sm:text-left",
                            "text-lg sm:text-sm",
                            selectButtons(isSelected),
                          )}
                          type="button"
                          onClick={() => {
                            selectProfession(job);
                          }}
                        >
                          {job}
                        </button>
                      </div>
                    );
                  },
                )}
              </div>
              <div className="w-full flex flex-row justify-center items-center">
                {visibleVacancies > 5 ? (
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => setVisibleVacancies((prev) => prev + 5)}
                      type="button"
                      className="px-6 py-1 mb-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 cursor-pointer text-sm font-semibold transition-all border border-slate-200 active:scale-95
                       w-[200px] md:w-[250px] lg:w-[150px]
                      "
                    >
                      More
                    </button>
                    <button
                      onClick={() => setVisibleVacancies((prev) => (prev = 5))}
                      type="button"
                      className="px-6 py-1 mb-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 cursor-pointer text-sm font-semibold transition-all border border-slate-200 active:scale-95
                       w-[200px] md:w-[250px] lg:w-[150px]
                      "
                    >
                      less
                    </button>
                  </div>
                ) : (
                  <div className="">
                    <button
                      onClick={() => setVisibleVacancies((prev) => prev + 5)}
                      type="button"
                      className="px-2 py-1 mb-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 cursor-pointer text-sm font-semibold transition-all border border-slate-200 active:scale-95
                      w-[200px] md:w-[250px] lg:w-[150px]
                      "
                    >
                      More
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center py-4 text-main">
          <span className="text-lg font-semibold">Result is empty</span>
        </div>
      )}
    </div>
  );
}
