import clsx from "clsx";

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
  if (!data || data.length === 0 || query.trim() === "") return null;

  return (
    <div>
      {isOpen && isShowOptions && (
        <div
          className={clsx(
            "absolute top-full mt-1 z-10 border-[0.5] border-gray-300 flex-col w-full flex items-center bg-white",
            className,
          )}
        >
          {data.slice(0, sliceOptions).map((item) => {
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
          })}
        </div>
      )}
    </div>
  );
}
