import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axiosInstance from "../../authentication/axiosInstance";
import "../style/Cart.scss";

const apiUrl = process.env.REACT_APP_API_URL;
const imgURL = process.env.REACT_APP_IMG_URL;

function Cart() {
    const [infoUser, setInfoUser] = useState({});
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [subTotal, setSubTotal] = useState(0);

    useEffect(() => {
        getUserInfoUser();
        fetchCartItems();
    }, []);

    const getUserInfoUser = async () => {
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                setInfoUser(decodedToken || {});
                console.log("Decoded Token:", decodedToken);

                const makhachhang = decodedToken.makhachhang; // Lấy giá trị makhachhang từ token
                console.log("Customer ID:", makhachhang);

                if (makhachhang) {
                    await fetchCartItems(makhachhang); // Gọi API với makhachhang
                } else {
                    console.error("ID not found in token.");
                }
            } catch (error) {
                console.error("Error decoding JWT:", error);
            }
        } else {
            console.log("No Access Token found in Cookie");
        }
    };


    const fetchCartItems = async (makhachhang) => {
        if (!makhachhang) {
            console.error("User ID is undefined, cannot fetch cart items.");
            toast.error("Lỗi khi lấy dữ liệu giỏ hàng: User ID không xác định.");
            return;
        }

        try {
            const response = await axiosInstance.get(`${apiUrl}/cart/${makhachhang}`);
            console.log("Cart items:", response.data);
            if (response.data.EC === 1) {
                const updatedItems = response.data.DT.map((item) => ({
                    ...item,
                    soluongsanpham: item.soluongsanpham || 1,
                }));
                setCartItems(updatedItems);
                calculateSubTotal(updatedItems);
                calculateTotalQuantity(updatedItems);
            } else {
                console.error(response.data.EM);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
            toast.error("Lỗi khi lấy dữ liệu giỏ hàng.");
        }
    };


    const calculateSubTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.gia * item.soluong, 0);
        setSubTotal(total);
    };

    const calculateTotalQuantity = (items) => {
        const totalQty = items.reduce((sum, item) => sum + item.soluong, 0);
        setTotalQuantity(totalQty);
    };

    const handleIncrease = (masanpham) => {
        const updatedItems = cartItems.map((item) =>
            item.masanpham === masanpham
                ? { ...item, soluong: item.soluong + 1 }
                : item
        );
        setCartItems(updatedItems);
        calculateSubTotal(updatedItems);
        calculateTotalQuantity(updatedItems);
    };

    const handleDecrease = (masanpham) => {
        const updatedItems = cartItems.map((item) =>
            item.masanpham === masanpham && item.soluong > 1
                ? { ...item, soluong: item.soluong - 1 }
                : item
        );
        setCartItems(updatedItems);
        calculateSubTotal(updatedItems);
        calculateTotalQuantity(updatedItems);
    };


    console.log("API URL:", apiUrl); // Kiểm tra biến apiUrl

    return (
        <div className="container py-5">
            <h2 className="text-center mb-4">Giỏ Hàng</h2>
            <div className="row">
                {/* Phần thông tin sản phẩm */}
                <div className="col-md-8">
                    {cartItems && cartItems.length > 0 ?
                        cartItems.map((item) => (
                            <div key={item.masanpham} className="card mb-3 shadow-sm">
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img
                                            src={`${imgURL}/${item.hinhanhchinh}`}
                                            alt={item.tensanpham}
                                            width="65px"
                                            className="img-fluid rounded-3"
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.tensanpham}</h5>
                                            <p className="card-text text-muted">
                                                Giá: {item.giasanpham.toLocaleString()} VND
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <button
                                                    className="btn btn-outline-primary btn-sm"
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2">{item.soluongsanpham || 1}</span>
                                                <button
                                                    className="btn btn-outline-primary btn-sm"
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
                        )) :
                        (
                            <div className="col-12"> Không có sản phẩm trong giỏ hàng</div>
                        )}
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
