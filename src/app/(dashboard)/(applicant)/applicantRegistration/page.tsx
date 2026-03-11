"use client";
export const dynamic = "force-dynamic";
import { EmployerRegistration } from "@/src/components/employerRegistation/Registration";
import { OnBoarding } from "@/src/components/onboarding/OnBoarding";
import ApplicantRegistration from "@/src/components/registration/applicant/ApplicantRegistration";
import { useUserState } from "@/src/store/useUserState";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function RegistrationContent() {
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

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <RegistrationContent />
    </Suspense>
  );
}
