import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message || error.message || "Error desconocido";
        return Promise.reject(new Error(message));
    }
);

// ✅ Helper genérico con tipado
export async function http<T>(
    endpoint: string,
    config?: AxiosRequestConfig
): Promise<T> {
    const response = await api.request<T>({
        url: endpoint,
        ...config,
    });
    return response.data;
}

export default api;
