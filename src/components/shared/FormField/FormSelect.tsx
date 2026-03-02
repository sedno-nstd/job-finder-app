import { CustomSelect } from "../../ui/CustomSelect";
import { FieldValues, Path, useFormContext } from "react-hook-form";

interface SharedFormSelect<T extends FieldValues> {
  name: Path<T>;
  data: {
    id: string;
    value: string;
  }[];
  label: string;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export function FormSelect<T extends FieldValues>({
  name,
  data,
  label,
  isOpen,
  setIsOpen,
}: SharedFormSelect<T>) {
  const { setValue, watch } = useFormContext<T>();

  const value = watch(name);
  return (
    <>
      <CustomSelect
        id={value}
        setSelect={(val) => {
          setValue(name, val as any, { shouldValidate: true });
          setIsOpen(!isOpen);
        }}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        data={data}
        defaultLabel={label}
        className="max-w-[194px]"
      />
    </>
  );
}
