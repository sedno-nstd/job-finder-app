export function HeaderSection() {
  return (
    <div
      className="flex flex-col pt-8  shrink-0 gap-3 mb-2
      max-sm:mt-6 sm:mt-5
      "
    >
      <label className="text-2xl font-bold cursor-text md:text-3xl">
        What job are you looking for?
      </label>
      <span className="text-[17px]">Up to 20 keywords</span>
    </div>
  );
}
