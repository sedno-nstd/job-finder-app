"use client";
import { useMemo, useState } from "react";
import { COUNTRY_USER } from "../constants/locationData";
import { Trash } from "lucide-react";
import { FormField } from "../../ui/FormField";
import { useFormContext } from "react-hook-form";
import { useOutsideClick } from "@/src/hooks/ui/useOutsideClick";
import { SearchSuggestions } from "../../ui/SearchSuggestions";

interface Props {
  value: string;
  onChange: (val: string) => void;
  forbiddenLocation: string | string[];
  onDelete?: () => void;
  registerName: string;
}

export function SelectUserLocation({
  onChange,
  value,
  onDelete,
  forbiddenLocation,
  registerName,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, setValue, watch } = useFormContext();
  const query = watch(registerName) || "";

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    setIsOpen(false);
  });

  const handleFocus = () => {
    setIsOpen(true);
  };

  const locationData = useMemo(() => {
    return COUNTRY_USER.flatMap((item) => {
      return item.cities.map((city) => {
        return {
          city: city,
          country: item.country,
          fullLabel: `${city}, ${item.country}`,
        };
      });
    });
  }, []);

  const suggestions = useMemo(() => {
    if (!query || query.length < 2) return [];

    return locationData
      .filter((loc) => {
        const matchesSearch = loc.fullLabel
          .toLowerCase()
          .includes(query.trim().toLowerCase());

        const isForbidden = forbiddenLocation?.includes(loc.fullLabel);

        return matchesSearch && !isForbidden;
      })
      .sort((a, b) => {
        return a.fullLabel.localeCompare(b.fullLabel);
      })
      .slice(0, 5)
      .map((loc) => ({
        label: loc.fullLabel,
        value: loc.fullLabel,
      }));
  }, [locationData, query]);

  return (
    <div className="relative w-full h-[40px]" ref={containerRef}>
      <FormField
        {...register(`${registerName}`)}
        onFocus={handleFocus}
        autoComplete="off"
      />
      <button
        type="button"
        onClick={() => {
          setValue(`${registerName}`, "");
          if (value.trim() === "" && onDelete) {
            onDelete();
          } else {
            setValue(`${registerName}`, "");
            onChange("");
          }
        }}
        className="p-2 absolute top-1/2 -translate-y-1/2  right-3 text-red-500 hover:text-blue-500 cursor-pointer rounded-lg transition-colors duration-200"
      >
        <Trash size={20} />
      </button>
      {isOpen && query.trim().length >= 2 && suggestions.length > 0 && (
        <SearchSuggestions
          setQuery={(val: string) => {
            setValue(registerName, val, { shouldValidate: true });
            setIsOpen(false);
          }}
          data={suggestions}
          isOpen={isOpen}
          isShowOptions={true}
          query={query}
          sliceOptions={5}
        />
      )}
    </div>
  );
}
