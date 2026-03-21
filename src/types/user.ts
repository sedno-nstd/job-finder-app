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

export interface DetailInfo {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  resumeUrl?: string | null;
  location: string;
  gender: string;
  dateOfBirth: string;
  readyToRelocate: boolean;
  readyForWorkAbroad: boolean;
  desiredJob: string[];
  jobType: string[];
  lastWorkplace: string;
  previousPosition: string;
  experienceDuration: string;
  searchMode: string;
  role: string;
  isCompleted: boolean;
  customImage?: string | null;
  salaryAmount?: string | null;
  salaryCurrency: string;
  salaryPeriod: string;
  aboutMe?: string | null;
}

export interface ApplicantResponse {
  id: string;
  createdAt: Date;
  status: string;
  message: string | null;
  applicant: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    detailInfo: DetailInfo | null;
  };
}

export interface UserProfile {
  customImage?: string | null;

  salaryAmount?: string;
  salaryCurrency?: "USD" | "EUR" | "UAH";
  salaryPeriod?: "year" | "month" | "hour";

  aboutMe?: string;

  phone?: string | null;
}

export interface MainUserData {
  onBoarding: OnboardingData;
  userProfile: UserProfile;
}
