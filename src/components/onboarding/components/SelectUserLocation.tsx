import { useState } from "react";
import { COUNTRY_USER } from "../constants/locationData";
import { Trash } from "lucide-react";

interface Props {
  value: string;
  onChange: (val: string) => void;
  forbiddenLocation: string | string[];
  onDelete?: () => void;
}

export function SelectUserLocation({
  onChange,
  value,
  forbiddenLocation,
  onDelete,
}: Props) {
  const [query, setQuery] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const locationData = COUNTRY_USER.flatMap((item) => {
    return item.cities.map((city) => {
      return {
        city: city,
        country: item.country,
        fullLabel: `${city}, ${item.country}`,
      };
    });
  });

  const filteredLocations = locationData
    .filter((loc) => {
      const matchesQuery = loc.fullLabel
        .toLowerCase()
        .includes(query?.toLowerCase());
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

  const isFullMatch = locationData.some((loc) => loc.fullLabel === query);

  const handleUploadInput = (fullLabel: string) => {
    setQuery(fullLabel);
    onChange(fullLabel);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full h-[40px]">
      <input
        placeholder="For Example: Kiev Remote, Poland"
        className="w-full relative border h-full border-[##a1afc1] rounded-md outline-none px-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm"
        type="text"
        onFocus={() => setIsOpen(true)}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
      />
      <button
        type="button"
        onClick={() => {
          setQuery("");
          if (value.trim() === "" && onDelete) {
            onDelete();
          } else {
            setQuery("");
            onChange("");
          }
        }}
        className="p-2 absolute top-1/2 -translate-y-1/2  right-3 text-red-500 hover:text-blue-500 cursor-pointer rounded-lg transition-colors duration-200"
      >
        <Trash size={20} />
      </button>
      {isOpen && query.length > 1 && !isFullMatch && (
        <div className="absolute top-full left-0 bg-white shadow-md border w-full z-10 mt-1">
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
