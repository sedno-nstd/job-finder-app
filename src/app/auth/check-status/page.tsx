"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getFullUserData } from "@/src/actions/applicant/getFullUserData";

export default function CheckStatusPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const checkUser = async () => {
        try {
          const res = await getFullUserData();
          console.log("CheckStatus result:", res);

          if (res.success && res.data?.onBoarding) {
            router.push("/vacancies");
          } else {
            router.push("/onBoarding");
          }
        } catch (err) {
          console.error("Critical error in checkUser:", err);
        }
      };
      checkUser();
    }

    if (status === "unauthenticated") {
      router.push("/applicantRegistration");
    }
  }, [status, router]);

  return (
    <div className="flex items-center justify-center min-h-screen font-medium">
      Checking profile status...
    </div>
  );
}
