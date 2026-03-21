import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/src/components/ui/base/FormField";
import { SearchSuggestions } from "@/src/components/ui/shared/SearchSuggestions";
import { POPULAR_PROFESSIONS } from "@/src/config/searchOptions";
import clsx from "clsx";

interface Props {
  name: string;
  label?: string;
  className?: string;
}

export function ProfessionField({ name, label, className }: Props) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const value = watch(name) || "";
  const options = POPULAR_PROFESSIONS.map((p) => ({ label: p, value: p }));
  const alreadySelected = POPULAR_PROFESSIONS.some((item) => item === value);

  return (
    <div className={clsx("flex flex-col relative w-full", className)}>
      <label className="mb-1">{label}</label>
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
        isShowOptions={!alreadySelected && value.length > 2}
        setQuery={(val) => {
          setValue("previousPosition", val, { shouldValidate: true });
          setShowSuggestions(false);
        }}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm font-medium">
          {String(errors[name].message)}
        </span>
      )}
    </div>
  );
}
