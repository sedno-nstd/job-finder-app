export const ROUTES = {
  HOME: "/",
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
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
} as const;
