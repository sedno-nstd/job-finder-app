import { useMemo, useState } from "react";

interface Options {
  label: string;
  value: string;
}

interface Props {
  data: Options[];
}

export function useAutocomplete({ data }: Props) {
  const [query, setQuery] = useState("");

  const suggestions = useMemo(() => {
    const finalData = data
      ?.filter((item) => {
        return item.label.toLowerCase().includes(query.toLocaleLowerCase());
      })

      .sort((a, b) => {
        const lowA = a.value.toLocaleLowerCase();
        const lowB = b.value.toLocaleLowerCase();

        const startA = lowA.startsWith(query.toLowerCase());
        const startB = lowB.startsWith(query.toLowerCase());

        if (startA && !startB) return -1;
        if (startB && !startA) return 1;

        return lowA.localeCompare(lowB);
      })
      .slice(0, 10);

    return finalData;
  }, [data, query]);
  return {
    query,
    setQuery,
    suggestions,
  };
}
