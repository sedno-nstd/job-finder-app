"use client";
import clsx from "clsx";
import { FormWrapper } from "../../../shared/FormWrapper";
import Link from "next/link";

export interface ContactField {
  href: string;
  label: string;
  value: string | null | undefined;
  hasBorderBot: boolean;
}

interface Props {
  fields: ContactField[];
}

export function EmailData({ fields = [] }: Props) {
  return (
    <FormWrapper
      hasButton={false}
      buttonText="Save"
      className="max-w-[448px] bg-white mt-10"
      label="Contacts"
    >
      {fields.map((item, index) => (
        <div
          key={index}
          className={clsx(
            "p-6 flex flex-col ",
            item.hasBorderBot && "border-b border-gray-200",
          )}
        >
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <label className="text-lg font-medium">{item.label}</label>
              <span>{item.value || "Not provided"}</span>
            </div>
            <div>
              <Link className="text-blue-600 text-[17px]" href={item.href}>
                Change
              </Link>
            </div>
          </div>
        </div>
      ))}
    </FormWrapper>
  );
}
