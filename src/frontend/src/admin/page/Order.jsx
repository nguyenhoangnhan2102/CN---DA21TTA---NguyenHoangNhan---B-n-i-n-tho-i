import { useEffect, useState } from "react";
import { getAllOrders } from "../../service/orderService";
const imgURL = process.env.REACT_APP_IMG_URL;
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const ordersPerPage = 10;

    useEffect(() => {
        getAllOrderList();
    }, []);

    const getAllOrderList = async () => {
        try {
            const response = await getAllOrders();
            if (response.EC === 1) {
                console.log(response.DT);
                setOrders(response.DT || []);
            }
            else {
                console.error("Failed");
            }
        }
        catch (error) {
            console.log("Failed", error)
        }

    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const indexOfLastUser = currentPage * ordersPerPage;
    const indexOfFirstUser = indexOfLastUser - ordersPerPage;

    const currentOrders = orders
        .filter(
            (order) =>
                order.tensanpham.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(orders.length / ordersPerPage);



    return (
        <div>
            <div className="group-header">
                <h2>Danh sách người dùng</h2>
                <div className="filterGroup">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tìm kiếm người dùng"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            {/* Users Table */}
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Khách hàng</th>
                        <th scope="col">Địa chỉ giao</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Màu</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Ngày lập</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.length > 0 ? (
                        currentOrders.map((order, index) => (
                            <tr key={order.machitietdonhang}>
                                <td>{order.machitietdonhang}</td>
                                <td>{order.tensanpham || "Không có tên"}</td>
                                <td>{order.hotenkhachhang || "Không có email"}</td>
                                <td>{order.diachikhachhang}</td>
                                <td>{order.soluong}</td>
                                <td>{order.tongtien}</td>
                                <td>{order.tenmausanpham}</td>
                                <td>
                                    <img
                                        width={`70px`}
                                        height={`70px`}
                                        src={`${imgURL}${order.mausachinhanh}`}
                                        alt={order.tensanpham || "Hình ảnh sản phẩm"}
                                    />
                                </td>
                                <td>{order.ngaylap}</td>
                                <td>{order.trangthaidonhang}</td>
                                <td className="d-flex align-items-center justify-content-between gap-1">
                                    <button
                                        className="btn btn-sm btn-info"
                                        style={{ padding: "0.5rem", width: '70px' }}
                                    // onClick={() => handleViewDetails(product)}
                                    >
                                        Xem
                                    </button>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        style={{ padding: "0.5rem", width: '70px' }}
                                    //onClick={() => handleEdit(product)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        style={{ padding: "0.5rem", width: '70px' }}
                                    //onClick={() => openModalDelete(product)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>

                        ))
                    ) : (
                        <tr>
                            <td colSpan="12">
                                <h6>Không tìm thấy</h6>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end admin-pagination">
                    {/* Nút Previous */}
                    <li
                        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Trước
                        </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                        <li
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li
                        className={`page-item ${currentPage === totalPages || currentOrders.length === 0 ? "disabled" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages || currentOrders.length === 0}
                        >
                            Sau
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Orders;
