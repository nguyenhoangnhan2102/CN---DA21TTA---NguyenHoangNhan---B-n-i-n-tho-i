import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { getAllOrders } from "../../service/orderService"; // Import API
import moment from 'moment-timezone';
import "../css/dashboard.scss";
import {
    Typography,
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

const imgURL = process.env.REACT_APP_IMG_URL;

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState(null);
    const ordersPerPage = 10;

    useEffect(() => {
        getAllOrdersData();
    }, []);

    const getAllOrdersData = async () => {
        try {
            const response = await getAllOrders();
            console.log("res", response);
            setOrders(response);
        } catch (err) {
            console.error("Error occurred", err);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleUpdateStatus = (order, status) => {
        setSelectedOrder(order);
        setNewStatus(status);
        setOpenModal(true);
    };

    // const confirmUpdateStatus = async () => {
    //     if (selectedOrder && newStatus !== null) {
    //         try {
    //             const response = await updateStatus(selectedOrder.mahoadon, newStatus);
    //             if (response.EC === 1) {
    //                 toast.success(response.EM); // Hiển thị thông báo thành công
    //                 getAllOrdersData(); // Lấy lại danh sách đơn hàng sau khi cập nhật
    //                 setOpenModal(false); // Đóng modal
    //             } else {
    //                 toast.error(response.EM); // Hiển thị thông báo lỗi
    //             }
    //         } catch (err) {
    //             toast.error("Lỗi cập nhật trạng thái đơn hàng"); // Hiển thị thông báo lỗi khi gọi API
    //             console.error("Error occurred", err);
    //         }
    //     }
    // };

    const indexOfLast = currentPage * ordersPerPage;
    const indexOfFirst = indexOfLast - ordersPerPage;

    const currentOrders = orders
        .filter(order =>
            (order.hotenkhachhang && order.hotenkhachhang.toLowerCase().startsWith(searchTerm.toLowerCase()))
            ||
            (order.tensanpham && order.tensanpham.toLowerCase().startsWith(searchTerm.toLowerCase())))
        .slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    console.log(orders);

    return (
        <div>
            <div className="group-header">
                <h2>Danh sách</h2>
                <div className="filterGroup">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Tên người mua</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Ngày đặt</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.length > 0 ? (
                        currentOrders.map((order, index) => (
                            <tr
                                key={order.mahoadon}
                                className={order.trangthaidonhang === 2 ? "disabled-row" : ""}
                            >
                                <td>{(currentPage - 1) * ordersPerPage + index + 1}</td>
                                <td>{order.madonhang || "Không có"}</td>
                                <td>{order.tensanpham || "Không có"}</td>
                                <td>{order.hotenkhachhang || "Không có"}</td>
                                <td>{order.soluong || "Không có"}</td>
                                <td>{order.tongtien ? new Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(order.tongtien) : "Không có"}đ</td>
                                <td>
                                    <img
                                        width="70px"
                                        height="70px"
                                        src={`${imgURL}/${order.mausachinhanh}`}
                                        alt={order.tensanpham || "Hình ảnh sản phẩm"}
                                    />
                                </td>
                                <td>{moment(order.ngaydat).utcOffset(12 * 60).format('HH:mm:ss DD/MM/YYYY')}</td>
                                <td>
                                    <span
                                        className={
                                            order.trangthaidonhang === 0 ? "status-pending" :
                                                order.trangthaidonhang === 1 ? "status-delivered" :
                                                    order.trangthaidonhang === 2 ? "status-cancelled" : ""
                                        }
                                    >
                                        {order.trangthaidonhang === 0 ? (
                                            <>
                                                <i className="fa-solid fa-hourglass me-2" style={{ textAlign: "center" }}></i>
                                                Đang giao
                                            </>
                                        ) : order.trangthaidonhang === 1 ? (
                                            <>
                                                <i className="fa-solid fa-check me-2" style={{ textAlign: "center" }}></i>
                                                Đã giao
                                            </>
                                        ) : order.trangthaidonhang === 2 ? (
                                            <>
                                                <i className="fa-solid fa-ban me-2" style={{ textAlign: "center" }}></i>
                                                Hủy
                                            </>
                                        ) : (
                                            "Không có"
                                        )}
                                    </span>
                                </td>
                                <td className="d-flex gap-2 btn-status">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        style={{ width: '50px', height: '35px' }}
                                        onClick={() => handleUpdateStatus(order, 1)}
                                        disabled={order.trangthaidonhang === 1 || order.trangthaidonhang === 2}
                                    >
                                        Giao
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        style={{ width: '50px', height: '35px' }}
                                        onClick={() => handleUpdateStatus(order, 2)}
                                        disabled={order.trangthaidonhang === 1 || order.trangthaidonhang === 2}
                                    >
                                        Hủy
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">
                                <h6>Không tìm thấy đơn hàng</h6>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end admin-pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Trước
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                            <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button
                            className="page-link"
                            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Sau
                        </button>
                    </li>
                </ul>
            </nav>

            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Xác nhận cập nhật trạng thái</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Bạn chắc chắn muốn <strong>{newStatus === 1 ? 'giao' : 'hủy'}</strong> đơn hàng này không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setOpenModal(false)}
                        className="btn btn-danger"
                    >
                        Hủy
                    </button>
                    <button
                        //onClick={confirmUpdateStatus}
                        className="btn btn-primary"
                    >
                        Xác nhận
                    </button>
                </DialogActions>
            </Dialog>
        </div >
    );
};

export default Order;
