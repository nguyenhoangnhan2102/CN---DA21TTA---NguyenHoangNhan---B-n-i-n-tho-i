import React, { useState } from "react";
import {
    Typography,
    Box,
    Modal,
    FormControl,
    TextField,
} from "@mui/material"; // Ensure these are imported
import moment from "moment";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    maxHeight: "90vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
};

const imgURL = process.env.REACT_APP_IMG_URL;

const OrderDetails = ({ open, onClose, order }) => {
    if (!order) return null; // Nếu không có order thì không render modal

    return (
        <>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx=
                    {{
                        ...modalStyle,
                        maxHeight: '95vh',
                        height: '95vh',
                    }}>
                    <Typography madonhang="modal-title" variant="h6" component="h2">
                        Chi tiết đơn hàng
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            madonhang="product-text-field"
                            value={order.tenkhachhang}
                            label="Số điện thoại"
                            sx={{
                                '& .MuiInputBase-input': {
                                    height: '10px',
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            madonhang="product-text-field"
                            value={order.sdtkhachhang}
                            label="Số điện thoại"
                            sx={{
                                '& .MuiInputBase-input': {
                                    height: '10px',
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            madonhang="product-text-field"
                            value={order.diachigiaohang}
                            label="Địa điểm giao hàng"
                            sx={{
                                '& .MuiInputBase-input': {
                                    height: '10px',
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            madonhang="product-text-field"
                            value={moment(order.ngaydat).format('HH:mm:ss DD/MM/YYYY')}
                            label="Ngày đặt"
                            sx={{
                                '& .MuiInputBase-input': {
                                    height: '10px',
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            madonhang="product-text-field"
                            value={new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(order.tongtien) + "đ"}
                            label="Tổng tiền"
                            sx={{
                                '& .MuiInputBase-input': {
                                    height: '10px',
                                },
                            }}
                        />
                    </FormControl>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }} className="table table-hover">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Tên sản phẩm</th>
                                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Số lượng</th>
                                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Giá</th>
                                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Hình ảnh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.products && order.products.length > 0 ? (
                                order.products.map((product, index) => (
                                    <tr key={index}>
                                        <td
                                            style={{
                                                padding: '8px',
                                                borderBottom: '1px solid #ddd',
                                                maxWidth: '200px', // Điều chỉnh chiều rộng của cột
                                                whiteSpace: 'nowrap', // Ngăn chặn tên sản phẩm xuống dòng
                                                overflow: 'hidden', // Ẩn phần thừa
                                                textOverflow: 'ellipsis', // Thêm dấu "..."
                                                cursor: 'pointer'
                                            }}
                                            title={product.tensanpham} // Hiển thị tên đầy đủ khi hover
                                        >
                                            {product.tensanpham}
                                        </td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.soluong}</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giatien)}
                                        </td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                            <img
                                                width="70px"
                                                height="70px"
                                                src={`${imgURL}${product.mausachinhanh}`}
                                                alt={product.tensanpham || "Hình ảnh sản phẩm"}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #ddd' }}>
                                        Không có sản phẩm trong đơn hàng
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Box>
            </Modal>
        </>
    );
};


export default OrderDetails;
