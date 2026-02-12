interface IVacancy {
  title: string;
  city?: string;
  country: string;
  id: string;
}

interface Props {
  vacancy: IVacancy[];
  query: string;
  region: string;
}

export function UseVacanciesCount({ vacancy, query, region }: Props) {
  const q = query.trim().toLowerCase();
  const r = region.trim().toLowerCase();

  const mathMavancies = vacancy.filter((item) => {
    const mathtitle = !q || item.title.toLowerCase().includes(q);

    const fullLoc = `${item.city}, ${item.country}`.toLowerCase();

    const matchRegion =
      !r ||
      fullLoc.includes(r) ||
      item.city?.toLowerCase().includes(r) ||
      item.country.toLowerCase().includes(r);
    return mathtitle && matchRegion;
  });
  return { count: mathMavancies.length };
}
