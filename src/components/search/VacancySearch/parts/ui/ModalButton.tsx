interface Props {
  triggerSearch: () => void;
  setisOpen: (val: boolean) => void;
}

export function ModalButton({ setisOpen, triggerSearch }: Props) {
  return (
    <button
      onClick={() => {
        triggerSearch();
        setisOpen(false);
      }}
      className="w-full xl:max-w-[65px] max-xl:w-full max-xl:max-w-[640px] rounded-lg cursor-pointer hover:bg-blue-700 ml-2 bg-blue-600  duration-200 text-white p-2 font-medium"
    >
      Search
    </button>
  );
}
