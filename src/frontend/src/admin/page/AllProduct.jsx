import React, { useEffect, useState } from "react";
import { getAllProducts, updateStatus } from "../../service/productService";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../css/product.scss';
import {
    Typography,
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { toast } from 'react-toastify';

const imgURL = process.env.REACT_APP_IMG_URL;

const AllProduct = () => {
    const [activeproducts, setActiveProducts] = useState([]);
    const [inactiveproducts, setInactiveProducts] = useState([]);
    const [currentActiveProductPage, setActiveProductCurrentPage] = useState(1);
    const [searchActiveProduct, setSearchActiveProduct] = useState("");
    const activeProductsPerPage = 10;
    const [currentInactiveProductPage, setInactiveProductCurrentPage] = useState(1);
    const [searchInactiveProduct, setSearchInactiveProduct] = useState("");
    const inactiveProductsPerPage = 10;
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [newStatus, setNewStatus] = useState(null);

    useEffect(() => {
        getAllProductData();
    }, []);

    const getAllProductData = async () => {
        try {
            const response = await getAllProducts();
            if (response.EC === 1) {
                const sortedProducts = response.DT.activeProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setActiveProducts(sortedProducts);
            } else {
                console.error("Lỗi tìm kiếm sản phẩm");
            }
        } catch (err) {
            console.error("Đã xảy ra lỗi", err);
        }
        try {
            const response = await getAllProducts();
            if (response.EC === 1) {
                const sortedProducts = response.DT.inactiveProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setInactiveProducts(sortedProducts);
            } else {
                console.error("Lỗi tìm kiếm sản phẩm");
            }
        } catch (err) {
            console.error("Đã xảy ra lỗi", err);
        }
    };

    const handleActivateProduct = async (masanpham) => {
        try {
            const response = await updateStatus(masanpham, 1); // Assuming 1 is for active status
            if (response.EC === 1) {
                toast.success("Sản phẩm đã được kích hoạt.");
                getAllProductData();  // Reload product data
            } else {
                toast.error("Lỗi kích hoạt sản phẩm.");
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra khi kích hoạt sản phẩm.");
        }
    };

    const handleUpdateStatus = (inactiveproducts, status) => {
        setSelectedOrder(inactiveproducts);
        setNewStatus(status);
        setOpenModal(true);
    };

    const handleUpdateStatusActive = (activeproduct, status) => {
        setSelectedOrder(activeproduct);
        setNewStatus(status);
        setOpenModal(true);
    };

    const confirmUpdateStatus = async () => {
        if (selectedOrder && newStatus !== null) {
            try {
                const response = await updateStatus(selectedOrder.masanpham, newStatus);
                if (response.EC === 1) {
                    toast.success(response.EM); // Hiển thị thông báo thành công
                    getAllProductData(); // Lấy lại danh sách đơn hàng sau khi cập nhật
                    setOpenModal(false); // Đóng modal
                } else {
                    toast.error(response.EM); // Hiển thị thông báo lỗi
                }
            } catch (err) {
                toast.error("Lỗi cập nhật trạng thái đơn hàng"); // Hiển thị thông báo lỗi khi gọi API
                console.error("Error occurred", err);
            }
        }
    };

    const handleSearchActiveProduct = (e) => {
        setSearchActiveProduct(e.target.value);
        setActiveProductCurrentPage(1);
    };

    const indexOfLastProduct = currentActiveProductPage * activeProductsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - activeProductsPerPage;

    const currentProducts = activeproducts
        .filter(
            (activeproduct) =>
                activeproduct.tensanpham.toLowerCase().includes(searchActiveProduct.toLowerCase())
        )
        .slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(activeproducts.length / activeProductsPerPage);

    const handleSearchInactiveProduct = (e) => {
        setSearchInactiveProduct(e.target.value);
        setInactiveProductCurrentPage(1);
    };

    const indexOfLastInactiveProduct = currentInactiveProductPage * inactiveProductsPerPage;
    const indexOfFirstInactiveProduct = indexOfLastInactiveProduct - inactiveProductsPerPage;

    const currentInactiveProducts = inactiveproducts
        .filter(
            (inactiveproduct) =>
                inactiveproduct.tensanpham.toLowerCase().includes(searchInactiveProduct.toLowerCase())
        )
        .slice(indexOfFirstInactiveProduct, indexOfLastInactiveProduct);

    const totalPagesInactiveProduct = Math.ceil(inactiveproducts.length / inactiveProductsPerPage);

    return (
        <>
            <div>
                <div className="group-header">
                    <h2>Danh sách sản phẩm đang hoạt động</h2>
                    <div className="filterGroup" style={{ position: 'relative' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm"
                            value={searchActiveProduct}
                            onChange={handleSearchActiveProduct}
                            style={{ paddingRight: '30px' }} // Chừa khoảng trống cho icon
                        />
                        <i
                            className="fa-solid fa-magnifying-glass"
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none',
                                color: '#000'
                            }}
                        ></i>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr className="table-title">
                            <th scope="col">STT</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Thương hiệu</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Hệ điều hành</th>
                            <th scope="col">RAM</th>
                            <th scope="col">Dung lượng</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Chức năng</th>
                            {/* <th scope="col">Hành động</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.length > 0 ? (
                            currentProducts.map((activeproduct, index) => (
                                <tr key={activeproduct.masanpham}>
                                    <td>{(currentActiveProductPage - 1) * activeProductsPerPage + index + 1}</td>
                                    <td>{activeproduct.tensanpham || "Không có tên"}</td>
                                    <td>{activeproduct.tenthuonghieu || "Không có thương hiệu"}</td>
                                    <td>{activeproduct.giasanpham || "Không có giá sản phẩm"}</td>
                                    <td>{activeproduct.soluongsanpham || "Không có số lượng"}</td>
                                    <td>{activeproduct.hedieuhanh || "Không có hệ điều hành"}</td>
                                    <td>{activeproduct.ram || "Không có ram"}</td>
                                    <td>{activeproduct.dungluong || "Không có dung lượng"}</td>
                                    <td>
                                        <img
                                            width={`70px`}
                                            height={`70px`}
                                            src={`${imgURL}${activeproduct.hinhanhchinh}`}
                                            alt={activeproduct.tensanpham || "Hình ảnh sản phẩm"}
                                        />
                                    </td>
                                    <td className="d-flex justify-content-center" style={{ border: 'none' }}>
                                        <button
                                            className="btn btn-sm btn-success w-75"
                                            onClick={() => handleUpdateStatusActive(activeproduct, 1)}
                                        >
                                            Ẩn
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" style={{ textAlign: 'center' }}>
                                    <h6>Không tìm thấy</h6>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end admin-pagination">
                        <li
                            className={`page-item ${currentActiveProductPage === 1 ? "disabled" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => currentActiveProductPage > 1 && setActiveProductCurrentPage(currentActiveProductPage - 1)}
                                disabled={currentActiveProductPage === 1}
                            >
                                Trước
                            </button>
                        </li>
                        {[...Array(totalPagesInactiveProduct)].map((_, index) => (
                            <li
                                key={index}
                                className={`page-item ${currentActiveProductPage === index + 1 ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setActiveProductCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li
                            className={`page-item ${currentActiveProductPage === totalPages || currentProducts.length === 0 ? "disabled" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => currentActiveProductPage < totalPages && setActiveProductCurrentPage(currentActiveProductPage + 1)}
                                disabled={currentActiveProductPage === totalPages || currentProducts.length === 0}
                            >
                                Sau
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="mt-5">
                <div className="group-header">
                    <h2>Danh sách sản phẩm không hoạt động</h2>
                    <div className="filterGroup" style={{ position: 'relative' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm"
                            value={searchInactiveProduct}
                            onChange={handleSearchInactiveProduct}
                            style={{ paddingRight: '30px' }} // Chừa khoảng trống cho icon
                        />
                        <i
                            className="fa-solid fa-magnifying-glass"
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                pointerEvents: 'none',
                                color: '#000'
                            }}
                        ></i>
                    </div>
                </div>
                <table className="table">
                    <thead className="thead-dark">
                        <tr className="table-title">
                            <th scope="col">STT</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Thương hiệu</th>
                            <th scope="col">Giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col">Hệ điều hành</th>
                            <th scope="col">RAM</th>
                            <th scope="col">Dung lượng</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Chức năng</th>
                            {/* <th scope="col">Hành động</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {currentInactiveProducts.length > 0 ? (
                            currentInactiveProducts.map((inactiveproduct, index) => (
                                <tr key={inactiveproduct.masanpham}>
                                    <td>{(currentInactiveProductPage - 1) * inactiveProductsPerPage + index + 1}</td>
                                    <td>{inactiveproduct.tensanpham || "Không có tên"}</td>
                                    <td>{inactiveproduct.tenthuonghieu || "Không có thương hiệu"}</td>
                                    <td>{inactiveproduct.giasanpham || "Không có giá sản phẩm"}</td>
                                    <td>{inactiveproduct.soluongsanpham || "Không có số lượng"}</td>
                                    <td>{inactiveproduct.hedieuhanh || "Không có hệ điều hành"}</td>
                                    <td>{inactiveproduct.ram || "Không có ram"}</td>
                                    <td>{inactiveproduct.dungluong || "Không có dung lượng"}</td>
                                    <td>
                                        <img
                                            width={`70px`}
                                            height={`70px`}
                                            src={`${imgURL}${inactiveproduct.hinhanhchinh}`}
                                            alt={inactiveproduct.tensanpham || "Hình ảnh sản phẩm"}
                                        />
                                    </td>
                                    <td className="d-flex justify-content-center" style={{ border: 'none' }}>
                                        <button
                                            className="btn btn-sm btn-success w-75 "
                                            onClick={() => handleUpdateStatus(inactiveproduct, 0)}
                                        >
                                            Hiện
                                        </button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" style={{ textAlign: 'center' }}>
                                    <h6>Không tìm thấy</h6>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-end admin-pagination">
                        <li
                            className={`page-item ${currentInactiveProductPage === 1 ? "disabled" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => currentInactiveProductPage > 1 && setInactiveProductCurrentPage(currentInactiveProductPage - 1)}
                                disabled={currentInactiveProductPage === 1}
                            >
                                Trước
                            </button>
                        </li>
                        {[...Array(totalPagesInactiveProduct)].map((_, index) => (
                            <li
                                key={index}
                                className={`page-item ${currentInactiveProductPage === index + 1 ? "active" : ""}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => setInactiveProductCurrentPage(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li
                            className={`page-item ${currentInactiveProductPage === totalPagesInactiveProduct || currentInactiveProducts.length === 0 ? "disabled" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => currentInactiveProductPage < totalPagesInactiveProduct && setInactiveProductCurrentPage(currentInactiveProductPage + 1)}
                                disabled={currentInactiveProductPage === totalPagesInactiveProduct || currentInactiveProducts.length === 0}
                            >
                                Sau
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Xác nhận cập nhật trạng thái</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Bạn chắc chắn muốn <strong>{newStatus === 0 ? 'Hiện' : 'Ẩn'}</strong> sản phẩm này không?
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
                        onClick={confirmUpdateStatus}
                        className="btn btn-primary"
                    >
                        Xác nhận
                    </button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AllProduct;
