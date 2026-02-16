import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://18.208.206.20:30001',
    headers: {
        "Content-Type": "application/json",
    },
});

// 2. ระบุ Type ให้กับ parameter 'config'
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
});