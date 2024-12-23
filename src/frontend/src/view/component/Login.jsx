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

const Login = () => {

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <div className='d-lg-block d-sm-none'>
                <img src="/login.png" alt="login.png" />
            </div>
            <form className="form-login p-4 border rounded bg-light">
                <h2 className="mb-4 text-center">ĐĂNG NHẬP</h2>
                <div className="mb-3 d-flex justify-content-center">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Tên đăng nhập"
                        name="email"
                    />
                </div>
                <div className="mb-3 d-flex justify-content-center">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mật khẩu"
                        name="password"
                    />
                </div>
                <div className='d-flex justify-content-between align-items-center form-button' >
                    <Link
                        className="btn btn-primary"
                        style={{ backgroundColor: '#F96F3A', border: 'none' }}
                        variant="link"
                    >
                        ĐĂNG NHẬP
                    </Link>
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