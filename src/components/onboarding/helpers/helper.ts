import clsx from "clsx";

export const getButtonGroupClass = (
  currentValue: string,
  buttonValue: string,
  isFirst: boolean
) => {
  const isActive = currentValue === buttonValue;

  return clsx(
    "py-2 px-5 flex-1 border transition-all select-none outline-none",
    isActive
      ? "border-blue-600 bg-blue-50 text-blue-600 z-10"
      : "border-[#a1afc1] text-[#2d3540] hover:bg-[#e9f3fe]",

    isFirst ? "rounded-l-lg" : "rounded-r-lg -ml-[1px]"
  );
};

export const selectButtons = (select: boolean) => {
  const isSelect = select;
  return clsx(
    "text-sm border rounded-xl flex flex-row items-center gap-1 py-[6px] px-3 cursor-pointer outline-none",
    isSelect
      ? "text-blue-600 border-blue-600 bg-blue-50"
      : "border-[#a1afc1] color-text-main "
  );
};
