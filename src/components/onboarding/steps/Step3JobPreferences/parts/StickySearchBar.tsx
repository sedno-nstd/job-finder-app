import clsx from "clsx";
import { Search } from "lucide-react";

interface Props {
  query: string;
  setQuery: (v: string) => void;
  isSticky: boolean;
}

export function StickySearchBar({ query, setQuery, isSticky }: Props) {
  return (
    <div
      className={clsx(
        "z-20 bg-white px-6 py-2 -mx-0 overflow-y-auto sticky top-0 ",
        isSticky &&
          "border-b border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]",
      )}
    >
      <div className="relative border border-input-border flex h-[40px] rounded-lg transition-shadow focus-within:shadow-md">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full pl-10 pr-4 outline-none text-base text-main rounded-md focus:border-blue-500 transition-all"
          placeholder="Search jobs..."
        />
        <Search size={20} className="absolute top-2 left-2 text-gray-400" />
      </div>
    </div>
  );
}
