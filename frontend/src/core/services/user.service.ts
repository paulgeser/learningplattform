import { AxiosResponse } from "axios";
import { axiosCall } from "./helper";
import { BasicUser } from "../model/basic-user.model";
import { CreateUserModel } from "../model/create-user.model";


export const getAllAppUsers = (): Promise<AxiosResponse<BasicUser[]> | undefined | void> => {
    return axiosCall({
        method: 'GET',
        url: 'data/app-user',
    }).catch(error => console.error(error));
}


export const createUserRequest = (inputValue: CreateUserModel): Promise<AxiosResponse<BasicUser> | undefined | void> => {
    return axiosCall({
        method: 'POST',
        url: 'data/app-user',
        data: inputValue
    }).catch(error => console.error(error));
}

export const updateUserRequest = (inputValue: BasicUser): Promise<AxiosResponse<BasicUser> | undefined | void> => {
    return axiosCall({
        method: 'PUT',
        url: `data/app-user/${inputValue.username}`,
        data: inputValue
    }).catch(error => console.error(error));
}

export const deleteUserRequest = (username: string): Promise<AxiosResponse<BasicUser> | undefined | void> => {
    return axiosCall({
        method: 'DELETE',
        url: `data/app-user/${username}`
    }).catch(error => console.error(error));
}

export const changePasswordRequest = (username: string, password: string): Promise<AxiosResponse<BasicUser> | undefined | void> => {
    return axiosCall({
        method: 'PUT',
        url: `data/app-user/${username}/password`,
        data: {
            password: password
        }
    }).catch(error => console.error(error));
}

