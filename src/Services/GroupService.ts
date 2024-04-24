import GroupModel from "../Models/GroupModel"

const getGroups = async () => {
    return new Promise<GroupModel[]>((resolve) => {
        fetch(`${process.env.REACT_APP_API_HOST}/group`).then(response => {
            response.json().then(data => {
                resolve(data);
            })
        })
    })
}

export {
    getGroups
}
