import { MapPin } from "lucide-react";
import { Input } from "../../../ui/JobSearchForm";
import { SearchSuggestions } from "../../../ui/SearchSuggestions";
import { useJobSearch } from "../../../../hooks/useJobSearch";
import clsx from "clsx";

type JobSearchReturn = ReturnType<typeof useJobSearch>;

interface LocatioNSearchProps {
  loc: JobSearchReturn["loc"];
  t: JobSearchReturn["t"];
  isMounted: boolean;
  className?: string;
  placeholder?: string;
  suggestionClassName?: string;
}

export function LocatioNSearch({
  isMounted,
  loc,
  t,
  className,
  placeholder,
  suggestionClassName,
}: LocatioNSearchProps) {
  return (
    <div
      className={clsx(
        "flex flex-col lg:w-[280px] relative w-full h-full",
        className,
      )}
    >
      <div className="w-full">
        <Input
          icon={MapPin}
          placeholder={
            isMounted ? placeholder || t("profession_placeholder") : ""
          }
          variant="auth"
          value={loc.query}
          onChange={(e) => loc.setQuery(e.target.value)}
          onFocus={() => loc.setIsFocused(true)}
          className={clsx(
            "border border-input-border relative focus:border-blue-600 placeholder:text-gray-400 px-[43px]",
            className,
          )}
        />
      </div>
      <div className="w-full">
        <SearchSuggestions
          className={suggestionClassName}
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
