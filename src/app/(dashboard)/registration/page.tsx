"use client";
import { OnBoarding } from "@/src/components/onboarding/OnBoarding";
import ApplicantRegistration from "@/src/components/registration/applicant/ApplicantRegistration";
import { useUserState } from "@/src/store/useUserState";
import { useSession } from "next-auth/react";

export default function Registration() {
  const { isFullRegistration } = useUserState();
  const { data: session, status } = useSession();

  // if (status === "loading") return <div>Loading...</div>;

  if (!session) {
    return <ApplicantRegistration />;
  }

  return (
    <div className="h-full w-full bg-[#eff2f6] flex flex-col">
      {isFullRegistration ? <OnBoarding /> : <ApplicantRegistration />}
    </div>
  );
}
