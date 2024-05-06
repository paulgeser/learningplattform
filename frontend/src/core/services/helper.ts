import axios, { AxiosResponse } from "axios";

export const getDataFromApi = async (
    promise: Promise<AxiosResponse<any>>
) => {
    try {
        return await promise;
    } catch (error) {
        console.error(error);
    }
};

export const axiosCall = async (requestBody: any) => {
    const response = await getDataFromApi(
        axios({
            baseURL: 'http://localhost:3001/',
            withCredentials: true,
            ...requestBody,
        })
    );
    return response;
};