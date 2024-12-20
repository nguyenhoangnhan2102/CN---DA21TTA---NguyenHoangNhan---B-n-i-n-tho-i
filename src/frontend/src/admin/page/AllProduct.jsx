import React, { useEffect, useState } from "react";
import { getAllProducts, deleteProduct, createProduct, updateProduct } from "../../service/productService";
import ModalProduct from "../../modal/modalProduct";
import ProductDetailModal from "../../modal/detailProduct";
import { uploadSingleFile } from "../../service/fileService";
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
                {/* <Dialog open={openDelete} onClose={handleCloseDelete}>
                    <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Bạn có chắc chắn muốn xóa "{selectedProduct?.tensanpham}" không?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <div
                            // onClick={handleCloseDelete}
                            color="primary"
                            className="btn btn-danger"
                        >
                            <i class="fa-solid fa-x"></i> Không
                        </div>
                        <div
                            // onClick={handleDeleteProduct}
                            className="btn btn-success"
                        >
                            <i class="fa-solid fa-check"></i> Có
                        </div>
                    </DialogActions>
                </Dialog> */}
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
                {/* <div className="btn-header-table">
                    <button className="btn btn-sm btn-success mr-2" onClick={handleCreate}>
                        <i class="fa-solid fa-plus"></i> Thêm mới
                    </button>
                </div> */}

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
                                    {/* <td className="d-flex align-items-center justify-content-between gap-1">
                                        <button
                                            className="btn btn-sm btn-info"
                                            style={{ padding: "0.5rem", width: '70px' }}
                                            onClick={() => handleViewDetails(activeproduct)}
                                        >
                                            <i class="fa-regular fa-eye"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            style={{ padding: "0.5rem", width: '70px' }}
                                            onClick={() => handleEdit(activeproduct)}
                                        >
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            style={{ padding: "0.5rem", width: '70px' }}
                                            onClick={() => openModalDelete(activeproduct)}
                                        >
                                            <i class="fa-solid fa-trash"></i>
                                        </button>
                                    </td> */}
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
            {/* <ModalProduct
                activeproduct={selectedProduct}
                open={openModal}
                onSave={handleSave}
                onClose={() => setOpenModal(false)}
            />
            <ProductDetailModal
                activeproduct={selectedProduct}
                open={openDetailModal}
                onClose={() => setOpenDetailModal(false)}
            /> */}





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
        </>
    );
};

export default AllProduct;
