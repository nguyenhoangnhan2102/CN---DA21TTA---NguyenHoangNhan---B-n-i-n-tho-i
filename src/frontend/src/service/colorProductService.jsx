import axiosInstance from "../authentication/axiosInstance";
const apiUrl = process.env.REACT_APP_API_URL;
const apiColorProduct = apiUrl + "/colorproducts";

export const getAllColorProduct = async () => {
    try {
        const response = await axiosInstance.get(`${apiColorProduct}`);
        return response.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

export const createColorProduct = async (colorproduct) => {
    try {
        const response = await axiosInstance.post(`${apiColorProduct}`, colorproduct);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateColorProduct = async (mamau, colorproduct) => {
    try {
        const response = await axiosInstance.put(`${apiColorProduct}/${mamau}`, colorproduct);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteColorProduct = async (mamau) => {
    try {
        const response = await axiosInstance.delete(`${apiColorProduct}/${mamau}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi xóa sản phẩm có mamau = ${mamau}:`, error);
        throw error;
    }
};