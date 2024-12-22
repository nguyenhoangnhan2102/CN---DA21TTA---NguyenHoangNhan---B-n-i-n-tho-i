import React, { useState } from "react";
import "../style/Register.scss";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;

        if (!username || !email || !password || !confirmPassword) {
            setError("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp!");
            return;
        }

        setError("");
        alert(`Đăng ký thành công! Chào mừng, ${username}`);
        // Thực hiện xử lý đăng ký ở đây
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4">Đăng Ký</h2>
                <form onSubmit={handleRegister}>
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
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Nhập email"
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
                    <div className="mb-3">
                        <label className="form-label">Xác Nhận Mật Khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Nhập lại mật khẩu"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Đăng Ký
                    </button>
                </form>
                <div className="text-center mt-3">
                    <a href="#!" className="text-decoration-none">
                        Đã có tài khoản? Đăng nhập
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Register;
