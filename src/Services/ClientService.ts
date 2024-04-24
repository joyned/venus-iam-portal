import ClientModel from "../Models/ClientModel"

const getClients = async () => {
    return new Promise<ClientModel[]>((resolve) => {
        resolve([
            {
                id: '51deae43-f0a6-430b-9baa-234b4e404e9d',
                name: 'Zenith Support Hub',
                url: 'https://zenith-support-hub.com/',
                createdAt: new Date().toUTCString()
            },
        ])
    })
}

export {
    getClients
}