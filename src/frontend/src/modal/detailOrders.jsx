import React, { useState } from "react";
import {
    Typography,
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material"; // Ensure these are imported
import moment from "moment";

const imgURL = process.env.REACT_APP_IMG_URL;

const OrderDetails = ({ open, onClose, order }) => {
    if (!order) return null; // Nếu không có order thì không render modal

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Chi tiết đơn hàng {order.madonhang}</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    <strong>Tên khách hàng:</strong> {order.tenkhachhang}
                </Typography>
                <Typography variant="body1">
                    <strong>Số điện thoại:</strong> {order.sdtkhachhang}
                </Typography>
                <Typography variant="body1">
                    <strong>Địa chỉ giao hàng:</strong> {order.diachigiaohang}
                </Typography>
                <Typography variant="body1">
                    <strong>Ngày đặt:</strong> {moment(order.ngaydat).format('HH:mm:ss DD/MM/YYYY')}
                </Typography>
                <Typography variant="body1">
                    <strong>Tổng tiền:</strong> {new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(order.tongtien)} đ
                </Typography>
                <Typography variant="body1">
                    <strong>Trạng thái đơn hàng:</strong> {order.trangthaidonhang === 0 ? 'Đang giao' : order.trangthaidonhang === 1 ? 'Đã giao' : 'Hủy'}
                </Typography>
                <Typography variant="body1">
                    <strong>Sản phẩm:</strong>
                    <ul>
                        {order.products && order.products.length > 0 ? (
                            order.products.map((product, index) => (
                                <li key={index}>
                                    {product.tensanpham} - {product.soluong} x {new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(product.giatien)} đ
                                    <img
                                        width={`70px`}
                                        height={`70px`}
                                        src={`${imgURL}${product.mausachinhanh}`}
                                        alt={product.tensanpham || "Hình ảnh sản phẩm"}
                                    />
                                </li>
                            ))
                        ) : (
                            <li>Không có sản phẩm trong đơn hàng</li>
                        )}
                    </ul>
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default OrderDetails;
