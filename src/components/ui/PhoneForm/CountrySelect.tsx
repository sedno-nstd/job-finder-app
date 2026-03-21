import { useState } from "react";
import { countries, Country } from "../../constans/flags";
import { useOutsideClick } from "@/src/hooks/ui/useOutsideClick";
import clsx from "clsx";

type Props = {
  value: Country;
  onChange: (country: Country) => void;
  className?: string;
};

export function CountrySelect({ value, onChange, className }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useOutsideClick<HTMLDivElement>(() => setOpen(false));

  return (
    <div className={clsx("relative h-full", className)} ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 border-r"
      >
        <span>{value.flag}</span>
        <span>{value.dialCode}</span>
      </button>

      {open && (
        <div className="bg-white border mt-1 w-full">
          {countries.map((country) => (
            <div
              key={country.code}
              onClick={() => {
                onChange(country);
                setOpen(false);
              }}
              className="flex gap-2 p-2 z-50 hover:bg-gray-100 cursor-pointer"
            >
              <span>{country.flag}</span>
              <span>{country.name}</span>
              <span>{country.dialCode}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
