import { useOutsideClick } from "../hooks/ui/useOutsideClick";

interface IOption {
  id: string;
  label: string;
}

interface Props {
  label: string;
  options: IOption[];
  value?: string;
  isOpen: boolean;
  onSelect: (value: string) => void;
  onToggle: () => void;
}

export function Formatter({
  options,
  onToggle,
  label,
  isOpen,
  value,
  onSelect,
}: Props) {
  const selectRef = useOutsideClick<HTMLDivElement>(() => {
    if (isOpen) onToggle();
  });

  return (
    <div
      ref={selectRef}
      className="w-full relative cursor-pointer flex justify-center items-center h-[40px]"
      onClick={() => onToggle()}
    >
      <div>
        <span className="text-md sm:text-base tracking-wider">
          {value ? value : label}
        </span>
      </div>
      {isOpen && (
        <div className="absolute custom-scrollbar w-full bg-white max-h-[150px] overflow-y-scroll max-w-[132px] justify-center top-full z-30 shadow-2xl">
          {options.map((item) => (
            <div
              className="w-full flex flex-col items-center justify-center py-2 border-gray-200 border-b hover:bg-gray-300/20"
              key={item.id}
              onClick={(e) => {
                onSelect(item.id);
                e.stopPropagation();
                onToggle();
              }}
            >
              <p className="text-main text-md select-none">{item.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
