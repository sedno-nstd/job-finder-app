export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/applicantRegistration",
    EMPLOYER_REG: "/employerRegistration",
  },
  SEARCH: "/search",
  PROFILE: {
    ROOT: "/profile",
    CONTACTS: {
      ROOT: "/profile/contacts",
      EmaiLEdit: "/profile/contacts/change/email",
      PhoneEdit: "/profile/contacts/change/phone",
      EMAILCONFIRMATION: "/profile/contacts/email-confirmation",
    },
    PERSONAL: "/profile/Personal",
    JOB: "/profile/JobExpectations",
    SKILLS: "/profile/SkillsOverview",
    SEARCH_TYPE: "/profile/search-type",
    DESIRED_JOB: {
      EDIT: "/profile/desired-job",
      ADD_WORKED_PLACE: "/profile/desired-job",
    },
    EXPIERENCE: "/profile/job-expierence",
  },
  EMPLOYER: {
    ROOT: "/employer/employerProfile",
    PROFILE: "/employer/profile",
    VACANCIES: "/employer/vacancies-page",
    REGISTRATION: "/employer/employerRegistration/registration",
    LOGIN: "/employer/employerRegistration/login",
    FORGOTPASSWORD: "/employer/employerRegistration/forgot-password",
    RESETPASSWORD: "/employer/employerRegistration/reset-password",
    APPLICANTS: (id: string) => `/employer/vacancies/${id}/applicants`,
  },
  SETTINGS: "/settings",
} as const;
