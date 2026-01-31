"use client";
import { useMemo, useState } from "react";
import { COUNTRY_USER } from "../constants/locationData";
import { Trash } from "lucide-react";
import { FormField } from "../../ui/formInput";
import { useFormContext } from "react-hook-form";
import { useOutsideClick } from "@/src/hooks/useOutsideClick";

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
  forbiddenLocation,
  onDelete,
  registerName,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, setValue, watch } = useFormContext();
  const query = watch(registerName) || "";

  const containerRef = useOutsideClick<HTMLDivElement>(() => {
    setIsOpen(false);
  });

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

  const filteredLocations = useMemo(() => {
    return locationData
      .filter((loc) => {
        const matchesQuery =
          typeof query === "string" &&
          loc.fullLabel.toLowerCase().includes(query?.toLowerCase());
        const isNotForbidden = Array.isArray(forbiddenLocation)
          ? !forbiddenLocation.includes(loc.fullLabel)
          : loc.fullLabel !== forbiddenLocation;

        return matchesQuery && isNotForbidden;
      })
      .sort((a, b) => {
        const q = query.toLowerCase();

        const aLabel = a.fullLabel.toLowerCase();
        const bLabel = b.fullLabel.toLowerCase();

        const aStart = aLabel.startsWith(q);
        const bStart = bLabel.startsWith(q);

        if (aStart && !bStart) return -1;
        if (bStart && !aStart) return 1;
        return aLabel.localeCompare(bLabel);
      })
      .slice(0, 5);
  }, [locationData, query, forbiddenLocation]);

  const isFullMatch = locationData.some((loc) => loc.fullLabel === query);

  const handleUploadInput = (fullLabel: string) => {
    setValue(`${registerName}`, fullLabel);
    onChange(fullLabel);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full h-[40px]" ref={containerRef}>
      <FormField
        {...register(`${registerName}`)}
        onClick={() => setIsOpen(!isOpen)}
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
      {isOpen && query.length > 1 && !isFullMatch && (
        <div className="absolute top-full mt-1.5 left-0 bg-white shadow-md border w-full z-10">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((loc, index) => (
              <div
                key={index}
                onClick={() => handleUploadInput(loc.fullLabel)}
                className="p-2 cursor-pointer hover:bg-gray-100 duration-200 border-b last:border-none"
              >
                {loc.fullLabel}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-400 text-sm">Ничего не найдено</div>
          )}
        </div>
      )}
    </div>
  );
}
