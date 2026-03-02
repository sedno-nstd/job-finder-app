import clsx from "clsx";
import { Search } from "lucide-react";

interface Props {
  className?: string;
  data: {
    label: string;
    value: string;
  }[];
  handleSelect: (value: string) => void;
  query: string;
  setQuery: (value: string) => void;
  emptyDescription?: string;
}

export function MultiSelectionGrid({
  className,
  data,
  query,
  setQuery,
  handleSelect,
  emptyDescription,
}: Props) {
  return (
    <div
      className={clsx(
        "w-full custom-scrollbar gap-2 flex flex-col mt-2 overflow-auto",
        className,
      )}
    >
      {data.length <= 0 ? (
        <div className="w-full h-full flex flex-col justify-center items-center opacity-60 animate-in fade-in duration-500">
          <div className="p-4 bg-gray-100 rounded-full mb-3">
            <Search size={32} className="text-gray-400" />
          </div>

          <span className="text-lg font-semibold text-gray-500">
            {query.length > 0 ? "No matches found" : "Start typing..."}
          </span>

          <div className="text-sm text-gray-400 max-w-[220px] text-center mt-1">
            {query.length > 0 ? (
              <p className="line-clamp-2">
                We couldn't find{" "}
                <span className="font-medium text-gray-600 italic truncate">
                  "{query}"
                </span>
                . Check for typos.
              </p>
            ) : (
              <p>{emptyDescription}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-2 flex-col">
          {data.map((item) => (
            <div
              key={item.value}
              className="px-4 py-2 bg-gray-50 border  rounded-lg cursor-pointer 
                 hover:bg-blue-50 hover:border-blue-200  border-gray-300
                 transition-all duration-200 flex items-center justify-between group"
              onClick={() => {
                handleSelect(item.value);
                setQuery("");
              }}
            >
              <span className="text-sm text-gray-700 select-none group-hover:text-blue-700 font-medium">
                {item.label}
              </span>
              <span className="text-gray-400 select-none group-hover:text-blue-500 text-xs">
                Add
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
