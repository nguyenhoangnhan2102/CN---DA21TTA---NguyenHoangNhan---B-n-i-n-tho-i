import { Container, Form, Nav, Navbar } from 'react-bootstrap/';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineSmartphone } from "react-icons/md";
import { Avatar, Menu, MenuItem, Button } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useEffect, useState } from 'react';
import { useAuth } from '../../authentication/AuthContext';
import axiosInstance from '../../authentication/axiosInstance';
import Cookies from "js-cookie";
import '../style.scss';

const apiUrl = process.env.REACT_APP_API_URL;
const userURL = apiUrl + '/users';

const Header = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [UserData, setUserData] = useState("");
    const { isLoggedIn, logoutIs } = useAuth();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const token = Cookies.get("accessToken");
        if (token) {
            fetchProfileUser();
        }
    }, [isLoggedIn]);

    const fetchProfileUser = async () => {
        try {
            const token = Cookies.get("accessToken");

            if (token) {
                const decodedToken = jwtDecode(token);
                const response = await axiosInstance.post(`${userURL}/profile`, { id: decodedToken.id });
                console.log("Decoded token:", response.data);
                if (response.data.EC === 200) {
                    setUserData(response.data.DT[0]);
                } else {
                    toast.error("Đã xảy ra lỗi");
                }
            } else {
                navigate("/login");
            }
        } catch (err) {
            console.log(err.message); // Lưu thông báo lỗi vào trạng thái
        } finally {
        }
    };

    const handleOptionClick = (option) => {
        if (option === "Logout") {
            // Xóa cookie khi đăng xuất
            Cookies.remove("accessToken", { path: "", expires: 1 });
            logoutIs();  // Cập nhật trạng thái đăng nhập
            navigate("/login");  // Chuyển hướng tới trang đăng nhập
        } else if (option === "Profile") {
            navigate("/profile");
        }
        handleClose();
    };

    return (
        <>
            <Navbar expand="lg" className="navbar-container">
                <Container fluid>
                    <Navbar className='navbar-logo'>
                        <Link
                            to={`/`}
                            className="d-flex align-items-center text-decoration-none fst-italic"
                            style={{ fontSize: "25px", fontWeight: 'bold', color: 'black' }}>
                            <MdOutlineSmartphone style={{ fontSize: "50px" }} />
                            SHOPPHONE
                        </Link>
                    </Navbar>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                        <Form className="d-flex align-items-center" style={{ marginRight: '30px' }}>
                            <Link
                                to={`/cart`}
                                className="text-decoration-none text-dark">
                                <i
                                    className="fa-solid fa-cart-shopping me-4 d-flex align-items-center"
                                    style={{ fontSize: "25px", cursor: 'pointer' }}>
                                </i>
                            </Link>
                            {isLoggedIn ? (
                                <>
                                    {UserData ? (
                                        <>
                                            <li className="header-avata d-flex align-items-center">
                                                <p onClick={handleClick} title="User Dropdown" className="d-flex justify-content-end">
                                                    <Avatar
                                                        sx={{ mr: 2 }}
                                                        alt="User Avatar"
                                                        src="/path/to/avatar.jpg"
                                                    />
                                                </p>
                                            </li>
                                        </>
                                    ) : (
                                        <>

                                        </>
                                    )}</>
                            ) : (
                                <>
                                    <div className="nav navbar-right col-3 w-75">
                                        <Link to={`/login`} className='btn btn-primary'>Đăng nhập</Link>
                                    </div></>
                            )}
                        </Form>
                    </Navbar.Collapse>
                    <div>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            style={{ marginLeft: '0', marginTop: '10px' }}
                        >
                            <MenuItem onClick={() => handleOptionClick("Profile")}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => handleOptionClick("Logout")}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </Container>
            </Navbar >
        </>
    );
}
export default Header;