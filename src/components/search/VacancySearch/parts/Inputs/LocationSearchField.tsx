import { Input } from "@/src/components/ui/search/JobSearchForm";
import { SearchHistory } from "@/src/components/ui/search/SearchHistory";
import { SearchSuggestions } from "@/src/components/ui/shared/SearchSuggestions";
import { useUserHistory } from "@/src/hooks/user/useUserHistory";
import { TFunction } from "i18next";
import { MapPin, X } from "lucide-react";

interface Suggestions {
  label: string;
  value: string;
}

interface LocationState {
  query: string;
  setQuery: (val: string) => void;
  suggestions: Suggestions[];
  isFocused: boolean;
  setIsFocused: (val: boolean) => void;
  showSuggestions: boolean;
}

interface LocationSearchFieldProps {
  loc: LocationState;
  t: TFunction;
  isMounted: boolean;
  isMobile?: boolean;
  locationQuery: string;
}

export function LocationSearchField({
  isMounted,
  loc,
  locationQuery,
  t,
  isMobile,
}: LocationSearchFieldProps) {
  const history = useUserHistory();
  return (
    <>
      <Input
        onFocus={() => loc.setIsFocused(true)}
        onChange={(e) => loc.setQuery(e.target.value)}
        value={loc.query}
        placeholder={isMounted ? t("location") : ""}
        variant="vacancy"
        icon={MapPin}
        icon2={locationQuery.length <= 0 ? undefined : X}
        icon2ClassName={
          loc.query.length > 0
            ? "text-gray-400 hover:text-black hover:bg-[#6380a61a]"
            : "text-blue-600"
        }
        onReset={() => loc.setQuery("")}
        className={isMobile ? "w-full max-w-[640px] border" : "w-full"}
      />
      <SearchSuggestions
        sliceOptions={10}
        query={loc.query}
        isShowOptions={loc.showSuggestions}
        isOpen={loc.showSuggestions}
        setQuery={loc.setQuery}
        className="max-w-[816px] text-main"
        data={loc.suggestions}
      />
    </>
  );
}
