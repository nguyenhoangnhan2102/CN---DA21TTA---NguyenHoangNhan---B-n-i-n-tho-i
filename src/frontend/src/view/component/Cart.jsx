import React, { useState } from "react";
import "../style/Cart.scss";

function Cart() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Điện Thoại iPhone 14",
            price: 25000000,
            quantity: 1,
            image: "/iphone-16-pro-max-titan-den-.jpg",
        },
        {
            id: 2,
            name: "Samsung Galaxy S22 Ultra 5G",
            price: 7000000,
            quantity: 2,
            image: "/samsung.webp",
        },
    ]);

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

    // Xóa sản phẩm
    const removeItem = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // Tính tổng tiền
    const calculateTotal = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

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
                                                onClick={() => removeItem(item.id)}
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

                {/* Phần tổng tiền và nút mua */}
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm">
                        <h4 className="text-center mb-3">Tóm Tắt Đơn Hàng</h4>
                        <p>
                            <strong>Số lượng sản phẩm:</strong>{" "}
                            {cartItems.reduce((total, item) => total + item.quantity, 0)}
                        </p>
                        <p>
                            <strong>Tổng cộng:</strong>{" "}
                            <span className="text-danger">
                                {calculateTotal().toLocaleString()} VND
                            </span>
                        </p>
                        <button className="btn btn-success w-100 mt-3">Thanh Toán</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
