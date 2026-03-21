import { useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

interface Props {
  name: string;
}

export function Description({ name }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col gap-1 w-full mt-6 mb-6">
      <label className="text-sm font-medium text-gray-700">Description</label>
      <TextareaAutosize
        {...register(name)}
        minRows={5}
        maxRows={15}
        placeholder="Describe the responsibilities, requirements, and benefits..."
        className="border custom-scrollbar border-secondary rounded-md px-3 py-2 outline-none 
               duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20 
               resize-none w-full text-sm leading-relaxed"
      />
      {errors[name] && (
        <span className="text-sm text-red-500 font-medium">
          {String(errors[name].message)}
        </span>
      )}
    </div>
  );
}
