import axios from "axios";
import { toast } from "react-toastify";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const validateEmail = (email) => {
    if (typeof email !== 'string') {
        throw new Error('Email must be a string');
    };

    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

// Register new user
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${SERVER_URL}/api/auth/register`, userData, { withCredentials: true });
        if (response.statusText === "OK") {
            toast.success("User regsitered successfully!");
        };
        return response.data;
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    };
};

// Login existing user
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(
            `${SERVER_URL}/api/auth/login`,
            userData,
        );
        console.log('Login response:', response);
        if (response.statusText === "OK") {
            toast.success("Logged in successfully!");
        };
        return response.data;
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    };
};

// Logout existing user
export const logoutUser = async () => {
    try {
        await axios.get(
            `${SERVER_URL}/api/auth/logout`,
        );
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    };
};

// Forgot password
export const forgotPassword = async (userData) => {
    try {
        const response = await axios.post(
            `${SERVER_URL}/api/users/forgot-password`,
            userData,
        );
        toast.success(response.data.message);
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    };
};

// Reset password
export const resetPassword = async (userData, resetToken) => {
    try {
        const response = await axios.put(
            `${SERVER_URL}/api/users/reset-password/${resetToken}`,
            userData,
        );
        toast.success(response.data.message);
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    };
};

// Get login status (keep user logged in to prevent data loss during refresh on homepage)
export const getLoginStatus = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/auth/logged-in/`);
        return response.data;
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    };
};

// Get user profile
export const getUser = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/api/users/get-user/`);
        return response.data;
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    };
};

// Update profile
export const updateUser = async (formData) => {
    try {
        const response = await axios.patch(`${SERVER_URL}/api/users/update-user/`, formData);
        return response.data;
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    };
};

// Change password
export const changePassword = async (formData) => {
    try {
        const response = await axios.patch(`${SERVER_URL}/api/users/change-password/`, formData);
        return response.data;
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    };
};