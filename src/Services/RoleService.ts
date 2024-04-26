import RoleModel from "../Models/RoleModel";
import { del, get, post } from "./RequestService";

const getRoles = async () => {
    return get<RoleModel>('role');
}

const getRoleById = async (roleId: string): Promise<RoleModel> => {
    return get<RoleModel>(`role/${roleId}`);
}

const saveRole = async (role: RoleModel): Promise<RoleModel> => {
    return post<RoleModel>(`role`, role);
}

const deleteRole = async (roleId: string): Promise<string> => {
    return del<string>(`role/${roleId}`);
}

export {
    getRoles,
    getRoleById,
    saveRole,
    deleteRole
};
