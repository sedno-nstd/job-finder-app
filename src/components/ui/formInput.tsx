import React, { forwardRef } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full flex relative flex-col">
        <label htmlFor="" className="text-sm font-medium mb-2 max-sm:text-base">
          {label}
        </label>
        <input
          ref={ref}
          {...props}
          type="text"
          className="border relative border-secondary rounded-md px-3 h-[40px] outline-none duration-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20"
        />
        {error && (
          <span className="text-sm text-red-500 mt-1 font-medium italic">
            {error}
          </span>
        )}
      </div>
    );
  },
);
