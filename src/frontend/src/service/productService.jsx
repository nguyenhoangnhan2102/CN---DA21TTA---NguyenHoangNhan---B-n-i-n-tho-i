import axiosInstance from "../authentication/axiosInstance";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
const apiProduct = apiUrl + "/products";

export const getAllProducts = async () => {
    try {
        const response = await axiosInstance.get(`${apiProduct}`);
        return response.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

export const getDetailProduct = async (product) => {
    try {
        const response = await axiosInstance.get(`${apiProduct}/${product.masanpham}`);
        return response.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
    }
};

export const createProduct = async (product) => {
    try {
        const response = await axiosInstance.post(`${apiProduct}`, product);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (masanpham, product) => {
    try {
        const response = await axiosInstance.put(`${apiProduct}/${masanpham}`, product);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (masanpham) => {
    console.log("masanpham", masanpham)
    try {
        const response = await axiosInstance.delete(`${apiProduct}/${masanpham}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting with id ${masanpham}:`, error);
        throw error;
    }
};


