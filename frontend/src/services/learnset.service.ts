import { CreateLearnSet } from "../components/model/create-learnset.model";
import { LearnSet } from "../components/model/learnset.model";
import { LearnSetStatus } from "../components/model/status.enum";
import { LearnSetType } from "../components/model/type.enum";


var url = '';
if (process.env.NODE_ENV !== 'production') {
    url = String(process.env.REACT_APP_SERVICE_URL);
}

export const getAllLearnSetTypes = () : Promise<LearnSetType[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${url}/data/learnset-types`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const getAllLearnSetStates = () : Promise<LearnSetStatus[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${url}/data/learnset-states`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const createLearnSetRequest = (inputValue: CreateLearnSet) : Promise<LearnSet> => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputValue)
    };
    return fetch(`${url}/data/create-learnset`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

export const getAllLearnSets = () : Promise<LearnSet[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${url}/data/get-all-learnsets`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}

