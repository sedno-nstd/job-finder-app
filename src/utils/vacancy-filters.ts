export const getFilteredVacancies = (
  vacancies: any[],
  query: string = "",
  region: string = "",
) => {
  if (!query && !region) return vacancies;

  return vacancies.filter((v) => {
    const matchTitle = v.title.toLowerCase().includes(query.toLowerCase());
    const matchLoc = (v.city + v.country)
      .toLowerCase()
      .includes(region.toLowerCase());
    return matchTitle && matchLoc;
  });
};
