import { useFormContext } from "react-hook-form";
import { COUNTRY_USER } from "../../constants/locationData";
import { IUserLocation } from "./type";
import { useMemo, useState } from "react";
import { useOutsideClick } from "@/src/hooks/useOutsideClick";

export function userLocationSearch({
  forbiddenLocation,
  onChange,
  registerName,
}: IUserLocation) {
  const [isOpen, setIsOpen] = useState(false);
  const { setValue, watch } = useFormContext();
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

  return {
    isOpen,
    handleUploadInput,
    isFullMatch,
    filteredLocations,
    containerRef,
    setIsOpen,
    query,
  };
}
