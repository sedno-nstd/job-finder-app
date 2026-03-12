import { OnBoarding } from "@/src/components/onboarding/OnBoarding";
import { Suspense } from "react";
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div>Loading onboarding...</div>}>
        <OnBoarding />
      </Suspense>
    </div>
  );
}
