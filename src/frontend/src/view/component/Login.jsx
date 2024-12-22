import React, { useState } from "react";
import "../style/Login.scss";

function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (!formData.username || !formData.password) {
            setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
            return;
        }
        setError("");
        alert(`Đăng nhập thành công! Chào mừng, ${formData.username}`);
        // Thực hiện các bước xử lý đăng nhập ở đây
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Đăng Nhập</h2>
                <form onSubmit={handleLogin}>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                        <label className="form-label">Tên Đăng Nhập</label>
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mật Khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Đăng Nhập
                    </button>
                </form>
                <div className="text-center mt-3">
                    <a href="#!" className="text-decoration-none">
                        Quên mật khẩu?
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Login;
