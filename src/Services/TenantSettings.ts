import TenantSettingsModel from "../Models/TenantSettingsModel";
import { get, post } from "./RequestService";

const getTenantSettings = () => {
  return get<TenantSettingsModel>(`tenantSettings`);
};

const saveTenantSettings = (tenantSettings: TenantSettingsModel) => {
  return post<TenantSettingsModel>(`tenantSettings`, tenantSettings);
};

export { getTenantSettings, saveTenantSettings };
