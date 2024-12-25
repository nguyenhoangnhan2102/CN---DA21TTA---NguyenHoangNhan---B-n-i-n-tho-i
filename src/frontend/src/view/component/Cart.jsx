import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import axiosInstance from "../../authentication/axiosInstance";
import "../style/Cart.scss";

const apiUrl = process.env.REACT_APP_API_URL;
const imgURL = process.env.REACT_APP_IMG_URL;

function Cart() {
    const [infoUser, setInfoUser] = useState({});
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                if (decodedToken) {
                    setInfoUser(decodedToken);
                    fetchCartItems(decodedToken.makhachhang);  // Fetch cart items when user info is available
                }
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        } else {
            console.error("Access token not found in cookies");
        }
    }, []);

    // Hàm gọi API để lấy tất cả sản phẩm trong giỏ hàng
    const fetchCartItems = async (makhachhang) => {
        try {
            const response = await axiosInstance.get(`${apiUrl}/cart/${makhachhang}`);
            if (response.data.EC === 1) {
                setCartItems(response.data.DT);

                // Tính tổng số lượng và tổng giá trị sản phẩm
                const totalQty = response.data.DT.reduce((acc, item) => acc + item.soluongsanpham, 0);
                const subTotalAmount = response.data.DT.reduce((acc, item) => acc + item.soluongsanpham * item.giasanpham, 0);

                setTotalQuantity(totalQty);
                setSubTotal(subTotalAmount);
            } else {
                console.error("No products found in the cart");
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const handleQuantityChange = (masanpham, type) => {
        setCartItems(prevItems => {
            const updatedCartItems = prevItems.map(item => {
                if (item.masanpham === masanpham) {
                    const updatedQuantity = type === "increase"
                        ? item.soluongsanpham + 1
                        : item.soluongsanpham > 1
                            ? item.soluongsanpham - 1
                            : item.soluongsanpham; // Không giảm xuống dưới 1

                    return { ...item, soluongsanpham: updatedQuantity };
                }
                return item;
            });

            // Cập nhật lại tổng số lượng và tổng giá trị
            const totalQty = updatedCartItems.reduce((acc, item) => acc + item.soluongsanpham, 0);
            const subTotalAmount = updatedCartItems.reduce((acc, item) => acc + item.soluongsanpham * item.giasanpham, 0);

            setTotalQuantity(totalQty);
            setSubTotal(subTotalAmount);

            return updatedCartItems;
        });
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setInfoUser(prevState => ({
            ...prevState,
            [name]: value,  // Cập nhật giá trị của trường tương ứng
        }));
    };


    console.log(cartItems);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Giỏ Hàng</h2>
            <div className="row">
                {/* Phần thông tin sản phẩm */}
                <div className="col-md-8">
                    {cartItems.length === 0 ? (
                        <p>Giỏ hàng của bạn đang trống</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.masanpham} className="card mb-3 shadow-sm">
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img
                                            src={`${imgURL}/${item.hinhanhchinh}`}
                                            alt={item.tensanpham}
                                            className="img-fluid rounded-3"
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.tensanpham}</h5>
                                            <p className="card-text text-muted">Giá: {item.giasanpham.toLocaleString()} VND</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <button
                                                        className="btn btn-outline-secondary me-2"
                                                        onClick={() => handleQuantityChange(item.masanpham, "decrease")}
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.soluongsanpham}</span>
                                                    <button
                                                        className="btn btn-outline-secondary ms-2"
                                                        onClick={() => handleQuantityChange(item.masanpham, "increase")}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <p className="card-text">Số lượng: {item.soluongsanpham}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Phần thông tin người mua và tóm tắt */}
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm mb-3">
                        <h4 className="text-center mb-3">Thông Tin Người Mua</h4>
                        <form>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Họ tên"
                                type="text"
                                name="hoten"
                                value={infoUser.hoten || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Số điện thoại"
                                type="text"
                                name="sodienthoai"
                                value={infoUser.sodienthoai || ""}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Địa chỉ giao hàng"
                                type="text"
                                name="diachi"
                                value={infoUser.diachi || ""}
                                onChange={handleChange}
                                multiline
                                rows={3}
                            />
                        </form>
                    </div>
                    <div className="card p-3 shadow-sm">
                        <h4 className="text-center mb-3">Tóm Tắt Đơn Hàng</h4>
                        <p>
                            <strong>Số lượng sản phẩm:</strong> {totalQuantity}
                        </p>
                        <p>
                            <strong>Tổng cộng:</strong>{" "}
                            <span className="text-danger">{subTotal.toLocaleString()} VND</span>
                        </p>
                        <button className="btn btn-success w-100 mt-3">Thanh Toán</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
