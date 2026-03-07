"use client";
import { EmployerRegistration } from "@/src/components/employerRegistation/Registration";
import { OnBoarding } from "@/src/components/onboarding/OnBoarding";
import ApplicantRegistration from "@/src/components/registration/applicant/ApplicantRegistration";
import { useUserState } from "@/src/store/useUserState";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Registration() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const { isFullRegistration } = useUserState();
  const { data: session } = useSession();

  if (session && isFullRegistration) {
    return <OnBoarding />;
  }

  if (role === "employer") {
    return <EmployerRegistration />;
  }

  return <ApplicantRegistration />;
}
