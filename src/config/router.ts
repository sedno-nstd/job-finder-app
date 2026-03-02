export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/registration",
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
  },
  EMPLOYER: {
    ROOT: "/employer",
    PROFILE: "/employer/profile",
    VACANCIES: "/employer/vacancies",
    APPLICANTS: "/employer/applicants",
  },
  SETTINGS: "/settings",
} as const;
