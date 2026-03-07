import { COUNTRY_USER } from "@/src/components/constans/search-data";

export interface IFieldConfig {
  name: "city" | "country";
  placeholder: string;
  hasSuggestion: boolean;
  data?: { label: string; value: string }[];
}

export const cityData = COUNTRY_USER.flatMap((item) =>
  item.cities.map((city) => ({ label: city, value: city })),
);

export const countryData = COUNTRY_USER.map((item) => ({
  label: item.country,
  value: item.country,
}));

export const fieldsConfig: IFieldConfig[] = [
  { name: "city", placeholder: "City", hasSuggestion: true, data: cityData },
  {
    name: "country",
    placeholder: "Country",
    hasSuggestion: true,
    data: countryData,
  },
];
