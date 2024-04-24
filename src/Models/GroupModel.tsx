import RoleModel from "./RoleModel";

export default class GroupModel {
    id?: string;
    name?: string;
    roles?: RoleModel[];
    createdAt?: string;
}