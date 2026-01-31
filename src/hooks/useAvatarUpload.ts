import { useOnboardingStore } from "../store/useOnboardingStore";
import { useUploadThing } from "../utils/uploadthing";

export function useAvatarUpload() {
  const { updatedFields } = useOnboardingStore();

  const { isUploading, startUpload } = useUploadThing("avatarUploader", {
    onClientUploadComplete: async (res) => {
      const newUrl = res?.[0].url;
      if (!newUrl) return;

      updatedFields("userProfile", { customImage: newUrl });
    },
  });
  return { isUploading, startUpload };
}
