"use client";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";
import { getButtonGroupClass } from "../../../helpers/helper";
import { Step2Values } from "../../../schemas/schemas";

export function GenderSection() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Step2Values>();

  const gender = watch("gender");

  const options = [
    { label: "Male", value: "male" as const, isFirst: true },
    { label: "Female", value: "female" as const, isFirst: false },
  ];

  return (
    <div className="flex flex-col w-full mb-5">
      <label htmlFor="" className="mb-2 font-semibold text-md cursor-text">
        Gender
      </label>
      <div className="w-full flex flex-row">
        {options.map((item, index) => (
          <div className="w-full" key={index}>
            <button
              type="button"
              className={clsx(
                "select-none cursor-pointer w-full",
                getButtonGroupClass(gender, item.value, item.isFirst),
              )}
              onClick={() =>
                setValue("gender", item.value, { shouldValidate: true })
              }
            >
              {item.value}
            </button>
          </div>
        ))}
      </div>
      {errors.gender && (
        <span className="text-md text-red-50 flex items-center">
          {errors.gender?.message}
        </span>
      )}
    </div>
  );
}
