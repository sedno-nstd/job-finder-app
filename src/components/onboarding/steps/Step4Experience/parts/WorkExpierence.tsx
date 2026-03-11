import { CustomSelect } from "@/src/components/ui/CustomSelect";
import { useFormContext } from "react-hook-form";
import { EXPERIENCE_OPTIONS } from "../../../constants/jobOptions";
import { useState } from "react";
import clsx from "clsx";

interface Props {
  className?: string;
  name: string;
  label?: string;
}

export function WorkExpierence({
  name,
  className,
  label = "Duration of stay",
}: Props) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const experienceOptions = EXPERIENCE_OPTIONS.map((item) => ({
    id: item.value,
    label: item.label,
    value: item.value,
  }));
  const experienceValue = watch(name);

  return (
    <div className={clsx("w-full h-full flex flex-col", className)}>
      <label htmlFor="" className=" mb-1 max-sm:text-base">
        {label}
      </label>
      <CustomSelect
        className="w-[394px]"
        data={experienceOptions}
        id={experienceValue}
        setSelect={(val) => {
          setValue(name, val, { shouldValidate: true });
          setIsSelectOpen(false);
        }}
        isOpen={isSelectOpen}
        setIsOpen={setIsSelectOpen}
        defaultLabel="Select experience"
        position="bottom"
        showArrow={true}
      />
      {errors[name] && (
        <span className="text-sm font-medium text-red-500">
          {String(errors[name]?.message)}
        </span>
      )}
    </div>
  );
}
