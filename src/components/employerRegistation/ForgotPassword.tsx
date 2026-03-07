"use client";
import { useState } from "react";
import { FormWrapper } from "../shared/FormWrapper";
import { requestPasswordReset } from "@/src/actions/employer/user/EmployerPasswordReset";

export function ForgotPassword() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handeUpdate = async () => {
    setError(false);
    setIsSent(false);
    try {
      const res = await requestPasswordReset(value);

      if (!res) throw new Error("Failed to find your emil");
      if (res?.success) {
        setIsSent(true);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  return (
    <FormWrapper
      className="w-full h-full bg-white py-8 "
      label="Password restore"
    >
      <span className="text-wrap">
        If you've forgotten your password, enter the email address you used
        during registration. We’ll send you a link to reset it.
      </span>
      <input
        type="text"
        name=""
        id=""
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-[48px] border outline-none duration-200 transition-all border-gray-300 w-full hover:border-blue-500 focus:border-blue-500 px-3 mt-4"
        placeholder="Email"
      />
      {error && (
        <span className="text-sm font-medium text-red-500">
          Something went wrong. Try again.
        </span>
      )}

      {isSent && (
        <span className="text-sm font-medium text-green-600">
          Email sent! Check your inbox.
        </span>
      )}
      <div className="w-full flex justify-end mt-6">
        <button
          type="button"
          onClick={() => handeUpdate()}
          className="h-[46px] rounded-sm duration-200 transition-all bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 font-medium cursor-pointer"
        >
          Sent the letter
        </button>
      </div>
    </FormWrapper>
  );
}
