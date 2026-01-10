export const CustomSelect = ({
  label,
  value,
  options,
  isOpen,
  onToggle,
  onSelect,
}: {
  label: string;
  value: string;
  options: string[] | { label: string; value: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (val: string) => void;
}) => {
  return (
    <div className="flex flex-col relative w-full h-full cursor-pointer">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="p-3 select-none flex items-center justify-center h-[48px] w-full"
      >
        <span className="truncate text-sm text-[#2d3540] max-sm:text-base">
          {value || label}
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-[100%] left-0 w-full bg-white border border-[#a1afc1] shadow-2xl z-[999] max-h-[200px] overflow-y-auto custom-scrollbar ">
          {options.map((opt: any) => {
            const itemValue = typeof opt === "string" ? opt : opt.value;
            const itemLabel = typeof opt === "string" ? opt : opt.label;
            return (
              <div
                key={itemValue}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(itemValue);
                }}
                className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-none text-sm text-center select-none max-sm:text-base"
              >
                {itemLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
