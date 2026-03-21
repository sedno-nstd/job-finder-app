import { POPULAR_PROFESSIONS } from "@/src/config/searchOptions";
import { useMemo } from "react";
import { SelectedItemsList } from "@/src/components/shared/FormField/SelectedItemsList";
import { useMultiSelect } from "@/src/hooks/forms/useMultiSelect";
import { MultiSelectionGrid } from "@/src/components/shared/FormField/MultiSelectionGrid";
import { FormField } from "@/src/components/ui/base/FormField";
import { Search } from "lucide-react";
import { useAutocomplete } from "@/src/hooks/vacancy/useAutocomplete";

interface Props {
  name: string;
}

const PROFESSION_OPTIONS = POPULAR_PROFESSIONS.map((item) => ({
  label: item,
  value: item,
}));

export function JobSelectionList({ name }: Props) {
  const { error, handleRemove, handleSelect, selectedItems } = useMultiSelect({
    name,
  });

  const availableOptions = useMemo(
    () =>
      PROFESSION_OPTIONS.filter((opt) => !selectedItems.includes(opt.value)),
    [selectedItems],
  );

  const { query, setQuery, suggestions } = useAutocomplete({
    data: availableOptions,
    count: PROFESSION_OPTIONS.length,
  });
  return (
    <div className="w-full flex flex-col h-full">
      <SelectedItemsList data={selectedItems} onRemove={handleRemove} />

      <FormField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        searchIcon={Search}
        placeholder="Search..."
      />
      <div className="m-2">
        {error && <p className="text-red-500 text-xs">{String(error)}</p>}
      </div>
      {selectedItems.length >= 20 && (
        <div className="mb-6 ml-1">
          <span className="text-red-500 text-sm font-medium">
            Max length is 15!
          </span>
        </div>
      )}
      <MultiSelectionGrid
        data={suggestions}
        handleSelect={handleSelect}
        query={query}
        setQuery={setQuery}
        emptyDescription=""
      />
    </div>
  );
}
