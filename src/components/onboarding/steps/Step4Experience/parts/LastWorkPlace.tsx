import { FormField } from "@/src/components/ui/FormField";
import { useFormContext } from "react-hook-form";

export function LastWorkPlace() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors.lastWorkplace;

  return (
    <>
      <label htmlFor="" className="mb-1">
        Last Workplace
      </label>
      <FormField
        {...register("lastWorkplace")}
        id="lastWorkplace"
        type="text"
        placeholder="Company title"
      />
      {error && (
        <span className="text-red-500 text-xs mt-1">
          {error.message as string}
        </span>
      )}
    </>
  );
}
