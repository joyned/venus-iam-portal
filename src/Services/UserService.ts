import UserModel from "../Models/UserModel";
import { del, post } from "./RequestService";

const getUsers = async () => {
    return new Promise((resolve) => {
        fetch(`${process.env.REACT_APP_API_HOST}/user`).then(response => {
            response.json().then(data => {
                resolve(data);
            })
        })
    })
}

const getUserById = async (userId: string) => {
    return new Promise((resolve) => {
        fetch(`${process.env.REACT_APP_API_HOST}/user/${userId}`).then(response => {
            response.json().then(data => {
                resolve(data);
            })
        })
    })
}

const deleteUser = async (userId: string) => {
    return del(`user/${userId}`);
}

const saveUser = async (user: UserModel) => {
    return post('user', user);
}

export {
    getUsers,
    getUserById,
    saveUser,
    deleteUser
}
