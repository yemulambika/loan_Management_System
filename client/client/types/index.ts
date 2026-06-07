export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  stage: string;
  hasLoan: boolean;
};
