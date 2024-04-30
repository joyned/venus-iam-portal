import { post } from "./RequestService";

const doInternalLogin = (email: string, password: string) => {
  return post("internalAuthentication/login", { email, password });
};

export { doInternalLogin };
