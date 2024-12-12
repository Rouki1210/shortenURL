import axios from "axios"

const api = axios.create({
    baseURL: "https://localhost:7136"
});

export const login = (data) => api.post("/api/Users/login", data);
export const register = (data) => api.post("/api/Users/register", data);


export default api;