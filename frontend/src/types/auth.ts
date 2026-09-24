export interface RegistrationDataType {
  avatar?: File;
  name: string;
  email: string;
  password: string;
  isPrivacyAgreed: boolean;
}

export interface LoginDataType {
  email: string;
  password: string;
}
