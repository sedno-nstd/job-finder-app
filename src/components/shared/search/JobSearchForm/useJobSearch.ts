import { COUNTRY_USER } from "@/src/components/constans/search-data";
import { POPULAR_PROFESSIONS } from "@/src/config/searchOptions";
import { useAutocomplete } from "@/src/hooks/useAutocomplete";
import { useOutsideClick } from "@/src/hooks/useOutsideClick";
import { useUserHistory } from "@/src/hooks/useUserHistory";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const useJobSearch = () => {
  const { t } = useTranslation("profile/search");

  const [isProfFocused, setIsProfFocused] = useState(false);
  const [isLocFocused, setIsLocFocused] = useState(false);

  const professionsData = useMemo(() => {
    return POPULAR_PROFESSIONS.map((p) => ({
      label: p,
      value: p.toLocaleLowerCase(),
    }));
  }, []);
  const profAutocomplete = useAutocomplete({ data: professionsData });

  const isProfAlreadySelected = professionsData.some(
    (item) => item.label === profAutocomplete.query,
  );

  const showProfSuggestions =
    profAutocomplete.query.length > 2 &&
    !isProfAlreadySelected &&
    isProfFocused;

  const regionData = useMemo(() => {
    return COUNTRY_USER.flatMap((country) =>
      country.cities.map((city) => ({
        value: city.toLowerCase(),
        label: city,
        country: country.country,
      })),
    );
  }, []);

  const locAutocomplete = useAutocomplete({ data: regionData });

  const showLocSuggestions = locAutocomplete.query.length > 0 && isLocFocused;

  const { clear, options, setOptions } = useUserHistory();

  const closeAllSearch = () => {
    setIsProfFocused(false);
    setIsLocFocused(false);
  };

  const profRef = useOutsideClick<HTMLDivElement>(() => {
    setIsProfFocused(false);
  });

  const locRef = useOutsideClick<HTMLDivElement>(() => {
    setIsLocFocused(false);
  });
  const selectOption = (item: { profession?: string; region?: string }) => {
    if (item.profession) profAutocomplete.setQuery(item.profession);
    if (item.region) locAutocomplete.setQuery(item.region);

    setOptions({
      profession: item.profession || profAutocomplete.query,
      region: item.region || locAutocomplete.query,
    });

    closeAllSearch();
  };

  return {
    t,
    profRef,
    locRef,
    selectOption,
    handleSearch: () => selectOption({}),
    prof: {
      query: profAutocomplete.query,
      setQuery: profAutocomplete.setQuery,
      suggestions: profAutocomplete.suggestions,
      isFocused: isProfFocused,
      setIsFocused: setIsProfFocused,
      showSuggestions: showProfSuggestions,
      isAlreadySelected: isProfAlreadySelected,
    },
    loc: {
      query: locAutocomplete.query,
      setQuery: locAutocomplete.setQuery,
      suggestions: locAutocomplete.suggestions,
      isFocused: isLocFocused,
      setIsFocused: setIsLocFocused,
      showSuggestions: showLocSuggestions,
    },
    history: {
      options,
      clear,
    },
  };
};
