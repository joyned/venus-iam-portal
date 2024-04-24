import RoleModel from "../Models/RoleModel"

const getRoles = async () => {
    return new Promise<RoleModel[]>((resolve) => {
        resolve([
            {
                id: '51deae43-f0a6-430b-9baa-234b4e404e9d',
                name: 'SUPPORT',
                groupsIn: 12,
                createdAt: new Date().toUTCString()
            },
            {
                id: '2f662b3c-96d9-445d-86eb-895026448feb',
                name: 'ADMIN',
                groupsIn: 3,
                createdAt: new Date().toUTCString()
            }
        ])
    })
}

export {
    getRoles
}