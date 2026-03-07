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
  },
  EMPLOYER: {
    ROOT: "/employerProfile",
    // PROFILE: "/employer/profile",
    VACANCIES: "/employer/vacancies",
    APPLICANTS: "/employer/applicants",
    REGISTRATION: "/employerRegistration/registration",
    LOGIN: "/employerRegistration/login",
    FORGOTPASSWORD: "/employerRegistration/forgot-password",
    RESETPASSWORD: "/employerRegistration/reset-password",
  },
  SETTINGS: "/settings",
} as const;
