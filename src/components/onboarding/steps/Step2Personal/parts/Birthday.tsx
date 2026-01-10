import { useFormContext } from "react-hook-form";
import { CustomSelect } from "../../../components/CustomSelect";
import { useState } from "react";
import { Step2Values } from "../../../schemas/schemas";
import { DayInMonth, MONTHS, USER_AGES } from "../../../constants/dateOptions";

export function Birthday() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Step2Values>();
  const [openDropdown, setOpenDropdown] = useState<
    "day" | "month" | "year" | null
  >(null);

  const dateOfBirth = watch("dateOfBirth");

  const [y, m, d] = (dateOfBirth || "2000-01-01").split("-");

  const handleDateUpdate = (type: "y" | "m" | "d", value: string) => {
    const newDate = `${type === "y" ? value : y}-${type === "m" ? value : m}-${
      type === "d" ? value : d
    }`;
    setValue("dateOfBirth", newDate, { shouldValidate: true });
    setOpenDropdown(null);
  };

  return (
    <div className="flex flex-col ">
      <div className="mb-2">
        <label
          htmlFor=""
          className="mb-2 font-semibold cursor-text text-md max-sm:text-base"
        >
          Select date of birth
        </label>
      </div>

      <div className="grid grid-cols-3 border border-[#a1afc1] rounded-lg mb-5">
        <div className="border-r border-[#a1afc1] rounded-l-xl">
          <CustomSelect
            label="Day"
            value={d}
            options={DayInMonth}
            isOpen={openDropdown === "day"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "day" ? null : "day")
            }
            onSelect={(val) => handleDateUpdate("d", val)}
          />
        </div>
        <div className="border-y-[#a1afc1] ">
          <CustomSelect
            label="Month"
            value={MONTHS.find((month) => month.value === m)?.label || m}
            options={MONTHS}
            isOpen={openDropdown === "month"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "month" ? null : "month")
            }
            onSelect={(val) => handleDateUpdate("m", val)}
          />
        </div>
        <div className="border-l border-[#a1afc1]">
          <CustomSelect
            label="Year"
            value={y}
            options={USER_AGES}
            isOpen={openDropdown === "year"}
            onToggle={() =>
              setOpenDropdown(openDropdown === "year" ? null : "year")
            }
            onSelect={(val) => handleDateUpdate("y", val)}
          />
        </div>
      </div>
      {errors.dateOfBirth && (
        <span className="text-red-500 text-sm mt-1 animate-in fade-in duration-300">
          Please select your date of birth to continue
        </span>
      )}
    </div>
  );
}
