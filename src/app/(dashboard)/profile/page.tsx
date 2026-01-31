"use client";
import { BasicProfileCard } from "@/src/components/profile/BasicProfileCard";
import { ProfileIdentityCard } from "@/src/components/profile/ProfileIdentityCard";
import { ROUTES } from "@/src/config/router";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  const { formData, step } = useOnboardingStore();
  const user = session?.user;
  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#eff2f6]">
      <div className="max-w-[448px] flex flex-col gap-6">
        <ProfileIdentityCard
          avatarUrl={formData?.userProfile?.customImage}
          step={step}
          title={[formData.onBoarding.firstName, formData.onBoarding.lastName]}
          information={[
            formData.onBoarding.dateOfBirth,
            formData.onBoarding.location,
          ]}
        />
        <BasicProfileCard
          href={ROUTES.PROFILE.CONTACTS.ROOT}
          title="Contacts"
          information={user?.email}
          step={step}
        />
        <BasicProfileCard
          title="What kind of job am I looking for?"
          step={step}
          information={formData.onBoarding.desiredJob}
        />
        <BasicProfileCard
          title="Briefly about me and my skills"
          step={step}
          information="."
          href="/profile/SkillsOverview"
        />
        <BasicProfileCard
          title="Choise search type"
          step={step}
          information="Your profile will only be visible to those employers whose vacancies you applied for."
        />
        <BasicProfileCard
          title="Desired salary and employment"
          step={step}
          information={formData.onBoarding.employmentType}
          href="profile/JobExpectations"
        />
      </div>
    </div>
  );
}
