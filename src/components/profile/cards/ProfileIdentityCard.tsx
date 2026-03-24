import { ROUTES } from "@/src/config/router";
import { useAvatarUpload } from "@/src/hooks/user/useAvatarUpload";
import { useUserState } from "@/src/store/useUserState";
import { useUploadThing } from "@/src/utils/uploadthing";
import { PencilIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef } from "react";

interface Props {
  title: string | string[];
  information: string | string[];
  step: number;
  avatarUrl: string;
}

export function ProfileIdentityCard({ information, title, avatarUrl }: Props) {
  const { update } = useSession();
  const fullName = Array.isArray(title) ? title.join(", ") : title;

  const subtitle = Array.isArray(information)
    ? information.join(", ")
    : information;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    return fileInputRef.current?.click();
  };

  const { startUpload, isUploading } = useUploadThing("avatarUploader", {
    onClientUploadComplete: async (res) => {
      const newUrl = res?.[0].url;
      if (!newUrl) return;

      try {
        await fetch("/api/user/avatar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: newUrl }),
        });

        await update();
      } catch {
        return;
      }
    },
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await startUpload([file]);
    }
  };

  return (
    <div className="flex flex-row justify-between p-6 text-main rounded-lg bg-white w-full">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-1">{fullName}</h1>
          <span className="text-sm leading-5">{subtitle}</span>
        </div>

        <Link
          href={ROUTES.PROFILE.PERSONAL}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold text-sm transition-colors"
        >
          <PencilIcon size={16} />
          <span>Edit</span>
        </Link>
      </div>

      <div className="flex-shrink-0 cursor-pointer" onClick={handleImageClick}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full w-[100px] h-[100px] object-cover border border-gray-100"
          />
        ) : (
          <div className="w-[100px] h-[100px] rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold border-2 border-white shadow-inner">
            {title?.[0] || "?"}
          </div>
        )}
      </div>
    </div>
  );
}
