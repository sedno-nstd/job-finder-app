"use client";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { ROUTES } from "@/src/config/router";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ApplicationLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push(ROUTES.VACANCIES);
      router.refresh();
    } catch (err) {
      console.error("Login client error:", err);
    }
  };
  return (
    <div className="h-full w-full flex items-center justify-center mt-10 px-4">
      <FormWrapper
        as="div"
        label="Create Applicant Account"
        className="w-full max-w-[450px] p-8 bg-white shadow-xl rounded-3xl border border-gray-100"
      >
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
          Log in
        </button>
        <p className="text-center mt-6 text-sm text-gray-600">
          Haven't an account?{" "}
          <Link
            href={ROUTES.AUTH.REGISTER}
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </FormWrapper>
    </div>
  );
}
