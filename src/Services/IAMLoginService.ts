import TenantSettingsModel from "../Models/TenantSettingsModel";
import { get } from "./RequestService";

const getLoginSettings = (clientId: string | null) => {
  return get<TenantSettingsModel>(
    `iamAuthentication/loginPageSettings/${clientId}`,
  );
};

export { getLoginSettings };
