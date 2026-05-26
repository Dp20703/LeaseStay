export type RegisterFormData = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

export type RegisterFormErrors = {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type LoginFormErrors = {
  email?: string;
  password?: string;
};