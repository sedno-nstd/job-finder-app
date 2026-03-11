export const dynamic = "force-dynamic";
import { EmailConfirmation } from "@/src/components/profile/forms/Contacts/confirmation/Email";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="w-full h-full flex justify-center items-start">
      <Suspense fallback={<div className="mt-10">Loading...</div>}>
        <EmailConfirmation />
      </Suspense>
    </div>
  );
}
