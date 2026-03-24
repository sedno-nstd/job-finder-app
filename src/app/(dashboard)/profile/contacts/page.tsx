"use client";
import { FindApplicantPhone } from "@/src/actions/applicant/phone/getApplicantPhone";
import {
  ContactField,
  EmailData,
} from "@/src/components/profile/forms/Contacts/contactsData";
import { FullPageLoader } from "@/src/components/ui/base/Loader";
import { ROUTES } from "@/src/config/router";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session, status } = useSession();
  const [livePhone, setLivePhone] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhone = async () => {
      if (session?.user?.email) {
        const res = await FindApplicantPhone();

        if (res && "phone" in res && res.phone) {
          setLivePhone(res.phone);
        }
      }
    };
    fetchPhone();
  }, [session]);

  if (status === "loading") return <FullPageLoader />;
  const contactFields: ContactField[] = [
    {
      label: "Phone",
      value: livePhone || session?.user?.phone,
      href: ROUTES.PROFILE.CONTACTS.PhoneEdit,
      hasBorderBot: true,
    },
    {
      label: "Email",
      value: session?.user?.email,
      href: ROUTES.PROFILE.CONTACTS.EmaiLEdit,
      hasBorderBot: false,
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-start">
      <EmailData fields={contactFields} />
    </div>
  );
}
