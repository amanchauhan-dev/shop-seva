// lib/apiClient.ts
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const apiClient = axios.create({
    baseURL: `/api`, // Removed extra space
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
});

// Global error handler
export const handleApiError = (error: unknown, toastId?: string) => {
    let errorMessage = "Something went wrong!";
    if (error instanceof AxiosError) {
        if (error.response) {
            if (error.response.status === 400) {
                errorMessage = error.response.data?.error || error.response.data?.message || "Bad Request";
            } else if (error.response.status === 404) {
                errorMessage = "Resource not found!";
            } else {
                errorMessage = error.response.statusText || "API Error";
            }
        } else if (error.request) {
            errorMessage = "No response from server!";
        } else {
            errorMessage = error.message;
        }
    }
    // Show toast notification
    if (toastId) {
        toast.error(errorMessage, { id: toastId });
    } else {
        toast.error(errorMessage);
    }

    return errorMessage; // Return error for further handling if needed
};


const requestControllers = new Map<string, AbortController>();

// Function to make API requests with cancellation support
export const fetchWithCancel = async (key: string, url: string, options = {}) => {
    if (requestControllers.has(key)) {
        requestControllers.get(key)?.abort(); // Cancel previous request
    }
    const controller = new AbortController();
    requestControllers.set(key, controller);
    try {
        const response = await apiClient.get(url, {
            ...options,
            signal: controller.signal,
        });
        requestControllers.delete(key);
        return response.data;
    } catch (error) {
        requestControllers.delete(key);
        if (!axios.isCancel(error)) {
            throw error;
        }
    }
};