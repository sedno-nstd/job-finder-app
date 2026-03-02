import clsx from "clsx";
import { X } from "lucide-react";

interface Props {
  data: string[];
  onRemove: (value: string) => void;
}

export function SelectedItemsList({ data, onRemove }: Props) {
  return (
    <div
      className={clsx(
        "flex flex-row gap-2 max-w-[400px] w-full text-wrap flex-wrap",
        data.length > 0 ? "mb-4" : "hidden",
      )}
    >
      {data.length > 0 &&
        data.map((item, index) => (
          <div
            className="rounded-full w-fit gap-1 flex justify-between items-center border px-3 border-blue-600 py-1 cursor-pointer hover:border-blue-900 hover:text-blue-900 text-blue-600"
            onClick={() => onRemove(item)}
            key={index}
          >
            <span>{item}</span>
            <X size={16} />
          </div>
        ))}
    </div>
  );
}
