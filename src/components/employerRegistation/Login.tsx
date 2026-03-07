"use client";
import { BriefcaseBusiness } from "lucide-react";
import { FormWrapper } from "../shared/FormWrapper";
import { EmployerLoginValue } from "./schema/type";
import { useState } from "react";
import { GetEmployer } from "@/src/actions/employer/user/getEmployer";
import { EmployerLoginData } from "./constans/type";
import clsx from "clsx";
import { ROUTES } from "@/src/config/router";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface Props {
  className?: string;
}

export function Login({ className }: Props) {
  const route = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        console.error("Error sign in", res.error);
        return;
      }

      if (res?.ok) {
        console.log("Success");
        route.push(ROUTES.EMPLOYER.ROOT);
      }
    } catch (err) {
      console.log("Login error:", err);
    }
  };
  return (
    <FormWrapper
      label="Enter for employer"
      className={clsx(
        "w-full text-[#0b0d0e] p-8 flex flex-col justify-center items-center bg-white",
        className,
      )}
    >
      <div className="p-3 sm:p-4 flex flex-row items-center justify-center mb-6 bg-[#e9f3fe] rounded-xl border border-blue-100">
        <BriefcaseBusiness
          size={20}
          strokeWidth={2}
          className="text-blue-500 mr-2 flex-shrink-0"
        />

        <div className="text-sm sm:text-base md:text-lg flex flex-wrap justify-center gap-x-1 font-medium text-gray-800">
          <span>Search job? Go to</span>
          <a
            href="/registration"
            className="text-blue-500 hover:underline font-semibold whitespace-nowrap"
          >
            applicant section
          </a>
        </div>
      </div>
      <div>
        {EmployerLoginData.map((item) => (
          <div className="w-full flex flex-col first:mb-8" key={item.name}>
            <span className="mb-2 font-medium">{item.label}</span>
            <input
              type={item.name === "passrods" ? "password" : "text"}
              name={item.name}
              value={formData[item.name as keyof typeof formData]}
              onChange={handleChange}
              placeholder={item.placeholder}
              className="outline-none h-[48px]  w-full border border-gray-300 px-4 focus:border-blue-500 transition-all"
            />
          </div>
        ))}
      </div>
      <a
        href={ROUTES.EMPLOYER.FORGOTPASSWORD}
        className="text-blue-600 mt-3 flex"
      >
        Forgot password?
      </a>
      <button
        onClick={() => onSubmit()}
        type="button"
        className="w-full h-[48px] mt-6 cursor-pointer bg-blue-500 transition-all duration-200 font-medium hover:bg-blue-600 text-white"
      >
        Sign in to dashboard
      </button>
    </FormWrapper>
  );
}
