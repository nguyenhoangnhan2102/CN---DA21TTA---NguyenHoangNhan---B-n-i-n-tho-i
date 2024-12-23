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
            <form className="form-register p-4 border rounded bg-light">
                <h2 className="mb-4 text-center">ĐĂNG KÝ</h2>
                <div className="mb-1">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Tên đăng nhập"
                        name="email"
                    />
                </div>
                <div className="mb-1">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mật khẩu"
                        name="password"
                    />
                </div>
                <div className="mb-1">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nhập lại mật khẩu"
                        name="repassword"
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

export default Login;