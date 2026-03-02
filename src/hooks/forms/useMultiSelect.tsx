import { useFormContext } from "react-hook-form";

interface UseMultiSelectProps {
  name: string;
  maxLength?: number;
}

export function useMultiSelect({ name, maxLength = 15 }: UseMultiSelectProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];

  const selectedItems: string[] = watch(name) || [];

  const handleSelect = (value: string) => {
    if (selectedItems.length > maxLength) return;

    const alreadySelected = selectedItems.includes(value);

    if (!alreadySelected) {
      const nextItems = [...selectedItems, value];
      setValue(name, nextItems, { shouldValidate: true });
    }
  };

  const handleRemove = (value: string) => {
    const nextItems = selectedItems.filter((item) => item !== value);

    setValue(name, nextItems, { shouldValidate: true });
  };

  return {
    selectedItems,
    handleSelect,
    handleRemove,
    error: fieldError?.message ? String(fieldError.message) : undefined,
  };
}
