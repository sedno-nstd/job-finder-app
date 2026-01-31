import { Trash } from "lucide-react";
import { userLocationSearch } from "./useLocationSearch";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/src/components/ui/formInput";

interface Props {
  value: string;
  onChange: (val: string) => void;
  forbiddenLocation: string | string[];
  onDelete?: () => void;
  registerName: string;
}

export function SelectUserLocation({
  onChange,
  registerName,
  value,
  onDelete,
  forbiddenLocation,
}: Props) {
  const {
    containerRef,
    filteredLocations,
    handleUploadInput,
    isFullMatch,
    isOpen,
    setIsOpen,
    query,
  } = userLocationSearch({
    registerName,
    forbiddenLocation,
    onChange,
    onDelete,
    value,
  });
  const { register, setValue } = useFormContext();
  return (
    <div className="relative w-full h-[40px]" ref={containerRef}>
      <FormField
        {...register(`${registerName}`)}
        onClick={() => setIsOpen(!isOpen)}
        autoComplete="off"
      />
      <button
        type="button"
        onClick={() => {
          setValue(`${registerName}`, "");
          if (value.trim() === "" && onDelete) {
            onDelete();
          } else {
            setValue(`${registerName}`, "");
            onChange("");
          }
        }}
        className="p-2 absolute top-1/2 -translate-y-1/2  right-3 text-red-500 hover:text-blue-500 cursor-pointer rounded-lg transition-colors duration-200"
      >
        <Trash size={20} />
      </button>
      {isOpen && query.length > 1 && !isFullMatch && (
        <div className="absolute top-full mt-1.5 left-0 bg-white shadow-md border w-full z-10">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((loc, index) => (
              <div
                key={index}
                onClick={() => handleUploadInput(loc.fullLabel)}
                className="p-2 cursor-pointer hover:bg-gray-100 duration-200 border-b last:border-none"
              >
                {loc.fullLabel}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-400 text-sm">Ничего не найдено</div>
          )}
        </div>
      )}
    </div>
  );
}
