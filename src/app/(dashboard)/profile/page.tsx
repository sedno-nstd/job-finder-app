"use client";
import { getFullUserData } from "@/src/actions/applicant/getFullUserData";
import { BasicProfileCard } from "@/src/components/profile/cards/BasicProfileCard";
import { ExperienceCard } from "@/src/components/profile/cards/ExperienceCard";
import { ProfileIdentityCard } from "@/src/components/profile/cards/ProfileIdentityCard";
import { FullPageLoader } from "@/src/components/ui/base/Loader";
import { ROUTES } from "@/src/config/router";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { MainUserData } from "@/src/types/user";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Profile() {
  const { data: session } = useSession();
  const { step } = useOnboardingStore();
  const [data, setData] = useState<MainUserData | undefined>(undefined);
  const profileData = data;

  useEffect(() => {
    const fetchGetData = async () => {
      try {
        const res = await getFullUserData();

        if (res.success && res.data) {
          useOnboardingStore.getState().setFormData(res.data);
        }

        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGetData();
  }, []);

  if (!profileData)
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center z-50">
        <div className="flex flex-col items-center gap-6">
          <FullPageLoader />
          <Link
            href={ROUTES.ON_BOARDING.AUTH}
            className="group flex items-center gap-2 text-blue-600 font-semibold transition-all duration-300 "
          >
            <span className="relative">
              Complete Full Registration
              <span className="absolute -bottom-1 left-0 h-0.5 bg-blue-600 origin-leftscale-x-0 group-hover:scale-x-100transition-transform duration-300" />
            </span>
            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    );

  const user = session?.user;
  return (
    <div className="w-full h-full mt-10 flex flex-col justify-center items-center bg-[#eff2f6] pb-10">
      <div className="max-w-[448px] w-full flex flex-col gap-6">
        <ProfileIdentityCard
          avatarUrl={data.userProfile.customImage || ""}
          step={step}
          title={[data.onBoarding.firstName, data.onBoarding.lastName]}
          information={[data.onBoarding.dateOfBirth, data.onBoarding.location]}
        />
        <BasicProfileCard
          href={ROUTES.PROFILE.CONTACTS.ROOT}
          title="Contacts"
          information={
            <div className="flex flex-col gap-2">
              <span>{data.userProfile.email}</span>
              <span>{data.userProfile.phone}</span>
            </div>
          }
          step={step}
        />
        <BasicProfileCard
          title="What kind of job am I looking for?"
          step={step}
          information={data.onBoarding.desiredJob}
          href={ROUTES.PROFILE.DESIRED_JOB.EDIT}
        />
        <BasicProfileCard
          title="Briefly about me and my skills"
          step={step}
          information={data?.userProfile.aboutMe}
          href={ROUTES.PROFILE.SKILLS}
        />
        <BasicProfileCard
          title="Choise search type"
          step={step}
          information={
            data.onBoarding.searchMode ? (
              <span className="capitalize">
                {data.onBoarding.searchMode} mode
              </span>
            ) : (
              "Your profile will only be visible to those employers..."
            )
          }
          href={ROUTES.PROFILE.SEARCH_TYPE}
        />
        <BasicProfileCard
          title="Desired salary and employment"
          step={step}
          information={`${data.userProfile.salaryAmount} ${data.userProfile.salaryCurrency}
          ${data.onBoarding.employmentType}
          `}
          href={ROUTES.PROFILE.JOB}
        />
        <ExperienceCard
          description={data.onBoarding.experienceDuration}
          href1={ROUTES.PROFILE.EXPIERENCE}
          href2={ROUTES.PROFILE.DESIRED_JOB.EDIT}
          classname="bg-white p-6 rounded-lg"
          title={`Job expierence as ${data.onBoarding.previousPosition} in ${data.onBoarding.lastWorkplace}`}
        />
      </div>
    </div>
  );
}
