export const variants = {
  hero: "ring-0 ring-transparent focus-within:ring-2 focus-within:ring-blue-600 focus-within:shadow-sm hover:not-focus-within:ring-1 hover:not-focus-within:ring-blue-500/90",
  navbar:
    "hover:border-blue-600 focus-within:border-blue-600 border border-[#a1afc1]",
  default: "border border-gray-300",
} as const;

export type InputVariant = keyof typeof variants;

export const getVariantClasses = (
  variant: InputVariant = "default"
): string => {
  return variants[variant];
};
