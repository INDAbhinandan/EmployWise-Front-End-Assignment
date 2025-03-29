import axios from "axios";

const API_BASE_URL = "https://reqres.in/api";

// Login API
export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
        localStorage.setItem("token", response.data.token);
        return response.data.token;
    } catch (error) {
        throw new Error("Invalid Credentials");
    }
};

// Fetch Users API
export const fetchUsers = async (page = 1) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users?page=${page}`);
        return response.data.data;
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
};

// Update User API
export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${id}`, userData);
        return response.data;
    } catch (error) {
        throw new Error("Failed to update user");
    }
};

// Delete User API
export const deleteUser = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/users/${id}`);
        return true;
    } catch (error) {
        throw new Error("Failed to delete user");
    }
};
