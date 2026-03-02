import { COUNTRY_USER } from "@/src/components/constans/search-data";
import { POPULAR_PROFESSIONS } from "@/src/config/searchOptions";
import { useAutocomplete } from "@/src/hooks/vacancy/useAutocomplete";
import { useOutsideClick } from "@/src/hooks/ui/useOutsideClick";
import { useUserHistory } from "@/src/hooks/user/useUserHistory";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchStore } from "../store/useSearchStore";

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
        label: `${city}, ${country.country}`,
        country: country.country,
        searchStr: `${city} ${country.country}`.toLowerCase(),
      })),
    );
  }, []);

  const locAutocomplete = useAutocomplete({ data: regionData });

  const isLocAlreadySelected = regionData.some(
    (item) => item.label === locAutocomplete.query,
  );

  const showLocSuggestions =
    locAutocomplete.query.length > 0 && !isLocAlreadySelected && isLocFocused;

  const { clear, options, setOptions } = useUserHistory();
  const searchStore = useSearchStore();

  useEffect(() => {
    if (searchStore.searchQuery && !profAutocomplete.query) {
      profAutocomplete.setQuery(searchStore.searchQuery);
    }
    if (searchStore.locationQuery && !locAutocomplete.query) {
      locAutocomplete.setQuery(searchStore.locationQuery);
    }
  }, [
    locAutocomplete.query,
    searchStore.searchQuery,
    searchStore.locationQuery,
  ]);

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
    const newProf = item.profession ?? profAutocomplete.query;
    const newLoc = item.region ?? locAutocomplete.query;

    if (!newProf.trim() && !newLoc.trim()) return;

    if (item.profession) profAutocomplete.setQuery(item.profession);
    if (item.region) locAutocomplete.setQuery(item.region);

    setOptions({
      profession: newProf,
      region: newLoc,
    });

    searchStore.setSearchQuery(newProf);
    searchStore.setLocationQuery(newLoc);
    searchStore.triggerSearch();

    closeAllSearch();
  };

  const clearInputsValue = () => {
    locAutocomplete.query === "";
    profAutocomplete.query === "";

    searchStore.resetFilters();

    closeAllSearch();
  };

  return {
    t,
    profRef,
    locRef,
    selectOption,
    regionData,
    professionsData,
    handleSearch: () => selectOption({}),
    clearInputsValue,
    prof: {
      query: profAutocomplete.query,
      setQuery: (val: string) => {
        profAutocomplete.setQuery(val);
        searchStore.setSearchQuery(val);
      },
      suggestions: profAutocomplete.suggestions,
      isFocused: isProfFocused,
      setIsFocused: setIsProfFocused,
      showSuggestions: showProfSuggestions,
      isAlreadySelected: isProfAlreadySelected,
    },
    loc: {
      query: locAutocomplete.query,
      setQuery: (val: string) => {
        locAutocomplete.setQuery(val);
        searchStore.setLocationQuery(val);
      },
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
