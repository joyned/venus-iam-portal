import TenantSettingsModel from "../Models/TenantSettingsModel";
import { get, post } from "./RequestService";

const doLogin = (email: string, password: string) => {
  return post("iamAuthentication", { email, password });
};

const getLoginSettings = (clientId: string | null) => {
  return get<TenantSettingsModel>(
    `iamAuthentication/loginPageSettings/${clientId}`,
  );
};

export { getLoginSettings, doLogin };
