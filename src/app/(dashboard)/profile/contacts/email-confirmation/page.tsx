export const dynamic = "force-dynamic";
import { EmailConfirmation } from "@/src/components/profile/forms/Contacts/confirmation/Email";

export default function Page() {
  return (
    <div className="w-full h-full flex justify-center items-start">
      <EmailConfirmation />
    </div>
  );
}
