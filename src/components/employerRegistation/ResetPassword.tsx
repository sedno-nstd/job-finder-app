"use client";
import { useState } from "react";
import { FormWrapper } from "../shared/FormWrapper";
import { verifyAndResetPassword } from "@/src/actions/employer/user/EmployerPasswordReset";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface Props {
  token?: string;
  className?: string;
}

export function ResetPassword({ className, token }: Props) {
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();
  const [status, setStatus] = useState<{
    type: "error" | "success" | null;
    msg: string;
  }>({
    type: null,
    msg: "",
  });

  const handleUpdate = async () => {
    setStatus({ type: null, msg: "" });
    try {
      const res = await verifyAndResetPassword(token, newPassword);

      if (res.success) {
        setStatus({ type: "success", msg: "Password successfully updated!" });
        setTimeout(() => {
          router.push("/employer");
        }, 2000);
      } else {
        setStatus({ type: "error", msg: res.error || "Invalid token" });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Server error. Try again later." });
    }
  };

  return (
    <FormWrapper
      label="Reset your password"
      className={clsx("py-8", className)}
    >
      <p className="text-sm text-gray-500 mb-4">
        Please enter your new password below.
      </p>

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="h-[48px] border border-gray-300 w-full px-3 focus:border-blue-500 outline-none transition-all"
      />

      {status.msg && (
        <p
          className={`mt-2 text-sm ${status.type === "error" ? "text-red-500" : "text-green-600"}`}
        >
          {status.msg}
        </p>
      )}

      <button
        onClick={handleUpdate}
        className="w-full h-[46px] bg-blue-500 text-white mt-6 hover:bg-blue-600 transition-all font-medium rounded-sm cursor-pointer"
      >
        Update Password
      </button>
    </FormWrapper>
  );
}
