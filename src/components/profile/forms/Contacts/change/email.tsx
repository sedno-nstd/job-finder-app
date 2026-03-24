"use client";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EmailSchema, EmailValue } from "../../../schemas/Email";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { InfoIcon } from "lucide-react";
import { ROUTES } from "@/src/config/router";
import { RequestEmailUpdate } from "@/src/actions/common/request-email/requestEmail";

export function EmailSection() {
  const { data: session } = useSession();
  const router = useRouter();

  const methods = useForm<EmailValue>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: session?.user.email || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const currentUserEmail = session?.user.email;

  const onSubmit = async (data: EmailValue) => {
    if (currentUserEmail?.trim() === data.email) {
      methods.setError("email", { message: "You already own this email" });
      return;
    }
    const res = await RequestEmailUpdate(data.email);

    if (res.success) {
      router.push(
        `${ROUTES.PROFILE.CONTACTS.EMAILCONFIRMATION}?email=${data.email}`,
      );
    } else {
      methods.setError("email", { message: res.error });
    }
  };

  return (
    <div className="max-w-[448px] w-full bg-white rounded-lg mt-10">
      <FormWrapper
        className="py-6"
        onSubmit={handleSubmit(onSubmit)}
        label="Specify new Email"
      >
        <div className="w-full flex justify-center flex-col px-6">
          <div className="w-full mb-8 px-4 py-4 bg-[#6380a61a] rounded-lg flex justify-start items-center">
            <div className="flex items-center gap-3 text-main text-sm md:text-base">
              <InfoIcon size={24} className="text-[#5a6f87] shrink-0" />
              <p className="font-normal text-base leading-6 font-sans">
                Notifications will be sent to your new email
              </p>
            </div>
          </div>
          <input
            {...register("email")}
            className="border border-input-border px-3 text-main outline-none rounded-md h-[40px] max-w-[400px] focus:border-blue-600 focus:ring-4 focus:ring-blue-600/20"
          />
          {errors.email && (
            <div>
              <span className="text-red-500 text-xs mt-1 px-1">
                {errors.email.message}
              </span>
            </div>
          )}
        </div>
      </FormWrapper>
    </div>
  );
}
