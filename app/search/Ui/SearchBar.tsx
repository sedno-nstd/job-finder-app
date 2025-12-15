interface SearchBarProps {
  search: string;
  setSearch: (v: string) => void;
}

export function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="flex gap-2 p-3 rounded-xl bg-white w-full max-w-md">
      <input
        type="text"
        value={search}
        placeholder="Search..."
        className="border py-1 pl-2 pr-5 rounded flex-1"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="cursor-pointer bg-blue-500 text-white px-3 rounded">
        Search
      </button>
    </div>
  );
}
