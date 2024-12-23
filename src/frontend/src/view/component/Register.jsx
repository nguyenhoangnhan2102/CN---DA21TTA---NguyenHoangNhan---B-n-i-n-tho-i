import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../style/Form.scss";
import {
    Box,
    Button,
    TextField,
    Modal,
    Typography,
    Input,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../authentication/axiosInstance';

const apiUrl = process.env.REACT_APP_API_URL;
const userUrl = apiUrl + "/users"

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        hoten: "",
        sodienthoai: "",
        diachi: "",
    });
    const [rePassword, setRePassword] = useState("");
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (rePassword === formData.password) {
            try {
                const response = await axiosInstance.post(`${userUrl}/register`, formData);
                console.log(response.data);
                if (response.data.EC === 1) {
                    alert("Đăng ký thành công");
                    setFormData({
                        email: "",
                        password: "",
                        hoten: "",
                        sodienthoai: "",
                        diachi: "",
                    });
                    setRePassword("");
                    navigate("/login");
                }
            } catch (error) {
                console.log("error", error);
                console.error("Error registering user:", error);
                setMessage("Error registering user");
            }
        } else {
            alert("Mật khẩu nhập lại không trùng khớp");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <form className="form-register p-4 border rounded bg-light" onSubmit={handleSubmit}>
                <h2 className="mb-4 text-center">ĐĂNG KÝ</h2>
                <div className="mb-1">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Tên đăng nhập"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-1">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mật khẩu"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-1">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nhập lại mật khẩu"
                        type="password"
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                </div>
                <div className='d-flex justify-content-between align-items-center gap-4 form-button' >
                    <Link
                        className='btn btn-primary button-register'
                        variant="link"

                    >
                        ĐĂNG KÝ
                    </Link>
                    <Link
                        to={`/login`}
                        className='button-login'
                        variant="link"
                    >
                        Đã có tài khoản
                    </Link>
                </div>
            </form>
            <div className='d-lg-block d-sm-none'>
                <img src="/login.png" alt="login.png" />
            </div>
        </div>
    );
};

export default Register;