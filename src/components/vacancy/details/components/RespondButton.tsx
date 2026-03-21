"use client";
import { RespondCreate } from "@/src/actions/common/chat";
import {
  DeleteResponde,
  hasUserApplied,
} from "@/src/actions/applicant/getRespondVacancies";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function Respond({ vacancyId }: { vacancyId: string }) {
  const { data } = useSession();
  const user = data?.user;
  const [isSent, setIsSent] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  useEffect(() => {
    const checkStatus = async () => {
      if (!user?.id) return;

      try {
        const alreadyResponde = await hasUserApplied(vacancyId);
        setIsSent(!!alreadyResponde);
      } catch (err) {
        console.log(err);
      } finally {
        setIsInitialLoading(false);
      }
    };
    checkStatus();
  }, [user?.id, vacancyId]);

  const handleApply = async () => {
    if (!user?.id) throw new Error("User does not exist");

    try {
      await RespondCreate(user.id, vacancyId);
      setIsSent(true);
    } catch (err) {
      console.log(err);
      setIsSent(false);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteResponde = async () => {
    if (!user?.id) throw new Error("User does not exist");

    try {
      await DeleteResponde(vacancyId);
      setIsSent(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (isInitialLoading && !user)
    return (
      <a className="text-red-500 font-bold" href="/applicantRegistration">
        create account
      </a>
    );

  return (
    <div>
      {!isSent ? (
        <button
          className="rounded-lg cursor-pointer bg-blue-600 text-white w-full h-[40px] disabled:bg-blue-400"
          onClick={handleApply}
          disabled={actionLoading || isInitialLoading}
        >
          {actionLoading ? "Sending..." : "Respond"}
        </button>
      ) : (
        <button
          className="rounded-lg cursor-pointer bg-red-600 text-white w-full h-[40px] disabled:bg-red-400"
          onClick={() => {
            handleDeleteResponde();
          }}
          disabled={actionLoading}
        >
          {actionLoading ? "Processing..." : "Unrespond"}
        </button>
      )}
    </div>
  );
}
