import clsx from "clsx";
import { useState } from "react";
import { SortType } from "../constans/type";

interface Props {
  sortType: SortType;
  setSortBy: (val: SortType) => void;
  className?: string;
}

export function SortSelector({ setSortBy, sortType, className }: Props) {
  const [isSortOpen, setIsSortOpen] = useState(false);

  return (
    <div
      className={clsx(
        "relative w-[125px] select-none flex items-center gap-2 h-full ml-auto",
        className,
      )}
    >
      <span className="text-gray-400 text-sm w-fit shrink-0 font-medium">
        Sort by:
      </span>
      <div
        onClick={() => setIsSortOpen(!isSortOpen)}
        className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition-all"
      >
        <span className="text-sm font-bold text-main border-b border-dotted border-main">
          {sortType === "newest" ? "Newest" : "Latest"}
        </span>
      </div>

      {isSortOpen && (
        <div className="absolute top-8 right-0 z-20 bg-white border border-gray-200 shadow-xl rounded-lg py-2 w-32 animate-in fade-in zoom-in duration-200">
          <div
            onClick={() => {
              setSortBy("newest");
              setIsSortOpen(false);
            }}
            className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${sortType === "newest" ? "text-blue-600 font-bold" : "text-gray-700"}`}
          >
            Newest
          </div>
          <div
            onClick={() => {
              setSortBy("latest");
              setIsSortOpen(false);
            }}
            className={clsx(
              `px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${sortType === "latest" ? "text-blue-600 font-bold" : "text-gray-700"}`,
            )}
          >
            Latest
          </div>
        </div>
      )}
    </div>
  );
}
