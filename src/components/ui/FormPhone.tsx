import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import { countries, Country } from "@/src/components/constans/flags";
import { CountrySelect } from "./PhoneForm/CountrySelect";

interface PhoneFormProps {
  name: string;
  variant: "default" | "hook-form";
  label?: string;
  value?: string;
  onChange?: (v: string) => void;
}

export function PhoneForm({
  name,
  variant,
  label = "Phone number",
  value = "",
  onChange,
}: PhoneFormProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const methods = useFormContext();

  const errorMessage = methods?.formState.errors[name]?.message;

  return (
    <div className="relative w-full mb-6">
      <span className="mb-2 block font-semibold text-gray-700">{label}</span>
      {variant === "hook-form" && methods ? (
        <Controller
          name={name}
          control={methods.control}
          render={({ field }) => (
            <PhoneInputWithCountrySelect
              {...field}
              defaultCountry="US"
              international
              withCountryCallingCode
              className="flex items-center w-full h-[48px] px-3 border border-gray-300 rounded-lg outline-none transition-all focus-within:border-gray-900 hover:border-gray-900 [&_input]:ml-3 [&_input]:outline-none"
            />
          )}
        />
      ) : (
        <div className="flex items-center w-full h-[48px] border border-gray-300 rounded-lg overflow-hidden transition-all focus-within:border-gray-900">
          <CountrySelect
            value={selectedCountry}
            onChange={(country) => {
              setSelectedCountry(country);
              if (onChange && !value.startsWith(country.dialCode)) {
                onChange(country.dialCode + value.replace(/^\+\d+/, ""));
              }
            }}
          />
          <input
            type="tel"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="flex-1 h-full px-3 text-base outline-none"
            placeholder="Phone number"
          />
        </div>
      )}
      {errorMessage && (
        <span className="mt-2 block text-sm font-medium text-red-500">
          {String(errorMessage)}
        </span>
      )}
    </div>
  );
}
