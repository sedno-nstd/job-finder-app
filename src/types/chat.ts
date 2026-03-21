export interface Chat {
  id: string;
  userId: string;
  employerId: string;
  user: any;
  employer: any;
  messages: {
    text: string;
    createdAt: Date;
  }[];
}
