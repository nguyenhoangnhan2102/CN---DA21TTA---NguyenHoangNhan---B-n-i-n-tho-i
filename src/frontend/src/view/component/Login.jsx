import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField } from "@mui/material";
import { useAuth } from "../../authentication/AuthContext";
import { toast } from "react-toastify";
import axiosInstance from "../../authentication/axiosInstance";
import Cookies from "js-cookie";
import "../style/Form.scss";

const apiUrl = process.env.REACT_APP_API_URL;
const userUrl = apiUrl + "/users"

const Login = () => {
    const navigate = useNavigate();
    const { loginIs } = useAuth();
    const [formData, setFormData] = useState(
        {
            email: "",
            password: ""
        }
    );
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`${userUrl}/login`, { account: formData });
            const { accessToken, user } = response.data.DT;

            // Lưu token vào cookie
            Cookies.set("accessToken", accessToken, { expires: 1 }); // Token tồn tại trong 1 ngày
            loginIs(); // Cập nhật trạng thái đăng nhập

            // if (user.role === 1) {
            //     toast.success("Đăng nhập thành công");
            //     navigate("/admin"); // Điều hướng đến trang quản trị
            // } else {
            //     toast.success("Đăng nhập thành công");
            //     navigate("/"); // Điều hướng đến trang chủ

            toast.success("Đăng nhập thành công");
            navigate("/"); // Điều hướng đến trang quản trị
        } catch (error) {
            setErrorMessage(error.response?.data?.EM || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className='d-lg-block d-sm-none'>
                <img src="/login.png" alt="login.png" />
            </div>
            <form className="form-login p-4 border rounded bg-light" onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center">ĐĂNG NHẬP</h2>
                {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
                <div className="mb-3 d-flex justify-content-center">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Tên đăng nhập"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mật khẩu"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='d-flex justify-content-between align-items-center form-button'>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ backgroundColor: '#F96F3A', border: 'none' }}
                    >
                        ĐĂNG NHẬP
                    </button>
                    <Link
                        to={`/register`}
                        variant="link"
                        style={{ color: 'blue', textDecoration: 'none' }}
                    >
                        Chưa có tài khoản?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
