import { EMPLOYMENT_TYPES } from "@/src/domain/vacancy/mock";
import clsx from "clsx";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

interface Props {
  name: string;
}

export function EmploymentType({ name }: Props) {
  const { setValue, watch } = useFormContext();

  const formValue = watch(name);

  const [isSelected, setIsSelected] = useState<EmploymentType[]>([]);

  useEffect(() => {
    if (formValue && isSelected.length === 0) {
      setIsSelected(formValue);
    }
  }, [formValue]);

  const handleSelect = (value: EmploymentType) => {
    const alreadySelected = isSelected.some((item) => item.id === value.id);

    const updatedSelection = alreadySelected
      ? isSelected.filter((item) => item.id !== value.id)
      : [...isSelected, value];

    setIsSelected(updatedSelection);
    setValue(name, updatedSelection, { shouldValidate: true });
  };

  return (
    <div className="w-full h-full grid grid-cols-2 sm:grid-cols-2 gap-4 mb-2">
      {EMPLOYMENT_TYPES.map((item) => {
        const isChecked = isSelected.some((v: any) => v.id === item.id);

        return (
          <div
            key={item.id}
            onClick={() => handleSelect(item)}
            className="group cursor-pointer flex flex-row items-center gap-3 w-fit"
          >
            <div
              className={clsx(
                "relative flex items-center justify-center h-6 w-6 rounded-md border-2 transition-all duration-200",
                isChecked
                  ? "bg-blue-600 border-blue-600 shadow-sm shadow-blue-200"
                  : "border-slate-300 bg-white group-hover:border-blue-400",
              )}
            >
              {isChecked && <Check className="text-white" />}
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
  );
}
