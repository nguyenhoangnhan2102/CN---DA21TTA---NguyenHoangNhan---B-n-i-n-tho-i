import React, { useState } from "react";
import {
    Typography,
    Box,
    Modal,
    FormControl,
    TextField,
    FormLabel,
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
                <Box sx={{
                    ...modalStyle,
                    maxHeight: '95vh',
                    height: '95vh',
                    overflow: 'auto', // Thêm dòng này để cuộn nếu vượt quá chiều cao
                }}>
                    <Typography madonhang="modal-title" variant="h6" component="h2">
                        Chi tiết đơn hàng
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            madonhang="product-text-field"
                            value={order.hotenkhachhang}
                            label="Họ tên"
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
                            value={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.tongtien)}
                            label="Tổng tiền"
                            sx={{
                                '& .MuiInputBase-input': {
                                    height: '10px',
                                    fontWeight: 'bold',
                                },
                            }}
                        />
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            madonhang="product-text-field"
                            value={order.trangthaidonhang === 0 ? "Đang giao hàng" : order.trangthaidonhang === 1 ? "Đã giao" : "Hủy"}
                            label="Trạng thái"
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
                                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Tổng tiền</th>
                                <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #ddd' }}>Màu</th>
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
                                                maxWidth: '200px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                cursor: 'pointer'
                                            }}
                                            title={product.tensanpham}
                                        >
                                            {product.tensanpham}
                                        </td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.soluong}</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.giatien)}
                                        </td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                                            {/* Tính tổng tiền */}
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.soluong * product.giatien)}
                                        </td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{product.tenmausanpham}</td>
                                        <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }} >
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
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '8px', borderBottom: '1px solid #ddd' }}>
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
