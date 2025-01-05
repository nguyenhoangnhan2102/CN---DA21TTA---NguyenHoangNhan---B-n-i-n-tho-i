// Dashboard.jsx
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom"; // Import Outlet
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import '../css/dashboard.scss';

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => { }, []);

    const onNavigateRouter = (routerName) => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        navigate(routerName);
    };
    const onLogout = () => {
        Cookies.remove("accessToken");
        navigate("/login");
    };
    return (
        <>
            <div className="sidebar">
                <Link to={`/`} style={{ textDecoration: 'none' }}>
                    <h2 className="text-white">Dashboard</h2>
                </Link>
                <ul>
                    <li
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigateRouter("/admin/thongke");
                        }}
                    >
                        <a href="">Thống kê</a>
                    </li>
                    <li
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigateRouter("/admin/products");
                        }}
                    >
                        <a href="">Sản phẩm</a>
                    </li>
                    <li
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigateRouter("/admin/colorproducts");
                        }}
                    >
                        <a href="">Màu</a>
                    </li>
                    <li
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigateRouter("/admin/manufacturers");
                        }}
                    >
                        <a href="">Thương hiệu</a>
                    </li>
                    {/* <li
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigateRouter("/admin/orders");
                        }}
                    >
                        <a href="">Đơn hàng</a>
                    </li> */}
                    <li
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigateRouter("/admin/accounts");
                        }}
                    >
                        <a href="">Tài khoản</a>
                    </li>
                    <li
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigateRouter("/admin/all-products");
                        }}
                    >
                        <a href="">Tất cả sản phẩm</a>
                    </li>
                    <li
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigateRouter("/admin/orders");
                        }}
                    >
                        <a href="">Đơn hàng</a>
                    </li>
                    <li
                        onClick={(e) => {
                            e.preventDefault();
                            onLogout();
                        }}
                    >
                        <a href="">Đăng xuất</a>
                    </li>
                </ul>
            </div>
            <div className="main-content">
                <div className="admin-header">
                    {/* <h1>Chào mừng đến với trang quản trị</h1> */}
                </div>
                <section>
                    <div className="admin-content">
                        <div className="container-admin-content">
                            <Outlet /> {/* Vị trí render các route con */}
                        </div>
                    </div>
                </section>
                <div className="admin-footer"></div>
            </div>
        </>
    );
};

export default Dashboard;
