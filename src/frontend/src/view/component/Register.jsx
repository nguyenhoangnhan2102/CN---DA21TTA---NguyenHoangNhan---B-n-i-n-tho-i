import React, { useState } from 'react';
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
    Link,
} from "@mui/material";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please fill in all fields');
        } else {
            setError('');
            // Handle login logic here
            console.log('Logging in with:', { username, password });
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
                <h2 className="mb-4 text-center">ĐĂNG KÝ</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Tên đăng nhập"
                        name="email"
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Mật khẩu"
                        name="password"
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nhập lại mật khẩu"
                        name="repassword"
                    />
                </div>
                <div className='d-flex justify-content-center gap-4 form-button' >
                    <Link type="submit" className="btn btn-primary" style={{ color: 'white', textDecoration: 'none' }}>
                        ĐĂNG KÝ
                    </Link>
                    <Link type="submit" className="btn btn-primary" style={{ color: 'white', textDecoration: 'none' }}>
                        ĐĂNG NHẬP
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