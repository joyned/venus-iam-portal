import GroupModel from "../Models/GroupModel";
import { del, get, post } from "./RequestService";

const getGroups = async () => {
    return get<GroupModel[]>('group');
}

const getGroupById = async (groupId: string) => {
    return get<GroupModel>(`group/${groupId}`);
}

const saveGroup = async (group: GroupModel) => {
    return post<GroupModel>('group', group);
}

const deleteGroup = async (groupId: string) => {
    return del<GroupModel>(`group/${groupId}`);
}

export {
    deleteGroup, getGroupById, getGroups, saveGroup
};

