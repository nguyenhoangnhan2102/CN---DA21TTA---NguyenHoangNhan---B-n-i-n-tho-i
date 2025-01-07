import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
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

    const fetchCartItems = async (makhachhang) => {
        try {
            const response = await axiosInstance.get(`${apiUrl}/cart/${makhachhang}`);
            if (response.data.EC === 1) {
                const updatedItems = response.data.DT.map((item) => ({
                    ...item,
                    soluong: item.soluong || 1,
                }));
                setCartItems(updatedItems);
                calculateSubTotal(updatedItems);
                calculateTotalQuantity(updatedItems);
            } else {
                console.error(response.data.EM);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };

    const handleCheckout = async () => {
        if (!infoUser.hoten || !infoUser.sodienthoai || !infoUser.diachi) {
            toast.warning("Vui lòng nhập đầy đủ thông tin!!!");
            return;
        }
        if (cartItems.length === 0) {
            toast.warning("Giỏ hàng của bạn đang trống.");
            return;
        }
        try {
            const orderData = {
                makhachhang: infoUser.makhachhang, // ID khách hàng từ JWT decode
                hotenkhachhang: infoUser.hoten,
                sdtkhachhang: infoUser.sodienthoai,
                diachigiaohang: infoUser.diachi,
                tongtien: subTotal,
                chiTietSanPham: cartItems.map(item => ({
                    masanpham: item.masanpham,
                    mamau: item.mamau, // Nếu có mã màu
                    giatien: item.gia,
                    soluong: item.soluong
                }))
            };
            const response = await axiosInstance.post(`${apiUrl}/orders`, orderData);
            if (response.data.success) {

                await axiosInstance.post(`${apiUrl}/cart/delete`, {
                    makhachhang: infoUser.makhachhang
                });
                toast.success("Đặt hàng thành công!");
                setCartItems([]);
                setTotalQuantity(0);
                setSubTotal(0);
            } else {
                toast.error(`Đặt hàng thất bại: ${response.data.message}`);
            }
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
            toast.error("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại.");
        }
    };

    const handleDelete = async (magiohang, masanpham, mamau) => {
        await axiosInstance.delete(`${apiUrl}/cart/${magiohang}/${masanpham}/${mamau}`);
        toast.success("Xóa sản phẩm khỏi giỏ hàng thành công");
        setCartItems([]);
    };

    const calculateSubTotal = (items) => {
        const total = items.reduce((sum, item) => sum + item.gia * item.soluong, 0);
        setSubTotal(total);
    };

    const calculateTotalQuantity = (items) => {
        const totalQty = items.reduce((sum, item) => sum + item.soluong, 0);
        setTotalQuantity(totalQty);
    };

    const handleIncrease = (mamau) => {
        const updatedItems = cartItems.map((item) =>
            item.mamau === mamau
                ? { ...item, soluong: item.soluong + 1 } // Tăng số lượng của sản phẩm cụ thể
                : item // Giữ nguyên các sản phẩm khác
        );
        setCartItems(updatedItems); // Cập nhật lại danh sách giỏ hàng
        calculateSubTotal(updatedItems); // Cập nhật tổng tiền
        calculateTotalQuantity(updatedItems); // Cập nhật tổng số lượng
    };

    const handleDecrease = (mamau) => {
        const updatedItems = cartItems.map((item) =>
            item.mamau === mamau && item.soluong > 1
                ? { ...item, soluong: item.soluong - 1 } // Giảm số lượng nếu lớn hơn 1
                : item // Giữ nguyên các sản phẩm khác
        );
        setCartItems(updatedItems); // Cập nhật lại danh sách giỏ hàng
        calculateSubTotal(updatedItems); // Cập nhật tổng tiền
        calculateTotalQuantity(updatedItems); // Cập nhật tổng số lượng
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInfoUser(prevState => ({
            ...prevState,
            [name]: value,  // Cập nhật giá trị của trường tương ứng
        }));
    };

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
                            <div key={item.magiohang} className="card mb-3 shadow-sm">
                                <div className="row g-0">
                                    <div className="col-md-3">
                                        <img
                                            src={`${imgURL}/${item.mausachinhanh}`}
                                            alt={item.tensanpham}
                                            className="img-fluid rounded-3"
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <h5 className="card-title">{item.tensanpham}</h5>
                                                <button
                                                    style={{ border: "none", background: "none" }}
                                                    onClick={() => handleDelete(item.magiohang, item.masanpham, item.mamau)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </div>
                                            <p className="card-text text-muted ">
                                                Giá: {parseFloat(item.gia).toLocaleString()} VND
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center mt-2">
                                                <div
                                                    className="d-flex align-items-center border rounded"
                                                    style={{ border: "1px solid #ccc", height: "40px" }}
                                                >
                                                    <button
                                                        className="p-3"
                                                        onClick={() => handleDecrease(item.mamau)}
                                                        style={{ border: "none", background: "none" }}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="item-soluong p-3">{item.soluong}</span>
                                                    <button
                                                        className="p-3"
                                                        onClick={() => handleIncrease(item.mamau)}
                                                        style={{ border: "none", background: "none" }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <p className="card-text">Số lượng: {item.soluong}</p>
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
                        <h4 className="text-center mb-3">Thông tin người mua</h4>
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
                                type="number"
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
                        <h4 className="text-center mb-3">Tóm tắt đơn hàng</h4>
                        <p>
                            <strong>Số lượng sản phẩm:</strong> {totalQuantity}
                        </p>
                        <p>
                            <strong>Tổng cộng:</strong>{" "}
                            <span className="text-danger">{subTotal.toLocaleString()} VND</span>
                        </p>
                        <button
                            className="btn btn-success w-100 mt-3"
                            onClick={handleCheckout}
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
