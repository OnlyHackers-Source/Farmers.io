// api.ts
import axios from 'axios';

// Base URL for all API calls
const BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5003';

// Auth API calls
export const authApi = {
    login: (email: string, password: string) => {
        return axios.post(`${BASE_URL}/auth/login`, { email, password });
    },

    signup: (userData: { email: string; password: string; name: string; phone: string; role: string, address: string }) => {
        return axios.post(`${BASE_URL}/auth/signup`, userData);
    }
};

// Products API calls
export const productsApi = {
    getAll: (params = {}) => {
        return axios.get(`${BASE_URL}/products/`, { params });
    },

    getById: (id: string) => {
        return axios.get(`${BASE_URL}/products/${id}`);
    },

    create: (productData: any) => {
        return axios.post(`${BASE_URL}/products/`, productData);
    },

    update: (id: string, productData: any) => {
        return axios.put(`${BASE_URL}/products/${id}`, productData);
    },

    delete: (id: string) => {
        return axios.delete(`${BASE_URL}/products/${id}`);
    }
};

// Orders API calls
export const ordersApi = {
    getMyOrders: () => {
        return axios.get(`${BASE_URL}/orders/my-orders`);
    },

    getAll: (params = {}) => {
        return axios.get(`${BASE_URL}/orders/`, { params });
    },

    getById: (id: string) => {
        return axios.get(`${BASE_URL}/orders/${id}`);
    },

    create: (orderData: any) => {
        return axios.post(`${BASE_URL}/orders/`, orderData);
    },

    update: (id: string, orderData: any) => {
        return axios.put(`${BASE_URL}/orders/${id}`, orderData);
    }
};

// Rentals API calls
export const rentalsApi = {
    getAll: (params = {}) => {
        return axios.get(`${BASE_URL}/rentals`, { params });
    },

    getMyRentals: () => {
        return axios.get(`${BASE_URL}/rentals/myrentals`);
    },

    getById: (id: string) => {
        return axios.get(`${BASE_URL}/rentals/${id}`);
    },

    create: (rentalData: any) => {
        return axios.post(`${BASE_URL}/rentals`, rentalData);
    },

    update: (id: string, rentalData: any) => {
        return axios.put(`${BASE_URL}/rentals/${id}`, rentalData);
    }
};

// Profile API calls
export const profileApi = {
    getMyProfile: () => {
        return axios.get(`${BASE_URL}/profiles/me`);
    },

    updateMyProfile: (profileData: any) => {
        return axios.put(`${BASE_URL}/profiles/me`, profileData);
    }
};

// Helper function to add auth token to requests
export const setAuthHeader = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthHeader = () => {
    delete axios.defaults.headers.common['Authorization'];
};

export const getMarketPrice = () => {
    return axios.get("https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b&format=json&filters%5Bstate.keyword%5D=Maharashtra")
}