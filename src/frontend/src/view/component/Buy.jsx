import React, { useState } from "react";
import "../style/Buy.scss"; // File CSS nếu cần
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

const Buy = () => {
    const [customerInfo, setCustomerInfo] = useState({
        name: "",
        phone: "",
        address: "",
    });
    const [quantity, setQuantity] = useState(1);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCustomerInfo((prevInfo) => ({ ...prevInfo, [id]: value }));
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handlePurchase = () => {
        alert(`Mua sản phẩm thành công! Số lượng: ${quantity}`);
    };

    return (
        <div className="container py-5">
            <div className="row g-4">
                {/* Thông tin khách hàng */}
                <div className="col-md-6">
                    <div className="info-section">
                        <h4>Thông Tin Khách Hàng</h4>
                        <form>
                            <div className="mb-3">
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Họ tên"
                                    type="text"
                                    value={customerInfo.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Số điện thoại"
                                    type="text"
                                    value={customerInfo.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Địa chỉ"
                                    type="text"
                                    value={customerInfo.address}
                                    onChange={handleInputChange}
                                    multiline
                                />
                            </div>
                        </form>
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="col-md-6">
                    <div className="info-section">
                        <h4>Thông Tin Sản Phẩm</h4>
                        <div className="d-flex justify-content-center my-2">
                            <img src="/iphone-16-pro-max-titan-den-.jpg" alt="iphone-16-pro-max-titan-den-.jpg" width="200px" height="200px" />
                        </div>
                        <p>
                            <strong>Tên Sản Phẩm:</strong> Điện Thoại iPhone 14
                        </p>
                        <p>
                            <strong>Giá Tiền:</strong> 25,000,000 VND
                        </p>
                        <div className="mb-3 quantity-btn">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={decreaseQuantity}
                            >
                                -
                            </button>
                            <input
                                type="number"
                                className="form-control quantity-input"
                                value={quantity}
                                readOnly
                            />
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={increaseQuantity}
                            >
                                +
                            </button>
                        </div>
                        <button className="btn btn-success" onClick={handlePurchase}>
                            Mua
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Buy;
