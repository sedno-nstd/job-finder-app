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

  return (
    <div className="flex flex-col w-full mb-5">
      <label htmlFor="" className="mb-2 font-semibold text-md cursor-text">
        Gender
      </label>
      <div className="flex flex-row w-full ">
        <button
          type="button"
          className={clsx(
            "select-none",
            getButtonGroupClass(gender, "Male", true)
          )}
          onClick={() => setValue("gender", "Male", { shouldValidate: true })}
        >
          Male
        </button>
        <button
          type="button"
          className={clsx(
            "select-none",
            getButtonGroupClass(gender, "Female", false)
          )}
          onClick={() => setValue("gender", "Female", { shouldValidate: true })}
        >
          Female
        </button>
      </div>
      {errors.gender && (
        <span className="text-red-500 text-sm mt-1 animate-in fade-in duration-300">
          Please select your gender to continue
        </span>
      )}
    </div>
  );
}
