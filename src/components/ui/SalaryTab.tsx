import clsx from "clsx";

interface ActiveTab {
  selectedPeriod: "hour" | "month";
  onPeriodChange: (value: "hour" | "month") => void;
}

export function SalaryTab({ selectedPeriod, onPeriodChange }: ActiveTab) {
  return (
    <div className="flex felx-row">
      <button
        className={clsx(
          "border ",
          selectedPeriod === "hour" && "text-white border-blue-600"
        )}
        onClick={() => {
          onPeriodChange("hour");
        }}
      >
        <span className="p-2">Per hour</span>
      </button>
      <button
        className={clsx(
          "border",
          selectedPeriod === "month" && "text-white border-blue-600"
        )}
        onClick={() => {
          onPeriodChange("month");
        }}
      >
        <span className="p-2">Per month</span>
      </button>
    </div>
  );
}
