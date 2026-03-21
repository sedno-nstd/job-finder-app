import { MultiSelectionGrid } from "@/src/components/shared/FormField/MultiSelectionGrid";
import { SelectedItemsList } from "@/src/components/shared/FormField/SelectedItemsList";
import { FormField } from "@/src/components/ui/base/FormField";
import { stacks } from "@/src/domain/vacancy/types";
import { useMultiSelect } from "@/src/hooks/forms/useMultiSelect";
import { useAutocomplete } from "@/src/hooks/vacancy/useAutocomplete";
import { Search } from "lucide-react";
import { useMemo } from "react";

interface Props {
  name: string;
}

export function StackField({ name }: Props) {
  const { handleRemove, handleSelect, selectedItems, error } = useMultiSelect({
    name,
  });

  const allOptions = stacks.flat().map((item) => {
    return {
      value: item,
      label: item,
    };
  });

  const availableOptions = useMemo(
    () => allOptions.filter((option) => !selectedItems.includes(option.value)),
    [allOptions, selectedItems],
  );

  const { query, setQuery, suggestions } = useAutocomplete({
    data: availableOptions,
    count: allOptions.length,
  });

  return (
    <>
      <SelectedItemsList data={selectedItems} onRemove={handleRemove} />

      <FormField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        searchIcon={Search}
      />
      <div className="m-2">
        {error && <p className="text-red-500 text-xs">{String(error)}</p>}
      </div>
      {selectedItems.length >= 15 && (
        <div className="mb-6 ml-1">
          <span className="text-red-500 text-sm font-medium">
            Max length is 15!
          </span>
        </div>
      )}

      <MultiSelectionGrid
        className="h-[350px]"
        data={suggestions}
        handleSelect={handleSelect}
        query={query}
        setQuery={setQuery}
      />
    </>
  );
}
