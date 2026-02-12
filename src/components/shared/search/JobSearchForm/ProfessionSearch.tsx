import { Search } from "lucide-react";
import { Input } from "../../../ui/JobSearchForm";
import { SearchHistory } from "../../../ui/SearchHistory";
import { SearchSuggestions } from "../../../ui/SearchSuggestions";
import { useJobSearch } from "../../../../hooks/useJobSearch";
import clsx from "clsx";

type JobSearchReturn = ReturnType<typeof useJobSearch>;

interface LocatioNSearchProps {
  prof: JobSearchReturn["prof"];
  t: JobSearchReturn["t"];
  history: JobSearchReturn["history"];
  isMounted: boolean;
  clear: () => void;
  onSelect: (item: { profession?: string; region?: string }) => void;
  className?: string;
}

export function ProfessionSearch({
  isMounted,
  prof,
  t,
  clear,
  history,
  onSelect,
  className,
}: LocatioNSearchProps) {
  return (
    <div className={clsx("flex flex-col relative w-full h-[48px]", className)}>
      <Input
        value={prof.query}
        onChange={(e) => prof.setQuery(e.target.value)}
        icon={Search}
        onFocus={() => prof.setIsFocused(true)}
        placeholder={isMounted ? t("placeholder") : ""}
        variant="auth"
        className="border-y border-l border-input-border relative focus:border-blue-600 placeholder:text-gray-400 rounded-l-lg b px-[43px]
            "
      />
      {prof.showSuggestions && prof.isFocused ? (
        <div>
          <SearchSuggestions
            sliceOptions={10}
            query={prof.query}
            isShowOptions={prof.showSuggestions}
            isOpen={prof.showSuggestions}
            setQuery={prof.setQuery}
            className="max-w-[816px]"
            data={prof.suggestions}
          />
        </div>
      ) : (
        history.options.length > 0 && (
          <SearchHistory
            data={history.options}
            isOpen={prof.isFocused && prof.query.length === 0}
            setQuery={onSelect}
            isShowOptions
            clear={clear}
          />
        )
      )}
    </div>
  );
}
