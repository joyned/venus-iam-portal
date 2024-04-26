import axios from "axios"

const get = async<Type>(uri: string) => {
    return new Promise<Type>((resolve, reject) => {
        axios.get<Type>(`${process.env.REACT_APP_API_HOST}/${uri}`)
            .then((response) => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response);
            })
    })
}

const post = async<Type>(uri: string, body: Type) => {
    return new Promise<Type>((resolve, reject) => {
        axios.post<Type>(`${process.env.REACT_APP_API_HOST}/${uri}`, body)
            .then((response) => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response);
            })
    })
}

const del = async<Type>(uri: string) => {
    return new Promise<Type>((resolve, reject) => {
        axios.delete<Type>(`${process.env.REACT_APP_API_HOST}/${uri}`)
            .then((response) => {
                resolve(response.data);
            }).catch(error => {
                reject(error.response);
            })
    })
}


export {
    get,
    post,
    del
};
