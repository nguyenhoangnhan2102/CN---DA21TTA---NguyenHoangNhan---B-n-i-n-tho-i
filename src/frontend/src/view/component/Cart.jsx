import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axiosInstance from "../../authentication/axiosInstance";
import "../style/Cart.scss";

function Cart() {
    const [infoUser, setInfoUser] = useState({});
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        getUserInfoUser();
    }, []);

    const getUserInfoUser = () => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                setInfoUser(decodedToken || {});
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        } else {
            console.log("No Access Token found in Cookie");
        }
    };

    // Tăng số lượng sản phẩm
    const increaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Giảm số lượng sản phẩm
    const decreaseQuantity = (id) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Giỏ Hàng</h2>
            <div className="row">
                {/* Phần thông tin sản phẩm */}
                <div className="col-md-8">
                    {cartItems.map((item) => (
                        <div key={item.id} className="card mb-3 shadow-sm">
                            <div className="row g-0">
                                <div className="col-md-3">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="img-fluid rounded-start"
                                    />
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text text-muted">
                                            Giá: {item.price.toLocaleString()} VND
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => decreaseQuantity(item.id)}
                                            >
                                                -
                                            </button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <button
                                                className="btn btn-outline-primary btn-sm"
                                                onClick={() => increaseQuantity(item.id)}
                                            >
                                                +
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm ms-3"
                                            >
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Phần thông tin người mua và tóm tắt */}
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm mb-3">
                        <h4 className="text-center mb-3">Thông Tin Người Mua</h4>
                        <form>
                            <div className="mb-3">
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Họ tên"
                                    type="text"
                                    value={infoUser.hoten}
                                />
                            </div>
                            <div className="mb-3">
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Họ tên"
                                    type="text"
                                    value={infoUser.sodienthoai}
                                />
                            </div>
                            <div className="mb-3">
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Họ tên"
                                    type="text"
                                    value={infoUser.diachi}
                                    multiline
                                    rows={4}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="card p-3 shadow-sm">
                        <h4 className="text-center mb-3">Tóm Tắt Đơn Hàng</h4>
                        <p>
                            <strong>Số lượng sản phẩm:</strong>{" "}
                            {cartItems.reduce((total, item) => total + item.quantity, 0)}
                        </p>
                        <p>
                            <strong>Tổng cộng:</strong>{" "}
                            <span className="text-danger">
                            </span>
                        </p>
                        <button
                            className="btn btn-success w-100 mt-3"
                        >
                            Thanh Toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
