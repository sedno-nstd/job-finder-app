import * as Slider from "@radix-ui/react-slider";
import { useFilterStore } from "@/app/store/useFilterStore";
import { ChangeEvent } from "react";

export function SalarySlider() {
  const { selectedPeriod, minSalary, setMinSalary } = useFilterStore();

  const isHour = selectedPeriod === "hour";
  const maxLimit = isHour ? 2000 : 200000;
  const step = isHour ? 10 : 1000;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const numericValue = value.replace(/\D/g, "");

    if (value === "") {
      setMinSalary(0);
      return;
    }
    const numValue = parseInt(numericValue, 10);

    if (numValue > maxLimit) {
      setMinSalary(maxLimit);
    } else {
      setMinSalary(numValue);
    }
  };

  return (
    <div className="flex flex-col py-4 px-2">
      <h3 className="text-sm font-semibold text-gray-700">
        Минимальная зарплата
      </h3>
      <div className="py-3 flex flex-row items-center">
        <input
          type="text"
          value={`${minSalary}+`}
          placeholder="etner sum"
          onChange={handleInputChange}
          className="text-2xl font-bold text-blue-600 max-w-[100px]"
        />

        <span className="text-sm font-normal text-gray-500 ml-1">
          {isHour ? "грн/час" : "грн/мес"}
        </span>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
        value={[minSalary]}
        onValueChange={(value) => setMinSalary(value[0])}
        max={maxLimit}
        step={step}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[4px]">
          <Slider.Range className="absolute bg-blue-600 rounded-full h-full" />
        </Slider.Track>

        <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-blue-600 shadow-md rounded-full hover:scale-125 transition-transform focus:outline-none active:cursor-grabbing" />
      </Slider.Root>{" "}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>0</span>
        <span>{maxLimit.toLocaleString()}</span>
      </div>
    </div>
  );
}
