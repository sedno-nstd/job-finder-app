import clsx from "clsx";
import { Search } from "lucide-react";

interface Idata {
  label: string;
  value: string;
}

interface Props {
  className?: string;
  query: string;
  setQuery: (value: string) => void;
  data: Idata[];
  isOpen: boolean;
  isShowOptions: boolean;
  sliceOptions: number;
}

export function SearchSuggestions({
  data,
  className,
  setQuery,
  isOpen,
  isShowOptions,
  query,
  sliceOptions = 5,
}: Props) {
  const filtered = data
    .filter((item) =>
      item.label?.toLowerCase().includes(query?.toLowerCase().trim()),
    )
    .slice(0, sliceOptions);

  if (!data || data.length === 0 || query?.trim() === "") return null;

  return (
    <div>
      {isOpen && isShowOptions && (
        <div
          className={clsx(
            "absolute top-full mt-1 z-10  flex-col w-full flex items-center bg-white",
            className && query.length > 0 && "border-gray-300 border-[0.5] ",
          )}
        >
          {filtered.length > 0 ? (
            filtered.map((item) => {
              const regex = new RegExp(`(${query})`, "gi");

              const parts = item.label.split(regex);

              return (
                <div
                  className="hover:bg-[#E9F3FE80] p-2 w-full cursor-pointer"
                  key={item.value}
                  onClick={(e) => {
                    e.preventDefault();
                    setQuery(item.label);
                  }}
                >
                  <span className="font-normal  block text-[13px] leading-5 font-sans">
                    {parts.map((part, i) =>
                      part.toLowerCase() === query.toLowerCase() ? (
                        <span className="font-bold" key={i}>
                          {part}
                        </span>
                      ) : (
                        part
                      ),
                    )}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="w-full py-8 flex flex-col justify-center items-center opacity-60 animate-in fade-in duration-500">
              <div className="p-4 bg-gray-100 rounded-full mb-3">
                <Search size={32} className="text-gray-400" />
              </div>

              <span className="text-lg font-semibold text-gray-500">
                No matches found
              </span>

              <p className="text-sm text-gray-400 max-w-[200px] text-center mt-1 truncate">
                We couldn't find "{query}". <br /> Check for typos.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
