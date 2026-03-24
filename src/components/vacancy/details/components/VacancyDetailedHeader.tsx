"use client";
import { Vacancy } from "@/src/config/types";
import clsx from "clsx";
import { Heart } from "lucide-react";
import { VacancyAdminMenu } from "./VacancyAdminMenu";
import { AddFavoriteVacancies } from "@/src/actions/applicant/favoriteVacancies";
import { useState } from "react";

interface HeaderProps {
  vacancy: Vacancy;
  isOwner?: boolean;
  initialIsFavorite: boolean;
}

export function VacancyDetailedHeader({
  vacancy,
  isOwner,
  initialIsFavorite,
}: HeaderProps) {
  const [favorite, setFavorite] = useState(initialIsFavorite);
  const handleAddVacancy = async () => {
    const previousState = favorite;
    setFavorite(!previousState);

    try {
      const res = await AddFavoriteVacancies(vacancy.id);

      if (!res.success) {
        setFavorite(previousState);
        console.error("Error to add:", res.error);
      }
    } catch (error) {
      setFavorite(previousState);
      console.error("Сетевая ошибка:", error);
    }
  };

  if (isOwner) {
    return <VacancyAdminMenu vacancyId={vacancy.id} />;
  }

  return (
    <div className="absolute right-6 top-6">
      <span
        className="group hover:bg-[#6380a61A] p-2 rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-center"
        onClick={(e) => {
          e.preventDefault();
          handleAddVacancy();
        }}
      >
        <Heart
          strokeWidth={2.5}
          fill={initialIsFavorite ? "#ef4444" : "none"}
          className={clsx(
            "group-hover:text-black/80 transition-colors duration-200 ",
            initialIsFavorite ? "text-red-500" : "text-[#6380a6]",
          )}
        />
      </span>
    </div>
  );
}
