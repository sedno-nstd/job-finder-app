"use client";
import {
  ContactField,
  EmailData,
} from "@/src/components/profile/forms/Contacts/contactsData";
import { ROUTES } from "@/src/config/router";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="p-10 text-center animate-pulse">Loading session...</div>
    );
  }

  const contactFields: ContactField[] = [
    {
      label: "Phone",
      value: session?.user?.phone,
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
