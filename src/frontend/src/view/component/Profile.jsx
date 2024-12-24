import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../../authentication/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import "../style/Profile.scss";
import Cookies from "js-cookie"; // Import thư viện js-cookie
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const apiUrl = process.env.REACT_APP_API_URL + "/users";

export default function Profile() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = Cookies.get("accessToken");

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const decodedToken = jwtDecode(token);
            const response = await axiosInstance.post(`${apiUrl}/profile`, { id: decodedToken.id });
            console.log("response", response);
            if (response.data.EC === 200) {
                setUserInfo(response.data.DT[0]);
            } else {
                toast.error(response.data.EM);
            }
        } catch (error) {
            toast.error("Xảy ra lỗi khi lấy thông tin người dùng");
            console.error("Error fetching user profile:", error);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return <div>Đang tải thông tin...</div>;
    }

    if (!userInfo) {
        return <div>Không tìm thấy thông tin người dùng</div>;
    }

    return (
        <section className="profile-section h-100 d-flex">
            <div className="profile-container h-100 d-flex">
                <div className="profile-content container" style={{ height: "75vh", marginBottom: "10px" }}>
                    <section className="profile-section">
                        <h2 className="profile-section__title">
                            <h4>Thông tin tài khoản</h4>
                        </h2>
                        <p className="profile-section__description">
                            Bạn có thể cập nhật Hồ sơ Công khai của mình tại đây và thông tin sẽ tự động đồng bộ ở tất cả các hệ thống.
                        </p>
                        <div className="d-flex justify-content-end gap-2">
                            <button className="profile-info-box__btn">Cập nhật</button>
                        </div>
                        <div className="profile-info-box">
                            <div className="profile-info-box__item">
                                <span className="profile-info-box__label"><strong>Hình đại diện</strong></span>
                                <img src="/avatar.webp" alt="avatar.webp" width="50px" height="50px" />
                            </div>
                            <div className="profile-info-box__item">
                                <span className="profile-info-box__label"><strong>Tên hiển thị</strong></span>
                                <span className="profile-info-box__value">{userInfo.hoten || "Chưa cập nhật"}</span>
                            </div>
                        </div>
                    </section>
                    <section className="profile-section mt-4">
                        <h2 className="profile-section__title">Thông tin cá nhân</h2>
                        <div className="profile-info-box">
                            <div className="profile-info-box__item">
                                <span className="profile-info-box__label"><strong>Địa chỉ Email</strong></span>
                                <span className="profile-info-box__value">{userInfo.email || "Chưa cập nhật"}</span>
                            </div>
                            <div className="profile-info-box__item">
                                <span className="profile-info-box__label"><strong>Số điện thoại</strong></span>
                                <span className="profile-info-box__value">{userInfo.sodienthoai || "Chưa cập nhật"}</span>
                            </div>
                            <div className="profile-info-box__item">
                                <span className="profile-info-box__label"><strong>Địa chỉ</strong></span>
                                <span className="profile-info-box__value">{userInfo.diachi || "Chưa cập nhật"}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
