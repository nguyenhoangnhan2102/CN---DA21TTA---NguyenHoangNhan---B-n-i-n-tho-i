import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axiosInstance from "../../authentication/axiosInstance";
import "../style/Buy.scss";

const apiUrl = process.env.REACT_APP_API_URL;
const apiProductUrl = apiUrl + '/products';
const apiOrders = apiUrl + '/orders';

const Buy = () => {
    const { masanpham } = useParams();
    const [infoProduct, setInfoProduct] = useState({});
    const [infoUser, setInfoUser] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        getUserInfoUser();
        fetchListDetailProduct();
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

    const fetchListDetailProduct = async () => {
        if (masanpham) {
            try {
                const response = await axiosInstance.get(`${apiProductUrl}/${masanpham}`);
                setInfoProduct(response.data.DT || {});
            } catch (error) {
                console.error(error.message);
            }
        }
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

    console.log(infoProduct);

    return (
        <div className="container py-5">
            <div className="row g-4">
                <div className="col-md-6">
                    <div className="info-section" style={{ backgroundColor: 'white' }}>
                        <h4>Thông Tin Khách Hàng</h4>
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
                                    label="Số điện thoại"
                                    type="text"
                                    value={infoUser.sdt}
                                />
                            </div>
                            <div className="mb-3">
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    label="Địa chỉ"
                                    type="text"
                                    value={infoUser.diachi}
                                    multiline
                                    rows={4}
                                />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="info-section" style={{ backgroundColor: 'white' }}>
                        <h4>Thông Tin Sản Phẩm</h4>
                        <div className="d-flex justify-content-center my-2">
                            <img src="/iphone-16-pro-max-titan-den-.jpg" alt="iphone-16-pro-max-titan-den-.jpg" width="200px" height="200px" />
                        </div>
                        <p>
                            <strong>Tên Sản Phẩm:</strong> {infoProduct.tensanpham}
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
