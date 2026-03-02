"use client";
import { useAvatarUpload } from "@/src/hooks/user/useAvatarUpload";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { Camera, PlusIcon, Trash2 } from "lucide-react";
import { useRef } from "react";

export function UploadAvatar() {
  const { formData, updatedFields } = useOnboardingStore();
  const { startUpload } = useAvatarUpload();
  const imageInput = useRef<HTMLInputElement>(null);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      await startUpload([file]);
    }
  };

  const handleDeletePhoto = () => {
    updatedFields("userProfile", { customImage: null });

    if (imageInput.current) imageInput.current.value = "";
  };

  return (
    <div className="w-full h-full flex text-main pt-2 mb-6">
      <div className="flex flex-row w-full justify-between">
        <div className="max-w-[276px] text-wrap flex flex-col">
          <h1 className="font-medium text-sm mb-2">Business Photo</h1>
          <span className="text-secondary text-sm mb-4 font-medium">
            Do not use vacation photos or photos with brother people in the
            frame.
          </span>
          {formData.userProfile.customImage ? (
            <div className="flex flex-col justify-between gap-4">
              <button
                className="text-blue-600 flex flex-row items-center cursor-pointer"
                onClick={() => imageInput.current?.click()}
              >
                <span className="mr-2">
                  <Camera size={20} />
                </span>
                <span className="text-md font-semibold ">
                  Select other photo
                </span>
              </button>
              <button
                className="text-red-600 flex flex-row items-center cursor-pointer"
                onClick={() => handleDeletePhoto()}
              >
                <span className="mr-2">
                  <Trash2 size={20} />
                </span>
                <span className="text-md font-semibold ">Delete photo</span>
              </button>
            </div>
          ) : (
            <button
              className="text-blue-600 flex flex-row gap-2 cursor-pointer"
              onClick={() => imageInput.current?.click()}
            >
              <span className="p-1 w-5 h-5 rounded-full items-center justify-center flex bg-blue-600">
                <PlusIcon size={14} className="text-white" strokeWidth={4} />
              </span>
              <span className="text-sm font-semibold">Add photo</span>
            </button>
          )}
        </div>
        <input
          type="file"
          name=""
          id=""
          className="hidden"
          ref={imageInput}
          onChange={handleUploadImage}
          accept="image"
        />
        <div onClick={() => imageInput.current?.click()}>
          {formData.userProfile.customImage ? (
            <img
              src={formData.userProfile.customImage}
              alt="user-avatar"
              className="w-[100px] h-[100px] rounded-full cursor-pointer border"
            />
          ) : (
            <div className="bg-[#e9f3fe] rounded-full w-[100px] h-[100px] flex items-center justify-center">
              <Camera size={32} className="text-blue-600" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
