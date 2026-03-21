export function getCurrencySymbol(currency?: string): string {
  switch (currency) {
    case "USD":
      return "$";
    case "EUR":
      return "€";
    case "UAH":
      return "₴";
    default:
      return currency || "";
  }
}
