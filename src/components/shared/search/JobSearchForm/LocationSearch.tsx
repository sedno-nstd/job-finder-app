import { MapPin } from "lucide-react";
import { Input } from "../../../ui/JobSearchForm";
import { SearchSuggestions } from "../../../ui/SearchSuggestions";
import { useJobSearch } from "./useJobSearch";

type JobSearchReturn = ReturnType<typeof useJobSearch>;

interface LocatioNSearchProps {
  loc: JobSearchReturn["loc"];
  t: JobSearchReturn["t"];
  isMounted: boolean;
}

export function LocatioNSearch({ isMounted, loc, t }: LocatioNSearchProps) {
  return (
    <div className="flex flex-col lg:w-[280px] relative">
      <div className="w-full">
        <Input
          icon={MapPin}
          placeholder={isMounted ? t("placeholder") : ""}
          variant="auth"
          value={loc.query}
          onChange={(e) => loc.setQuery(e.target.value)}
          onFocus={() => loc.setIsFocused(true)}
          className="border border-input-border relative focus:border-blue-600 placeholder:text-gray-400 px-[43px]"
        />
      </div>
      <div className="w-full">
        <SearchSuggestions
          sliceOptions={5}
          isShowOptions={loc.showSuggestions}
          data={loc.suggestions}
          isOpen={loc.isFocused}
          query={loc.query}
          setQuery={loc.setQuery}
        />
      </div>
    </div>
  );
}
