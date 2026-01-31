"use client";
import { ROUTES } from "@/src/config/router";
import { Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function EmailConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  const handleOpenEmail = () => {
    const domain = email?.split("@")[1]?.toLowerCase();
    let url = "https://";

    if (domain?.includes("gmail.com")) {
      url = "https://mail.google.com/";
    } else if (
      domain?.includes("outlook.com") ||
      domain?.includes("hotmail.com")
    ) {
      url = "https://outlook.live.com/";
    } else if (domain?.includes("mail.ru")) {
      url = "https://e.mail.ru/";
    } else if (domain?.includes("yandex.ru")) {
      url = "https://mail.yandex.ru/";
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSkip = () => {
    router.push(ROUTES.PROFILE.CONTACTS.ROOT);
  };

  return (
    <div className="w-full flex flex-col max-w-[448px]">
      <div className="max-w-[448px] mt-10 rounded-lg  py-8 px-6 flex flex-col text-main justify-center bg-white">
        <div className="flex justify-start flex-col ">
          <div className="flex justify-center items-center mb-8">
            <div className="bg-blue-50 p-6 rounded-full flex items-center justify-center">
              <Mail size={40} className="text-blue-600" />
            </div>
          </div>
          <div className="w-full flex justify-center">
            <h1 className="text-2xl font-bold mb-4">
              Follow the link in the email
            </h1>
          </div>

          <p className="mb-6">
            Confirmation email to get new vacancies. <br />
            We sent an email to <strong>{email}</strong>
          </p>

          <button
            onClick={() => handleOpenEmail()}
            className="w-full cursor-pointer bg-blue-600 h-[40px] hover:bg-blue-700 disabled:bg-gray-200  text-white rounded-lg transition-all font-medium"
          >
            Open Email
          </button>

          <input type="text" />
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={() => handleSkip()}
          className="w-full font-medium text-blue-600 hover:text-blue-700"
        >
          Skip
          <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-blue-600 transition-all duration-300 ease-out -translate-x-1/2 group-hover:w-full" />
        </button>
      </div>
    </div>
  );
}
