import clsx from "clsx";
import { ArrowDown } from "lucide-react";

interface IData {
  label: string;
  value: string;
}

interface Props {
  value: string;
  data: readonly IData[];
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  setSelect: (val: string) => void;
  className?: string;
  defaultLabel: string;
}

export function CustomSelect({
  data,
  isOpen,
  value,
  setIsOpen,
  className,
  setSelect,
  defaultLabel,
}: Props) {
  const selectedOption = data.find((item) => item.value === value);

  return (
    <div
      className={clsx(
        "relative w-full px-4 h-[40px] cursor-pointer hover:border-blue-600 justify-between flex flex-row items-center max-w-[194px] border",
        isOpen ? "border-blue-600" : "border-gray-400",
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{selectedOption ? selectedOption.label : defaultLabel}</span>
      <ArrowDown
        className={clsx(
          "hover:text-blue-600",
          isOpen ? "text-blue-600" : "text-gray-400",
        )}
      />
      <div className="absolute top-full mt-2 w-full left-0 bg-white">
        {isOpen && (
          <div className="flex flex-col shadow-2xl border border-[#a1afc1]/50 custom-scrollbar overflow-y-auto w-full">
            {data.map((item) => {
              return (
                <div
                  className={clsx(
                    "cursor-pointer px-4 border-b border-[#a1afc1]/50 p-1 hover:bg-gray-100 w-full",
                    className,
                  )}
                  key={item.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelect(item.value);
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
