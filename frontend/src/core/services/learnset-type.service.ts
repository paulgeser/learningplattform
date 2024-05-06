import { AxiosResponse } from "axios";
import { CreateLearnSetType } from "../model/create-learnset-type.model";
import { LearnSetType } from "../model/learnset-type.model";
import { axiosCall } from "./helper";


export const getAllLearnSetTypes = (): Promise<AxiosResponse<LearnSetType[]> | undefined | void> => {
    return axiosCall({
        method: 'GET',
        url: 'data/learnset-type',
    }).catch(error => console.error(error));
}


export const createLearnSetTypeRequest = (inputValue: CreateLearnSetType): Promise<AxiosResponse<LearnSetType> | undefined | void> => {
    return axiosCall({
        method: 'POST',
        url: 'data/learnset-type',
        data: inputValue
    }).catch(error => console.error(error));
}

export const updateLearnSetTypeRequest = (inputValue: LearnSetType): Promise<AxiosResponse<LearnSetType> | undefined | void> => {
    return axiosCall({
        method: 'PUT',
        url: `data/learnset-type/${inputValue._id}`,
        data: inputValue
    }).catch(error => console.error(error));
}

export const deleteLearnSetTypeRequest = (id: string): Promise<AxiosResponse<LearnSetType> | undefined | void> => {
    return axiosCall({
        method: 'DELETE',
        url: `data/learnset-type/${id}`
    }).catch(error => console.error(error));
}