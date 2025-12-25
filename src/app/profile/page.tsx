"use client";
import { useUserState } from "@/src/store/useUserState";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Profile() {
  const router = useRouter();
  const { user, updatedProfile } = useUserState();
  const [showInputs, setShowInputs] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");

  const [error, setError] = useState("");

  const handleUpdateDataUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameValue.trim() === "" || surnameValue.trim() === "") {
      setError("Заполни всё поля");
      return;
    }

    updatedProfile({
      name: nameValue,
      surname: surnameValue,
    });
    router.back();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {!showInputs && !user?.surname ? (
        <div className="flex flex-col gap-4">
          <h1>Дополните профиль, чтобы быстрее найти работу</h1>
          <button
            className="rounded-lg w-full bg-blue-600 text-white px-2 cursor-pointer"
            onClick={() => setShowInputs(!showInputs)}
          >
            Дополнить профиль
          </button>
        </div>
      ) : (
        <div></div>
      )}

      {showInputs && (
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="enter name"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <input
            type="text"
            placeholder="enter surname"
            value={surnameValue}
            onChange={(e) => setSurnameValue(e.target.value)}
          />
          <span className="text-red-500">{error}</span>
          <button
            type="submit"
            onClick={() => {
              handleUpdateDataUser;
            }}
          >
            continue
          </button>
        </form>
      )}
    </div>
  );
}
