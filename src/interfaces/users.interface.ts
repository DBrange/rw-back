import { AUTHORIZATION } from "src/constants/roles";

export interface IUser {
  phoneNumber: string;
  email: string;
  altEmail: string;
  password: string;
  address: string;
  role: string;
  authorization: AUTHORIZATION
};
 