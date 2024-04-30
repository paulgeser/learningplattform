import { Constants } from "../constants";
import { CreateLearnSetType } from "../model/create-learnset-type.model";
import { LearnSetType } from "../model/learnset-type.model";


export const getAllLearnSetTypes = (): Promise<LearnSetType[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${Constants.url}/data/learnset-type`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}


export const createLearnSetTypeRequest = (inputValue: CreateLearnSetType): Promise<LearnSetType> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputValue)
    };
    return fetch(`${Constants.url}/data/learnset-type`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const updateLearnSetTypeRequest = (inputValue: LearnSetType): Promise<LearnSetType> => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputValue)
    };
    return fetch(`${Constants.url}/data/learnset-type/${inputValue._id}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const deleteLearnSetTypeRequest = (id: string): Promise<LearnSetType> => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${Constants.url}/data/learnset-type/${id}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}