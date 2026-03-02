import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/src/components/ui/FormField";
import { SearchSuggestions } from "@/src/components/ui/SearchSuggestions";
import { POPULAR_PROFESSIONS } from "@/src/config/searchOptions";

interface Props {
  name: string;
}

export function ProfessionField({ name }: Props) {
  const { register, watch, setValue } = useFormContext();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const value = watch(name) || "";
  const options = POPULAR_PROFESSIONS.map((p) => ({ label: p, value: p }));

  return (
    <div className="flex flex-col relative mb-6 w-full">
      <label className="mb-1">Previous position</label>
      <FormField
        {...register(name, {
          onChange: (e) => setShowSuggestions(e.target.value.length > 2),
        })}
        placeholder="Company title"
      />
      <SearchSuggestions
        sliceOptions={5}
        data={options}
        isOpen={showSuggestions}
        query={value}
        isShowOptions={value.length > 2}
        setQuery={(val) => {
          setValue("previousPosition", val, { shouldValidate: true });
          setShowSuggestions(false);
        }}
      />
    </div>
  );
}
