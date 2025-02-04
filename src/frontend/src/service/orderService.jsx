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

// orderService.js
export const getOrderDetails = async (madonhang) => {
    try {
        const response = await axiosInstance.get(`${apiOrders}/${madonhang}`);
        return response.data; // Trả về dữ liệu chi tiết đơn hàng
    } catch (error) {
        throw new Error('Lỗi khi lấy chi tiết đơn hàng');
    }
};


export const updateStatus = async (madonhang, status) => {
    try {
        const response = await axiosInstance.put(`${apiOrders}/${madonhang}`, { trangthaidonhang: status });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};