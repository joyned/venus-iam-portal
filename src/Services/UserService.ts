
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

export {
    getUsers,
    getUserById
}
