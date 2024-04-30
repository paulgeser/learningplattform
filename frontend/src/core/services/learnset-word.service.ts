import { Constants } from "../constants";
import { CreateLearnSetWord } from "../model/create-learnset-word.model";
import { LearnSetWord } from "../model/learnset-word.model";


export const getAllWordsByLearnsetId = (learnsetId: string): Promise<LearnSetWord[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${Constants.url}/data/learnset-word/${learnsetId}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const createLearnSetWordRequest = (inputValue: CreateLearnSetWord): Promise<LearnSetWord> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputValue)
    };
    return fetch(`${Constants.url}/data/learnset-word`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const updateLearnSetWordRequest = (inputValue: LearnSetWord): Promise<LearnSetWord> => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputValue)
    };
    return fetch(`${Constants.url}/data/learnset-word/${inputValue._id}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const deleteWordRequest = (id: string): Promise<LearnSetWord> => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${Constants.url}/data/learnset-word/${id}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

