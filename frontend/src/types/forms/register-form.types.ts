export type RegisterFormData = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "owner";
};