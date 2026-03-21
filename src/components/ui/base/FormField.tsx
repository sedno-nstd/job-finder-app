import clsx from "clsx";
import { LucideProps, Search } from "lucide-react";
import React, { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  placeholder?: string;
  searchIcon?: React.ElementType<LucideProps>;
  hasIcon?: boolean;
  type?: "text" | "number" | "password";
}

export const FormField = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      error,
      type = "text",
      placeholder,
      hasIcon = false,
      searchIcon: Icon = Search,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={clsx("w-full flex relative flex-col", className)}>
        {label && (
          <label className="mb-2 block font-semibold text-slate-700 text-sm">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          <input
            ref={ref}
            {...props}
            placeholder={placeholder}
            type={type}
            className="border w-full relative border-secondary rounded-md px-3 h-[40px] outline-none duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20"
          />
          {hasIcon && (
            <div className="absolute right-3 flex items-center pointer-events-none">
              <Icon size={20} className="text-gray-400" />
            </div>
          )}
        </div>

        {error && (
          <span className="text-sm text-red-500 mt-1 font-medium italic">
            {error}
          </span>
        )}
      </div>
    );
  },
);
