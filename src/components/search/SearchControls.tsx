"use client";
import { useTranslation } from "react-i18next";
import { useJobSearch } from "@/src/hooks/useJobSearch";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useSpeechToText } from "@/src/hooks/user/useSpeechToText";
import { SearchResponsive } from "./VacancySearch/parts/ModalSection";
import { LocationSearchField } from "./VacancySearch/parts/Inputs/LocationSearchField";
import { ProfSearchField } from "./VacancySearch/parts/Inputs/ProfSearchField";
import { ModalButton } from "./VacancySearch/parts/ui/ModalButton";
import { useUserState } from "@/src/store/useUserState";
import { useSearchStore } from "@/src/store/useSearchStore";

interface Props {
  openModal: boolean;
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function VacancySearch({ openModal, setisOpen }: Props) {
  const { isListening, startListening } = useSpeechToText("en-US");
  const { prof, loc, locRef, profRef, selectOption, handleSearch } =
    useJobSearch();
  const { triggerSearch } = useSearchStore();
  const { t } = useTranslation("common");
  const [isMounted, setIsMounted] = useState(false);

  const handleVoiceAppend = () => {
    if (isListening) return;

    startListening((transcript) => {
      const newQuery = `${prof.query} ${transcript}`.trim();
      prof.setQuery(newQuery);
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, [isMounted]);

  const SearchFields = (isMobile: boolean) => (
    <div
      className={clsx(
        "flex h-full items-center justify-start pr-2",
        "flex",
        isMobile
          ? "flex-col w-full gap-4 p-4"
          : "flex-row w-fit bg-white rounded-lg",
      )}
    >
      <div
        className="relative w-full xl:w-[436px] h-[56px] max-w-[640px]"
        ref={profRef}
      >
        <ProfSearchField
          handleVoiceAppend={handleVoiceAppend}
          isMounted={isMounted}
          prof={prof}
          selectOption={selectOption}
          t={t}
          isMobile={isMobile}
        />
      </div>
      {!isMobile && (
        <div className="mx-1.5 min-w-[1px] py-0.5 bg-gray-400/70 h-[37px] w-[1px]" />
      )}
      <div
        className={clsx(
          "relative h-[56px]  w-full max-w-[640px] xl:w-[436px] ",
          isMobile ? "block" : "max-xl:hidden",
        )}
        ref={locRef}
      >
        <LocationSearchField
          isMounted={isMounted}
          loc={loc}
          locationQuery={loc.query}
          t={t}
          isMobile={isMobile}
        />
      </div>
      <ModalButton
        setisOpen={setisOpen}
        triggerSearch={() => {
          (handleSearch(), triggerSearch());
        }}
      />
    </div>
  );

  return (
    <>
      <SearchResponsive
        SearchFields={SearchFields}
        openModal={openModal}
        setisOpen={setisOpen}
        t={t}
      />
    </>
  );
}
