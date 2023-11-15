import axios from "axios";
import { toast } from "react-toastify";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const registerUSer = async (userData) => {
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
    }
};