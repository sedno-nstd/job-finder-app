import { Input } from "@/src/components/ui/search/JobSearchForm";
import { SearchHistory } from "@/src/components/ui/search/SearchHistory";
import { SearchSuggestions } from "@/src/components/ui/shared/SearchSuggestions";
import { useUserHistory } from "@/src/hooks/user/useUserHistory";
import { TFunction } from "i18next";
import { Mic, Search, X } from "lucide-react";

interface Suggestions {
  label: string;
  value: string;
}

interface ProfessionState {
  query: string;
  setQuery: (val: string) => void;
  suggestions: Suggestions[];
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  showSuggestions: boolean;
}

interface ProfessionSearchFieldProps {
  prof: ProfessionState;
  t: TFunction;
  isMounted: boolean;
  isMobile?: boolean;
  selectOption: (item: { profession?: string; region?: string }) => void;
  handleVoiceAppend: () => void;
}

export function ProfSearchField({
  isMounted,
  handleVoiceAppend,
  selectOption,
  prof,
  t,
  isMobile,
}: ProfessionSearchFieldProps) {
  const history = useUserHistory();

  return (
    <>
      <Input
        icon2Function={() => handleVoiceAppend()}
        value={prof.query}
        onChange={(e) => prof.setQuery(e.target.value)}
        onFocus={() => prof.setIsFocused(true)}
        placeholder={isMounted ? t("placeholder") : ""}
        variant="vacancy"
        icon={Search}
        icon2={prof.query.length <= 0 ? Mic : X}
        icon2ClassName={
          prof.query.length <= 0
            ? "text-blue-600 hover:bg-blue-100/50 max-xl:hidden"
            : "text-gray-400 hover:text-black hover:bg-[#6380a61a]  max-xl:hidden"
        }
        onReset={() => prof.setQuery("")}
        className={isMobile ? "w-full max-w-[640px] border" : "w-full"}
      />
      {prof.showSuggestions && prof.isFocused ? (
        <div>
          <SearchSuggestions
            sliceOptions={10}
            query={prof.query}
            isShowOptions={prof.showSuggestions}
            isOpen={prof.showSuggestions}
            setQuery={prof.setQuery}
            className="max-w-[816px] text-main"
            data={prof.suggestions}
          />
        </div>
      ) : (
        history.options.length > 0 && (
          <SearchHistory
            data={history.options}
            isOpen={prof.isFocused && prof.query.length === 0}
            setQuery={selectOption}
            isShowOptions={prof.isFocused && prof.query.length === 0}
            clear={history.clear}
          />
        )
      )}
    </>
  );
}
