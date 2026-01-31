export interface OnboardingData {
  role: string;
  firstName: string;
  lastName: string;

  gender: string;
  dateOfBirth: string;
  location: string;
  readyToRelocate: boolean;
  relocationLocations: string[];
  readyForWorkAbroad: boolean;

  desiredJob: string[];
  employmentType: string[];
  lastWorkplace: string;
  previousPosition: string;
  experienceDuration: string;
  searchMode: string;

  resume: {
    url: string;
    name: string;
    size: string;
  } | null;
  continueWithoutResume: boolean;
}

export interface UserProfile {
  customImage?: string | null;

  salaryAmount?: string;
  salaryCurrency?: "USD" | "EUR" | "UAH";
  salaryPeriod?: "hour" | "month" | "year";

  aboutMe?: string;

  phone?: string | null;
}

export interface MainUserData {
  onBoarding: OnboardingData;
  userProfile: UserProfile;
}
