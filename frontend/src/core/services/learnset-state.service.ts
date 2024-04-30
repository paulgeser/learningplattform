import { Constants } from "../constants";
import { LearnSetStatus } from "../model/status.enum";


export const getAllLearnSetStates = (): Promise<LearnSetStatus[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${Constants.url}/data/learnset-state`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}