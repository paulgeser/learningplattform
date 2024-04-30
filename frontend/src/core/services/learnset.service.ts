import { Constants } from "../constants";
import { CreateLearnSet } from "../model/create-learnset.model";
import { LearnSet } from "../model/learnset.model";


export const getAllLearnSets = (): Promise<LearnSet[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${Constants.url}/data/learnset`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const createLearnSetRequest = (inputValue: CreateLearnSet): Promise<LearnSet> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputValue)
    };
    return fetch(`${Constants.url}/data/learnset`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const updateLearnSetRequest = (inputValue: LearnSet): Promise<LearnSet> => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputValue)
    };
    return fetch(`${Constants.url}/data/learnset/${inputValue._id}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const deleteLearnSetRequest = (id: string): Promise<LearnSet> => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${Constants.url}/data/learnset/${id}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}










/* export const getLearnSetById = (id: string): Promise<LearnSet> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${url}/data/learnset/${id}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
} */
/* 
export const saveAnalyzedWords = (learnSetId: string, words: AnalyzedWordsModel[]): Promise<Word[]> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(words)
    };
    return fetch(`${url}/data/learnset/${learnSetId}/text`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}


export const getWordsByLearnSetId = (id: string): Promise<Word[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${url}/data/learnset/${id}/words`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}


export const addPictureToWord = (word: ImageWordInputModel): Promise<Word[]> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(word)
    };
    return fetch(`${url}/data/learnset/picture`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const updateStatusOfLearnSet = (id: string, status: LearnSetStatus): Promise<Word[]> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: status
        })
    };
    return fetch(`${url}/data/learnset/${id}/status`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
} */