import { LearnSetStatus } from "../components/model/status.enum";


var url = '';
if (process.env.NODE_ENV !== 'production') {
    url = String(process.env.REACT_APP_SERVICE_URL);
}

export const getAllLearnSetStates = (): Promise<LearnSetStatus[]> => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    return fetch(`${url}/data/learnset-state`, requestOptions)
        .then(response => response.json())
        .catch(error => console.warn(error));
}