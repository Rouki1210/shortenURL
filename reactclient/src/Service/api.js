import axios from "axios"

const api = axios.create({
    baseURL: "https://localhost:7136"
});

export const login = (data) => api.post("/login", data);
export const register = (data) => api.post("/register", data);


export default api;