import TenantSettingsModel from "../Models/TenantSettingsModel";
import { get, post } from "./RequestService";

const getTenantSettings = () => {
  return get<TenantSettingsModel>(`tenantSettings`);
};

const saveTenantSettings = (tenantSettings: TenantSettingsModel) => {
  return post<TenantSettingsModel>(`tenantSettings`, tenantSettings);
};

const saveTenantImage = (image: string | undefined) => {
  return post(`tenantSettings/image`, { image: image });
};

export { getTenantSettings, saveTenantSettings, saveTenantImage };
