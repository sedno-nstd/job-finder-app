"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mic } from "lucide-react";
import { useForm } from "react-hook-form";
import { AboutSchema, AboutValue } from "../../schemas/About";
import { saveOnboardingData } from "@/src/actions/onboarding";
import { MainUserData } from "@/src/types/user";
import { useRouter } from "next/navigation";

export function SkillsOverview() {
  const { formData } = useOnboardingStore();
  const router = useRouter();

  const methods = useForm<AboutValue>({
    mode: "onSubmit",
    resolver: zodResolver(AboutSchema),
    defaultValues: {
      about: formData.userProfile.aboutMe || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: AboutValue) => {
    const currentStore = useOnboardingStore.getState();
    const currentFormData = currentStore.formData;

    try {
      const fullDataToSave: MainUserData = {
        ...currentFormData,
        userProfile: {
          ...currentFormData.userProfile,
          aboutMe: data.about,
        },
      };
      const result = await saveOnboardingData(fullDataToSave);

      if (result.success) {
        router.push("./");
      } else {
        console.log(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-6 pt-8 pb-8 w-full rounded-lg max-w-[448px] text-main bg-white flex flex-col"
    >
      <label
        htmlFor=""
        className="text-main text-2xl mb-4 max-w-[400px] text-wrap"
      >
        Long story short what employeer need to know about you and your skills
      </label>
      <div className="w-full h-full relative mb-2">
        <textarea
          id=""
          {...register("about")}
          className="border border-[#5a6f87] h-[150px] relative px-2 pt-2 w-full resize-none outline-none overflow-hidden"
        ></textarea>
        <div className="absolute left-2 bottom-2 flex flex-row gap-2 items-center cursor-pointer">
          <Mic size={18} className="text-blue-600" />
          <span className="text-lg text-blue-600 font-medium">Append</span>
        </div>
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="flex-1 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg py-2 transition-all font-medium"
      >
        Save
      </button>
    </form>
  );
}
