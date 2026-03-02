import { EMPLOYMENT_TYPES } from "@/src/domain/vacancy/mock";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";

type DisplayVariant = "grid" | "list";

interface Props {
  name: string;
  variant?: DisplayVariant;
}

export function EmploymentTypeGroup({ name, variant = "grid" }: Props) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedValues = watch(name) || [];
  const error = errors[name]?.message as string;

  const handleSelect = (item: any) => {
    const isAlreadySelected = selectedValues.some((v: any) => v.id === item.id);

    const updated = isAlreadySelected
      ? selectedValues.filter((v: any) => v.id !== item.id)
      : [...selectedValues, item];

    setValue(name, updated, { shouldValidate: true });
  };

  return (
    <div className="w-full">
      <div
        className={clsx(
          "gap-4",
          variant === "grid"
            ? "grid grid-cols-2 sm:grid-cols-2"
            : "flex flex-col",
        )}
      >
        {EMPLOYMENT_TYPES.map((item) => {
          const isChecked = selectedValues.some((v: any) => v.id === item.id);

          return (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="group cursor-pointer flex flex-row items-center gap-3 w-fit"
            >
              <div
                className={clsx(
                  "relative flex items-center justify-center h-6 w-6 rounded-md border-2 transition-all duration-200 shrink-0",
                  isChecked
                    ? "bg-blue-600 border-blue-600 shadow-sm shadow-blue-200"
                    : "border-slate-300 bg-white group-hover:border-blue-400",
                )}
              >
                {isChecked && <Check size={16} className="text-white" />}
              </div>

              <span
                className={clsx(
                  "select-none text-sm font-medium transition-colors",
                  isChecked ? "text-blue-700" : "text-slate-600",
                )}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-2 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
