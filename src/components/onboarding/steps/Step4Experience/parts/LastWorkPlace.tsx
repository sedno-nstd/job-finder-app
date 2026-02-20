import { FormField } from "@/src/components/ui/formInput";
import { useFormContext } from "react-hook-form";

export function LastWorkPlace() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
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
    </>
  );
}
