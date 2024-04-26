import ClientModel from "../Models/ClientModel"
import { del, get, post } from "./RequestService"

const getClients = async () => {
    return get<ClientModel[]>('client');
}

const getClientById = async (clientId: string) => {
    return get<ClientModel>(`client/${clientId}`);
}

const saveClient = async (client: ClientModel) => {
    return post<ClientModel>(`client`, client);
}

const deleteClient = async (clientId: string) => {
    return del<ClientModel>(`client/${clientId}`);
}

export {
    getClients,
    getClientById,
    saveClient,
    deleteClient
}