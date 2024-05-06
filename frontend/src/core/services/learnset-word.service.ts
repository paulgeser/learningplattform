import { AxiosResponse } from "axios";
import { CreateLearnSetWord } from "../model/create-learnset-word.model";
import { LearnSetWord } from "../model/learnset-word.model";
import { axiosCall } from "./helper";


export const getAllWordsByLearnsetId = (learnsetId: string): Promise<AxiosResponse<LearnSetWord[]> | undefined | void> => {
    return axiosCall({
        method: 'GET',
        url: `data/learnset-word/${learnsetId}`
    }).catch(error => console.error(error));
}

export const createLearnSetWordRequest = (inputValue: CreateLearnSetWord): Promise<AxiosResponse<LearnSetWord> | undefined | void> => {
    return axiosCall({
        method: 'POST',
        url: `data/learnset-word`,
        data: inputValue
    }).catch(error => console.error(error));
}

export const updateLearnSetWordRequest = (inputValue: LearnSetWord): Promise<AxiosResponse<LearnSetWord> | undefined | void> => {
    return axiosCall({
        method: 'PUT',
        url: `data/learnset-word/${inputValue._id}`,
        data: inputValue
    }).catch(error => console.error(error));
}

export const deleteWordRequest = (id: string): Promise<AxiosResponse<LearnSetWord> | undefined | void> => {
    return axiosCall({
        method: 'DELETE',
        url: `data/learnset-word/${id}`
    }).catch(error => console.error(error));
}

