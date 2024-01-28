import { AnalyzedWordsModel } from "../components/model/analyzed-words.model";
import { CreateLearnSet } from "../components/model/create-learnset.model";
import { ImageWordInputModel } from "../components/model/image-word-input.model";
import { LearnSet } from "../components/model/learnset.model";
import { LearnSetStatus } from "../components/model/status.enum";
import { LearnSetType } from "../components/model/type.enum";
import { Word } from "../components/model/word.model";


var url = '';
if (process.env.NODE_ENV !== 'production') {
    url = String(process.env.REACT_APP_SERVICE_URL);
}

export const getAllLearnSetTypes = (): Promise<LearnSetType[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${url}/data/learnset-types`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const getAllLearnSetStates = (): Promise<LearnSetStatus[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${url}/data/learnset-states`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const createLearnSetRequest = (inputValue: CreateLearnSet): Promise<LearnSet> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputValue)
    };
    return fetch(`${url}/data/create-learnset`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const getAllLearnSets = (): Promise<LearnSet[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${url}/data/get-all-learnsets`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}


export const getLearnSetById = (id: string): Promise<LearnSet> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${url}/data/learnset/${id}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

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
}