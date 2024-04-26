import ClientModel from "../Models/ClientModel"
import { get } from "./RequestService"

const getClients = async () => {
    return get<ClientModel[]>('client');
}

export {
    getClients
}