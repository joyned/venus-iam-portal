import GroupModel from "./GroupModel";

export default class UserModel {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    createdAt?: string;
    groups?: GroupModel[];
}