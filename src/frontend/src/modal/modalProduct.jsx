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
import { getAllManufacturer } from "../service/manufacturerService";

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
        mathuonghieu: "",
        tensanpham: "",
        giasanpham: "",
        soluongsanpham: "",
        hedieuhanh: "",
        cpu: "",
        gpu: "",
        ram: "",
        dungluong: "",
        cameratruoc: "",
        camerasau: "",
        congnghemanhinh: "",
        dophangiaimanhinh: "",
        pin: "",
        motasanpham: "",
        hinhanhchinh: "",
        tenthuonghieu: "",
    });

    useEffect(() => {
        console.log("pro", product)
        if (product) {
            setForm(product);
        } else {
            setForm({
                mathuonghieu: "",
                tensanpham: "",
                giasanpham: "",
                soluongsanpham: "",
                hedieuhanh: "",
                cpu: "",
                gpu: "",
                ram: "",
                dungluong: "",
                cameratruoc: "",
                camerasau: "",
                congnghemanhinh: "",
                dophangiaimanhinh: "",
                pin: "",
                motasanpham: "",
                hinhanhchinh: "",
                tenthuonghieu: "",
            });
        }
        getAllManufacturerData();
    }, [product]);

    const getAllManufacturerData = async () => {
        try {
            const response = await getAllManufacturer();
            if (response) {
                setListManufacturer(response.DT || []); // Đảm bảo rằng `DT` luôn là một mảng
                console.log("dt", response.DT);
            } else {
                console.error("Failed to fetch");
            }
        } catch (error) {
            console.error("Error occurred", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setForm((prev) => ({ ...prev, hinhanhchinh: file }));
    };


    const handleSubmit = () => {
        onSave(form);
        setForm({
            mathuonghieu: "",
            tensanpham: "",
            giasanpham: "",
            soluongsanpham: "",
            hedieuhanh: "",
            cpu: "",
            gpu: "",
            ram: "",
            dungluong: "",
            cameratruoc: "",
            camerasau: "",
            congnghemanhinh: "",
            dophangiaimanhinh: "",
            pin: "",
            motasanpham: "",
            hinhanhchinh: "",
            tenthuonghieu: "",
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
                <div className="d-flex gap-2">
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="select-mathuonghieu-label">Thương hiệu</InputLabel>
                        <Select
                            labelId="select-mathuonghieu-label"
                            name="mathuonghieu"
                            label="Thương hiệu"
                            value={form.mathuonghieu}
                            onChange={handleChange}
                        >
                            {listManufacturer.map((manufacturer) => (
                                <MenuItem key={manufacturer.mathuonghieu} value={manufacturer.mathuonghieu}>
                                    {manufacturer.tenthuonghieu}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Hệ điều hành"
                        type="text"
                        name="hedieuhanh"
                        value={form.hedieuhanh}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex gap-2">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Giá"
                        type="number"
                        name="giasanpham"
                        value={form.giasanpham}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Số lượng"
                        type="number"
                        name="soluongsanpham"
                        value={form.soluongsanpham}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex gap-2">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="CPU"
                        type="text"
                        name="cpu"
                        value={form.cpu}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="GPU"
                        type="text"
                        name="gpu"
                        value={form.gpu}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex gap-2">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="RAM"
                        type="text"
                        name="ram"
                        value={form.ram}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Dung lượng"
                        type="text"
                        name="dungluong"
                        value={form.dungluong}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex gap-2">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Camera trước"
                        type="text"
                        name="cameratruoc"
                        value={form.cameratruoc}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Camera sau"
                        type="text"
                        name="camerasau"
                        value={form.camerasau}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex gap-2">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Công nghệ màn hình"
                        type="text"
                        name="congnghemanhinh"
                        value={form.congnghemanhinh}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Độ phân giải màn hình"
                        type="text"
                        name="dophangiaimanhinh"
                        value={form.dophangiaimanhinh}
                        onChange={handleChange}
                    />
                </div>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Mô tả"
                    type="text"
                    name="motasanpham"
                    value={form.motasanpham}
                    onChange={handleChange}
                    multiline
                    rows={4}
                />

                <Box sx={{ marginTop: 1, marginBottom: 1 }}>
                    <input
                        type="file"
                        id="hinhanhchinh"
                        name="hinhanhchinh"
                        accept="hinhanhchinh/*"
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
