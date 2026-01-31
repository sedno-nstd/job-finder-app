"use client";
import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Step2Values } from "../../../schemas/schemas";
import { DayInMonth, MONTHS, USER_AGES } from "../../../constants/dateOptions";
import { Formatter } from "../../../../../utils/Formatters";

export function Birthday() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Step2Values>();
  const [openDropdown, setOpenDropdown] = useState<
    "day" | "month" | "year" | null
  >(null);

  const dropdowns = [
    {
      id: "y",
      label: "Year",
      value: "year",
      option: USER_AGES,
      border: "border-r",
    },
    { id: "m", label: "Month", value: "month", option: MONTHS, border: "" },
    {
      id: "d",
      label: "Day",
      value: "day",
      option: DayInMonth,
      border: "border-l",
    },
  ];

  const dateOfBirth = watch("dateOfBirth") || "---";

  const [y, m, d] = (dateOfBirth || "2000-01-01").split("-");

  const handleDateUpdate = (type: "y" | "m" | "d", value: string) => {
    const [currentY, currentM, currentD] = watch("dateOfBirth").split("-");

    let newDate = "";
    if (type === "y") newDate = `${value}-${currentM}-${currentD}`;
    if (type === "m") newDate = `${currentY}-${value}-${currentD}`;
    if (type === "d") newDate = `${currentY}-${currentM}-${value}`;

    setValue("dateOfBirth", newDate, { shouldValidate: true });
  };

  const getPartValue = (id: string) => {
    if (id === "y") return y;
    if (id === "m") return m;
    if (id === "d") return d;
    return;
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

      <div className="grid  grid-cols-3 border border-[#a1afc1] rounded-lg mb-5">
        {dropdowns.map((item) => (
          <div key={item.id} className={item.border + "border-[#a1afc1]"}>
            <Formatter
              value={getPartValue(item.id)}
              onSelect={(selectedId) =>
                handleDateUpdate(item.id as "y" | "m" | "d", selectedId)
              }
              label={item.label}
              onToggle={() =>
                setOpenDropdown(
                  openDropdown === item.value ? null : (item.value as any),
                )
              }
              options={item.option.map((opt) => {
                if (typeof opt === "string") {
                  return { id: opt, label: opt };
                }
                return { id: opt.id, label: opt.label };
              })}
              isOpen={openDropdown === item.value}
            />
          </div>
        ))}
      </div>
      {errors.dateOfBirth && (
        <span className="text-red-500 text-sm mt-1 animate-in fade-in duration-300">
          Please select your date of birth to continue
        </span>
      )}
    </div>
  );
}
