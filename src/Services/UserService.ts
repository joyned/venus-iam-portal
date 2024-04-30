import UserModel from "../Models/UserModel";
import { del, get, post } from "./RequestService";

const getUsers = async () => {
  return get<UserModel[]>("user");
};

const getUserById = async (userId: string) => {
  return get<UserModel>(`user/${userId}`);
};

const deleteUser = async (userId: string) => {
  return del(`user/${userId}`);
};

const saveUser = async (user: UserModel) => {
  return post("user", user);
};

export { getUsers, getUserById, saveUser, deleteUser };
