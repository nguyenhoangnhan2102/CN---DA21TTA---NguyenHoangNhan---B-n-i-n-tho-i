
import { Button, Modal, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import thư viện js-cookie
import { jwtDecode } from "jwt-decode"; // Import jwt-decode
import { Container, Typography, Avatar, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../authentication/axiosInstance";
import '../style/Profile.scss';

const apiUrl = process.env.REACT_APP_API_URL + "/users";

const Profile = () => {
    // const [userData, setUserData] = useState({
    //     makhachhang: '',
    //     hoten: '',
    //     email: '',
    //     sdt: '',
    //     diachi: '',
    // });
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const [show, setShow] = useState(false);
    // const navigate = useNavigate();
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const [makhachhang, setMaKhachHang] = useState("");
    // const [hoten, setHoTen] = useState("");
    // const [sdt, setSDT] = useState("");
    // const [diachi, setDiaChi] = useState("");

    // const [showChangePassword, setShowChangePassword] = useState(false);
    // const handleCloseChangePassword = () => setShowChangePassword(false);
    // const handleShowChangePassword = () => setShowChangePassword(true);

    // const [showChooseOption, setShowChooseOption] = useState(false);
    // const handleCloseChooseOption = () => setShowChooseOption(false);

    // const token = Cookies.get("accessToken");
    // useEffect(() => {
    //     if (!token) {
    //         navigate("/login")
    //     }
    //     // fetchUserProfile();
    // }, []);

    // useEffect(() => {
    // }, [userData]);

    // // const fetchUserProfile = async () => {
    // //     try {
    // //         const decodedToken = jwtDecode(token); // Giải mã token
    // //         setMaKhachHang(decodedToken.makhachhang);
    // //         const response = await axios.post(
    // //             `http://localhost:8080/api/users/profile`,
    // //             { makhachhang: decodedToken.makhachhang }
    // //         );
    // //         if (response.data.EC === 200) {
    // //             setUserData(response.data.DT);
    // //             console.log("Dữ liệu người dùng:", response.data.DT);
    // //             const user = response.data.DT[0];
    // //             setHoTen(user.hoten);
    // //             setSDT(user.sdt);
    // //             setDiaChi(user.diachi);
    // //         }
    // //     } catch (err) {
    // //         setError(err.message); // Lưu thông báo lỗi vào trạng thái
    // //     } finally {
    // //         setLoading(false); // Đặt trạng thái loading thành false
    // //     }
    // // };

    // const handleSubmit = async () => {
    //     // Validate phone number
    //     const phoneRegex = /^[0-9]*$/; // Regular expression to allow only digits

    //     if (!phoneRegex.test(sdt)) {
    //         toast.error("Số điện thoại phải là số.");
    //         return;
    //     }

    //     if (sdt.length !== 10) {
    //         toast.error("Số điện thoại phải gồm đúng 10 số.");
    //         return;
    //     }

    //     try {
    //         const token = Cookies.get("accessToken");

    //         if (!token) {
    //             alert("Bạn chưa đăng nhập.");
    //             return;
    //         }

    //         const response = await axiosInstance.put(
    //             `http://localhost:8080/api/users/update/${makhachhang}`,
    //             { hoten, sdt, diachi },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );

    //         if (response.data.EC === 200) {
    //             toast.success("Cập nhật thành công!");
    //             setUserData((prevUserData) => [
    //                 {
    //                     ...prevUserData[0],
    //                     hoten: hoten,
    //                     sdt: sdt,
    //                     diachi: diachi,
    //                 },
    //             ]);
    //             handleClose(); // Đóng modal sau khi cập nhật thành công
    //         } else {
    //             alert(response.data.EM);
    //         }
    //     } catch (err) {
    //         alert("Cập nhật thất bại. Vui lòng thử lại sau.");
    //         console.error("Error updating user:", err);
    //     }
    // };

    // const user = userData?.[0];

    return (
        <>
            <section className="profile-section h-100 d-flex">
                <div className="profile-container h-100 d-flex">
                    <div
                        className="profile-content container "
                        style={{ height: "75vh", marginBottom: "10px" }}
                    >
                        <section className="profile-section">
                            <h2 className="profile-section__title">
                                <h4>Thông tin tài khoản</h4>
                            </h2>
                            <p className="profile-section__description">
                                Bạn có thể cập nhật Hồ sơ Công khai của mình tại đây và thông
                                tin sẽ tự động đồng bộ ở tất cả các hệ thống
                            </p>
                            <div className="d-flex justify-content-end gap-2">
                                <button className="profile-info-box__btn">
                                    Cập nhật
                                </button>
                            </div>
                            <div className="profile-info-box">
                                <div className="profile-info-box__item">
                                    <span className="profile-info-box__label">
                                        <strong>Hình đại diện</strong>
                                    </span>
                                    <img src="/avatar.webp" alt="avatar.webp" width="50px" height="50px" />
                                </div>
                                <div className="profile-info-box__item">
                                    <span className="profile-info-box__label">
                                        <strong>Tên hiển thị</strong>
                                    </span>
                                    <span className="profile-info-box__value">
                                        Nguyễn Hoàng Nhân
                                    </span>
                                </div>
                            </div>
                        </section>
                        <section className="profile-section mt-4">
                            <h2 className="profile-section__title">Thông tin cá nhân</h2>
                            <div className="profile-info-box">
                                <div className="profile-info-box__item">
                                    <span className="profile-info-box__label">
                                        <strong>Địa chỉ Email</strong>
                                    </span>
                                    <span className="profile-info-box__value">
                                        nhnhan2102@gmail.com
                                    </span>
                                </div>
                                <div className="profile-info-box__item">
                                    <span className="profile-info-box__label">
                                        <strong>Số điện thoại</strong>
                                    </span>
                                    <span className="profile-info-box__value">
                                        0987863073
                                    </span>

                                </div>
                                <div className="profile-info-box__item">
                                    <span className="profile-info-box__label">
                                        <strong>Địa chỉ</strong>
                                    </span>
                                    <span className="profile-info-box__value">
                                        Trà Vinh
                                    </span>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Profile;