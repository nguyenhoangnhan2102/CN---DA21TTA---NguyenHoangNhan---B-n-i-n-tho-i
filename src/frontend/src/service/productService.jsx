import axiosInstance from "../authentication/axiosInstance";
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

export const updateStatus = async (masanpham, status) => {
    try {
        const response = await axiosInstance.put(`${apiProduct}/${masanpham}/trangthai`, { trangthai: status });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};


export const deleteProduct = async (masanpham) => {
    try {
        const response = await axiosInstance.delete(`${apiProduct}/${masanpham}`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi xóa sản phẩm có makhachhang = ${masanpham}:`, error);
        throw error;
    }
};



