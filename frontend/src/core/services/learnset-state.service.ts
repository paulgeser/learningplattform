import { AxiosResponse } from "axios";
import { LearnSetStatus } from "../enum/status.enum";
import { axiosCall } from "./helper";

export const getAllLearnSetStates = (): Promise<void | AxiosResponse<LearnSetStatus[]> | undefined> => {
    return axiosCall({
        method: 'GET',
        url: 'data/learnset-state', 
    }).catch(error => console.error(error));
}
