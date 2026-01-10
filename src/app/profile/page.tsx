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
      {!showInputs && !user ? (
        <div className="flex flex-col gap-4">
          <h1>Complete your profile to find a job faster</h1>
          <button
            className="rounded-lg w-full bg-blue-600 text-white px-2 cursor-pointer"
            onClick={() => setShowInputs(!showInputs)}
          >
            Update profile
          </button>
        </div>
      ) : (
        <form className="flex flex-col gap-3" onSubmit={handleUpdateDataUser}>
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Имя"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Фамилия"
            value={surnameValue}
            onChange={(e) => setSurnameValue(e.target.value)}
          />
          {error && <span className="text-red-500">{error}</span>}
          <button type="submit" className="bg-green-600 text-white p-2 rounded">
            Save and back
          </button>
        </form>
      )}
    </div>
  );
}
