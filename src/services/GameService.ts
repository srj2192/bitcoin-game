import {IUpdateUser, IUser} from "../interfaces/IUser";

const baseUrl = "http://localhost:5000/user";

export const createUser = async(user:IUser) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'}
    });

    return response;
}

export const getUser = async(userName:string) => {
    const url = `${baseUrl}?name=${userName}`;
    const response = await fetch(url);

    return response;
}

export const updateUser = async(user:IUpdateUser) => {
    const response = await fetch(baseUrl, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {'Content-Type': 'application/json'} 
    });

    return response;
}
