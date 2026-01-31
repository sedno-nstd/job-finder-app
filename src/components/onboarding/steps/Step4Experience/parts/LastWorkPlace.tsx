import { FormField } from "@/src/components/ui/formInput";
import { useFormContext } from "react-hook-form";

export function LastWorkPlace() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <FormField
      label="Last Workplace"
      {...register("lastWorkplace")}
      id="lastWorkplace"
      type="text"
      placeholder="Company title"
    />
  );
}
