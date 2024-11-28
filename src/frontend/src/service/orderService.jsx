import { toast } from "react-toastify";
import axiosInstance from "../authentication/axiosInstance";

const apiUrl = process.env.REACT_APP_API_URL;
const apiOrders = apiUrl + '/orders';

export const getAllOrders = async () => {
    try {
        const response = await axiosInstance.get(`http://localhost:3333/api/orders`);
        return response.data;
    } catch (error) {
        console.error("Error!!!");
    }
}