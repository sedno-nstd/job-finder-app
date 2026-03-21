import { FormField } from "@/src/components/ui/base/FormField";
import { SearchSuggestions } from "@/src/components/ui/shared/SearchSuggestions";
import { POPULAR_PROFESSIONS } from "@/src/config/searchOptions";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  placeholder?: string;
}

export function JobTitleFields({ name, placeholder = "title" }: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [isFocused, setIsFocused] = useState(false);
  const value = watch(name) || "";

  const filteredProfession = POPULAR_PROFESSIONS.map((item) => {
    return {
      label: item,
      value: item,
    };
  });

  return (
    <>
      <FormField
        type="text"
        {...register(name)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder={placeholder}
      />
      <SearchSuggestions
        data={filteredProfession}
        isOpen={isFocused}
        isShowOptions={value.length > 2}
        query={value}
        sliceOptions={5}
        setQuery={(val) => {
          setValue(name, val, { shouldValidate: true });
          setIsFocused(false);
        }}
        className="border border-gray-300"
      />
      {errors.name && (
        <span className="text-md font-medium text-red-500">
          {String(errors.name.message)}
        </span>
      )}
    </>
  );
}
