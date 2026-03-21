import clsx from "clsx";
import { ArrowDown } from "lucide-react";

interface IData {
  id: string;
  value: string;
}

interface Props {
  id: string;
  data: readonly IData[];
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  setSelect: (val: string) => void;
  className?: string;
  defaultLabel: string;
  position?: "top" | "bottom";
  showArrow?: boolean;
}

export function CustomSelect({
  data,
  isOpen,
  id,
  setIsOpen,
  className,
  setSelect,
  defaultLabel,
  position = "bottom",
  showArrow = true,
}: Props) {
  const selectedOption = data.find((item) => item.id === id);

  return (
    <div
      className={clsx(
        "relative w-full px-4 h-[40px] select-none z-10 duration-200 transition-all cursor-pointer hover:border-blue-600 justify-between flex flex-row items-center border",
        isOpen ? "border-blue-600" : "border-gray-300",
        className,
      )}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>{selectedOption ? selectedOption.value : defaultLabel}</span>
      {showArrow && (
        <ArrowDown
          className={clsx(
            "hover:text-blue-600",
            isOpen ? "text-blue-600" : "text-gray-400",
          )}
        />
      )}
      <div
        className={clsx(
          "absolute mt-2 w-full left-0 bg-white",
          position === "bottom" ? "top-full" : "bottom-full mb-1",
        )}
      >
        {isOpen && (
          <div className="flex flex-col shadow-2xl  border border-[#a1afc1]/50 custom-scrollbar overflow-y-auto w-full">
            {data.map((item) => {
              return (
                <div
                  className={clsx(
                    "cursor-pointer px-4 border-b  border-[#a1afc1]/50 p-1 hover:bg-gray-100 w-full",
                    "last:border-b-0",
                  )}
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelect(item.id);
                  }}
                >
                  {item.value}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
