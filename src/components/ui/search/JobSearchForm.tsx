import { clsx, type ClassValue } from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "main" | "vacancy" | "auth" | "default";
  icon?: React.ElementType;
  icon2?: React.ElementType;
  icon2ClassName?: string;
  icon2Function?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "main",
      icon: Icon,
      icon2: Icon2,
      icon2Function,
      icon2ClassName,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative h-full rounded-lg w-full">
        {Icon && (
          <Icon
            size={24}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        )}
        <input
          ref={ref}
          {...props}
          type="text"
          className={cn(
            "w-full outline-none transition-all duration-200",
            Icon ? "pl-[43px]" : "pl-4",

            variant === "default" && [
              "h-full border-secondary rounded-md px-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20",
            ],

            variant === "main" && [
              "h-[64px] py-[21px] px-[56px] text-gray-300 flex items-center bg-white",
              "md:h-[48px] sm:py-[13px] sm:px-[44px]",
              "border-secondary border-y",
            ],
            variant === "vacancy" && [
              "h-full hover:ring-blue-600 focus:ring-blue-600  rounded-lg hover:ring focus:ring-2 px-[43px] text-[#2d3540]",
            ],
            variant === "auth" && ["h-[48px]"],

            className,
          )}
        />
        {Icon2 && (
          <div
            onClick={() => {
              icon2Function && icon2Function();
            }}
            className={cn(
              "cursor-pointer mr-1.5 absolute p-2 rounded-lg right-2 top-1/2 -translate-y-1/2 flex items-center justify-center duration-200 transition-colors",
              icon2ClassName,
            )}
          >
            <Icon2
              size={24}
              className="transition-colors duration-200"
              onClick={props.onReset}
            />
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
