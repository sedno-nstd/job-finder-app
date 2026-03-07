import { Vacancy } from "../config/types";
export interface EmployerRegistration {
  email: string;
  name: string;
  password: string;
  companyName: string;
  phone: string;
}

export interface Employer {}

export interface ApplicationWithApplicant {
  id: string;
  status: string;
  createdAt: Date;
  applicant: {
    id: string;
    name: string | null;
    image: string | null;
    email?: string;
  };
}

export interface EmployerVacancy extends Vacancy {
  views: number;
  expiresAt: Date;
  application: ApplicationWithApplicant[];
}
