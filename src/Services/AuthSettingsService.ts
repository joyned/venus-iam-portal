import AuthSettings from "../Models/AuthSettingsModel";
import { get, post } from "./RequestService"

const getAuthSettings = () => {
    return get<AuthSettings>('authSettings');
}

const saveAuthSettings = (authSettings: AuthSettings) => {
    return post('authSettings', authSettings);
}

export {
    getAuthSettings,
    saveAuthSettings
}