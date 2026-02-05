import { clsx, type ClassValue } from "clsx";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "main" | "vacancy" | "auth";
  icon?: React.ElementType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "main", icon: Icon, ...props }, ref) => {
    return (
      <div className="relative">
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

            variant === "main" && [
              "h-[64px] py-[21px] px-[56px] text-gray-300 flex items-center bg-white",
              "md:h-[48px] sm:py-[13px] sm:px-[44px]",
              "border-secondary border-y",
            ],
            variant === "vacancy" && [
              "h-[56px] hover:ring-blue-600 focus-within:ring-2 pl-[43px] pr-[15px] text-[#2d3540]",
              "md:pl-4 md:pr-2",
            ],
            variant === "auth" && ["h-[48px]"],

            className,
          )}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
