"use client";
import { Vacancy } from "@/src/config/types";
import { useAuthVacancy } from "@/src/store/useFavorites";
import { useUserState } from "@/src/store/useUserState";
import clsx from "clsx";
import { Heart } from "lucide-react";

interface HeaderProps {
  vacancy: Vacancy;
}

export function VacancyDetailedHeader({ vacancy }: HeaderProps) {
  const { tooggleFavorites, isFavorite } = useAuthVacancy();
  const favorite = isFavorite(vacancy.id);

  return (
    <div className="absolute right-6 top-6">
      <span
        className="group hover:bg-[#6380a61A] p-2 rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          tooggleFavorites(vacancy);
        }}
      >
        <Heart
          strokeWidth={2.5}
          fill={favorite ? "#ef4444" : "none"}
          className={clsx(
            "group-hover:text-black/80 transition-colors duration-200 ",
            favorite ? "text-red-500" : "text-[#6380a6]"
          )}
        />
      </span>
    </div>
  );
}
