import axios from "axios";
import { notification } from 'antd';

const baseURL = 'https://localhost:7136';

const handleError = (fn) => async (...params) => {
    try {
        return await fn(...params);
    } catch (error) {
        console.error("API Error:", error);

        if (error.response) {
            notification.error({
                message: `Error ${error.response.status}: ${error.response.statusText}`,
                description: error.response.data.message || 'An error occurred on the server.',
            });
        } else if (error.request) {
            notification.error({
                message: 'Network Error',
                description: 'No response from server. Please check your connection.',
            });
        } else {
            notification.error({
                message: 'Request Error',
                description: error.message || 'An unknown error occurred.',
            });
        }

        throw error;
    }
};

export const authenticationAPI = {
    getDatas: handleError(async () => {
        const response = await axios.get(`${baseURL}/api/Users`);
        return response.data;
    }),
    login: handleError(async (payload) => {
        const response = await axios.post(`${baseURL}/api/Users/login`, payload);
        return response.data;
    }),
    register: handleError(async (payload) => {
        const response = await axios.post(`${baseURL}/api/Users/register`, payload);
        return response.data;
    })
};

export const shortenurlAPI = {
    fetchURLs: handleError(async (userId) => {
        const response = await axios.get(`${baseURL}/api/Urls/userLinks/${userId}`);
        return response.data;
    }),
    shortenURL: handleError(async (payload) => {
        const response = await axios.post(`${baseURL}/api/Urls`, payload); // Changed here
        return response.data;
    }),
    redirectURL: handleError(async (shortedLink) => {
        const response = await axios.get(`${baseURL}/api/Urls/redirect/${shortedLink}`);
        return response.data;
    })
};
