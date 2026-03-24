"use client";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { GoogleIcon } from "../parts/GoogleIcon";
import { FormWrapper } from "../../../shared/FormWrapper";
import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/src/config/router";
import { saveOnboardingData } from "@/src/actions/applicant/onboarding";
import { CreateApplicant } from "@/src/actions/applicant/createApplciant";

export default function ApplicantRegistration() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "applicant";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/auth/check-status" });
  };

  const onSubmit = async () => {
    setError("");

    const res = await CreateApplicant(
      formData.email,
      formData.password,
      formData.name,
    );
    if (res.success) {
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        callbackUrl: "/auth/check-status",
      });
    } else {
      setError(res.message || "Something went wrong");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center mt-10 px-4">
      <FormWrapper
        as="div"
        label="Create Applicant Account"
        className="w-full max-w-[450px] p-8 bg-white shadow-xl rounded-3xl border border-gray-100"
      >
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium text-gray-700 mb-6"
        >
          <GoogleIcon />
          Continue with Google
        </button>
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or with email</span>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <span className="block mb-1 text-sm font-medium">Full Name</span>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full h-12 outline-none border border-gray-300 px-4 rounded-lg focus:border-blue-500"
            />
          </div>
          <div>
            <span className="block mb-1 text-sm font-medium">Email</span>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full h-12 outline-none border border-gray-300 px-4 rounded-lg focus:border-blue-500"
            />
          </div>
          <div>
            <span className="block mb-1 text-sm font-medium">Password</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full h-12 outline-none border border-gray-300 px-4 rounded-lg focus:border-blue-500"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        <button
          onClick={onSubmit}
          className="w-full cursor-pointer h-12 mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all"
        >
          Sign Up
        </button>
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href={ROUTES.AUTH.LOGIN}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </FormWrapper>
    </div>
  );
}
