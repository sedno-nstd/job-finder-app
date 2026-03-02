import { Check } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface Props {
  isNegotiable: boolean;
}

export function Negoitable({ isNegotiable }: Props) {
  const { register } = useFormContext();
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          {...register("negotiable")}
          className="peer sr-only"
        />
        <div
          className="w-5 h-5 border-2 border-secondary rounded flex items-center justify-center 
                    duration-200 peer-checked:bg-blue-600 peer-checked:border-blue-600"
        >
          {isNegotiable && <Check className="text-white" size={20} />}
        </div>
      </div>
      <span className="text-sm font-medium select-none text-gray-700">
        Negotiable salary
      </span>
    </label>
  );
}
