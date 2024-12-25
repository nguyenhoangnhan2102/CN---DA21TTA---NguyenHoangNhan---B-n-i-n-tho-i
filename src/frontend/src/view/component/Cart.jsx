import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode"; // Đã sửa lại import không destructure
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
        const accessToken = Cookies.get("accessToken");
        if (accessToken) {
            try {
                const decodedToken = jwtDecode(accessToken);
                if (decodedToken) {
                    setInfoUser(decodedToken);
                    fetchCartItems(decodedToken.makhachhang);
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
            const { EC, DT } = response.data;
            if (EC === 1) {
                const updatedItems = DT.map((item) => ({
                    ...item,
                    soluongsanpham: item.soluongsanpham || 1, // Đảm bảo số lượng mặc định là 1
                }));
                setCartItems(updatedItems);
                calculateTotals(updatedItems);
            } else {
                console.warn(response.data.EM);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
        }
    };


    const calculateTotals = (items) => {
        let totalQty = 0;
        let totalPrice = 0;
        items.forEach((item) => {
            totalQty += item.soluongsanpham || 1;
            totalPrice += (item.soluongsanpham || 1) * item.giasanpham;
        });
        setTotalQuantity(totalQty);
        setSubTotal(totalPrice);
    };

    const handleQuantityChange = (index, change) => {
        const updatedCart = [...cartItems];
        const item = updatedCart[index];

        // Kiểm tra giới hạn số lượng tối đa
        const maxQuantity = item.soluongton || Infinity; // Giả sử có trường `soluongton` lưu số lượng tồn
        const newQuantity = (item.soluongsanpham || 1) + change;

        if (newQuantity > 0 && newQuantity <= maxQuantity) {
            item.soluongsanpham = newQuantity;
            setCartItems(updatedCart);
            calculateTotals(updatedCart);
        } else if (newQuantity > maxQuantity) {
            alert(`Sản phẩm "${item.tensanpham}" đã đạt số lượng tối đa (${maxQuantity})!`);
        }
    };


    return (
        <div className="container py-5 ">
            <h2 className="text-center mb-4">Giỏ Hàng</h2>
            <div className="row">
                <div className="col-md-8">
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
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
                                            <p className="card-text text-muted">
                                                Giá: {item.giasanpham.toLocaleString()} VND
                                            </p>
                                            <div className="d-flex align-items-center">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => handleQuantityChange(index, -1)}
                                                >
                                                    -
                                                </button>
                                                <span className="mx-3">
                                                    {item.soluongsanpham || 1}
                                                </span>
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => handleQuantityChange(index, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">Không có sản phẩm trong giỏ hàng</div>
                    )}
                </div>

                <div className="col-md-4">
                    <div className="card p-3 shadow-sm mb-3">
                        <h4 className="text-center mb-3">Thông Tin Người Mua</h4>
                        <form>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Họ tên"
                                type="text"
                                value={infoUser.hoten || ""}

                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Số điện thoại"
                                type="text"
                                value={infoUser.sodienthoai || ""}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Địa chỉ giao hàng"
                                type="text"
                                value={infoUser.diachi || ""}
                                multiline
                                rows={2}
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
