import clsx from "clsx";

interface FiltersSidebarProps {
  options: { value: string; label: string; requiresLocation?: boolean }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  title: string;
  handleLocationRequest?: () => void;
}

export function FiltersSidebar({
  options,
  selectedValue,
  setSelectedValue,
  title,
  handleLocationRequest,
}: FiltersSidebarProps) {
  return (
    <div className="flex flex-col p-2 bg-white rounded  min-w-[180px]">
      <span className="font-medium mb-2">{title}</span>

      {options.map((item) => {
        const isSelected = item.value === selectedValue;

        return (
          <div key={item.value}>
            <div
              className="flex flex-row gap-2 items-center cursor-pointer mb-1"
              onClick={() => {
                setSelectedValue(item.value);

                if (item.requiresLocation && handleLocationRequest) {
                  handleLocationRequest();
                }
              }}
            >
              <div className="flex gap-2">
                <div
                  className={clsx(
                    "w-[15px] h-[15px] rounded-full flex items-center justify-center border",
                    isSelected
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-gray-300"
                  )}
                >
                  {isSelected && (
                    <div className="w-[7px] h-[7px] rounded-full bg-white"></div>
                  )}
                </div>
              </div>
              <div>{item.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
