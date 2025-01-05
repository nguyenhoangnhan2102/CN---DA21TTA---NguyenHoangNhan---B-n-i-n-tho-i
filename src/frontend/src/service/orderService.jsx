import { toast } from "react-toastify";
import axiosInstance from "../authentication/axiosInstance";

const apiUrl = process.env.REACT_APP_API_URL;
const apiOrders = apiUrl + '/orders';

export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get(`${apiOrders}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error!!!");
    }
}

export const updateStatus = async (madonhang, status) => {
    try {
        const response = await axiosInstance.put(`${apiOrders}/${madonhang}`, { trangthaidonhang: status });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};