/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Modal,
    Typography,
    Input,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import axios from "axios";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    maxHeight: "95vh", // Đặt chiều cao tối đa để tránh vượt quá màn hình
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflowY: "auto", // Thêm thuộc tính này để có thanh cuộn dọc khi cần
};

const ModalProduct = ({ product, onSave, open, onClose }) => {

    const [listCategory, setListCategory] = useState([]);
    const [listManufacturer, setListManufacturer] = useState([]);
    const [form, setForm] = useState({
        tensanpham: "",
        gia: "",
        soluong: "",
        mota: "",
        hinhanh: "",
        maloai: "",
        manhasanxuat: "",
        tenloai: "",
        tennhasanxuat: "",
    });

    useEffect(() => {
        console.log("pro", product)
        if (product) {
            setForm(product);
        } else {
            setForm({
                tensanpham: "",
                gia: "",
                soluong: "",
                mota: "",
                hinhanh: null,
                maloai: "",
                manhasanxuat: "",
                tenloai: "",
                tennhasanxuat: "",
            });
        }
        // getAllCategoryData();
        // getAllManufacturerData();
    }, [product]);

    // const getAllCategoryData = async () => {
    //     try {
    //         const response = await getAllCategory();
    //         if (response.EC === 1) {
    //             setListCategory(response.DT || []); // Đảm bảo rằng `DT` luôn là một mảng
    //             console.log("dt", response.DT);
    //         } else {
    //             console.error("Failed to fetch");
    //         }
    //     } catch (error) {
    //         console.error("Error occurred", error);
    //     }
    // };

    // const getAllManufacturerData = async () => {
    //     try {
    //         const response = await getAllManufacturer();
    //         if (response) {
    //             setListManufacturer(response.DT || []); // Đảm bảo rằng `DT` luôn là một mảng
    //             console.log("dt", response.DT);
    //         } else {
    //             console.error("Failed to fetch");
    //         }
    //     } catch (error) {
    //         console.error("Error occurred", error);
    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm((prev) => ({ ...prev, hinhanh: file }));
    };


    const handleSubmit = () => {
        onSave(form);
        setForm({
            tensanpham: "",
            gia: "",
            soluong: "",
            mota: "",
            hinhanh: null,
            maloai: "",
            manhasanxuat: "",
            tenloai: "",
            tennhasanxuat: "",
        });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={modalStyle}>
                <Typography id="modal-title" variant="h6" component="h2">
                    {product ? "Cập nhật" : "Thêm mới"}
                </Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Tên"
                    name="tensanpham"
                    value={form.tensanpham}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="select-maloai-label">Loại</InputLabel>
                    <Select
                        labelId="select-maloai-label"
                        name="maloai"
                        label="Loại"
                        value={form.maloai}
                        onChange={handleChange}
                    >
                        {listCategory.map((category) => (
                            <MenuItem key={category.maloai} value={category.maloai}>
                                {category.tenloai}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <InputLabel id="select-maloai-label">Nhà sản xuất</InputLabel>
                    <Select
                        labelId="select-manhasanxuat-label"
                        label="Nhà sản xuất"
                        name="manhasanxuat"
                        value={form.manhasanxuat}
                        onChange={handleChange}
                    >
                        {listManufacturer.map((manufacturer) => (
                            <MenuItem key={manufacturer.manhasanxuat} value={manufacturer.manhasanxuat}>
                                {manufacturer.tennhasanxuat}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Giá"
                    type="number"
                    name="gia"
                    value={form.gia}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Số lượng"
                    type="number"
                    name="soluong"
                    value={form.soluong}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Mô tả"
                    type="text"
                    name="mota"
                    value={form.mota}
                    onChange={handleChange}
                />

                <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                    <input
                        type="file"
                        id="hinhanh"
                        name="hinhanh"
                        accept="hinhanh/*"
                        onChange={handleFileChange}
                        required
                        style={{
                            width: "100%",
                            padding: "16.5px 14px",
                            fontSize: "1rem",
                            lineHeight: "1.4375em",
                            backgroundColor: "#fff",
                            border: "1px solid rgba(0, 0, 0, 0.23)",
                            borderRadius: "4px",
                            color: "rgba(0, 0, 0, 0.87)",
                            boxSizing: "border-box",
                            transition: "border-color 0.3s, box-shadow 0.3s",
                        }}
                        onFocus={(e) => (e.target.style.border = "2px solid #3f51b5")}
                        onBlur={(e) =>
                            (e.target.style.border = "1px solid rgba(0, 0, 0, 0.23)")
                        }
                    />
                </Box>

                <Box mt={2} display="flex" justifyContent="flex-end" gap="5px">
                    <button className="btn btn-primary admin-btn" onClick={handleSubmit}>
                        {product ? "Cập nhật" : "Tạo mới"}
                    </button>
                    <button className="btn btn-danger admin-btn" onClick={onClose} style={{ width: '15%' }}>
                        Huỷ
                    </button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalProduct;
