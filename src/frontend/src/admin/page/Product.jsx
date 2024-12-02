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

const Product = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [oldImgUrl, setImgUrl] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openDetailModal, setOpenDetailModal] = useState(false);
    const [isDelete, checkDelete] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const productsPerPage = 10;

    useEffect(() => {
        getAllProductData();
    }, []);

    const getAllProductData = async () => {
        try {
            const response = await getAllProducts();
            if (response.EC === 1) {
                const sortedProducts = response.DT.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setProducts(sortedProducts);
            } else {
                console.error("Lỗi tìm kiếm sản phẩm");
            }
        } catch (err) {
            console.error("Đã xảy ra lỗi", err);
        }
    };

    const handleCreate = () => {
        setSelectedProduct(null);
        setOpenModal(true);
    };

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setOpenDetailModal(true);
    };

    const handleEdit = (product) => {
        console.log("pro", product)
        setImgUrl(product.hinhanhchinh);
        setSelectedProduct(product);
        setOpenModal(true);
    };

    const handleSave = async (product) => {
        try {
            let imageUrl = oldImgUrl;
            if (product.hinhanhchinh instanceof File) {
                const uploadResponse = await uploadSingleFile(
                    imageUrl,
                    "image_product",
                    product.hinhanhchinh
                );
                imageUrl = uploadResponse.fileName;
            }
            const productData = {
                ...product,
                hinhanhchinh: imageUrl, // Cập nhật đường dẫn ảnh mới
            };
            if (selectedProduct) {
                await updateProduct(selectedProduct.masanpham, productData); // Gọi API cập nhật

            } else {
                await createProduct(productData); // Gọi API tạo mới
            }

            setSelectedProduct(null);
            setOpenModal(false);
            getAllProductData(); // Lấy lại danh sách 
        } catch (error) {
            console.error("Error saving hotel:", error);
        }
    };

    const openModalDelete = (product) => {
        checkDelete(true);
        setOpenDelete(true);
        setSelectedProduct(product);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleDeleteProduct = async () => {
        try {
            const response = await deleteProduct(selectedProduct.masanpham);
            if (response.EC === 1) {
                toast.success("Xóa thành công!");
                getAllProductData();
            } else {
                console.log(response.EM);
            }
            setOpenDelete(false);
        } catch (error) {
            console.error("Lỗi xóa sản phẩm:", error);
            alert("Đã xảy ra lỗi khi xóa sản phẩm.");
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const currentProducts = products
        .filter(
            (product) =>
                product.tensanpham.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(products.length / productsPerPage);


    return (
        <>
            <div>
                <Dialog open={openDelete} onClose={handleCloseDelete}>
                    <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Bạn có chắc chắn muốn xóa "{selectedProduct?.tensanpham}" không?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <div
                            onClick={handleCloseDelete}
                            color="primary"
                            className="btn btn-danger"
                        >
                            <i class="fa-solid fa-x"></i> Không
                        </div>
                        <div
                            onClick={handleDeleteProduct}
                            className="btn btn-success"
                        >
                            <i class="fa-solid fa-check"></i> Có
                        </div>
                    </DialogActions>
                </Dialog>
                <div className="group-header">
                    <h2>Danh sách</h2>
                    <div className="filterGroup" style={{ position: 'relative' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={handleSearch}
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
                <div className="btn-header-table">
                    <button className="btn btn-sm btn-success mr-2" onClick={handleCreate}>
                        <i class="fa-solid fa-plus"></i> Thêm mới
                    </button>
                </div>

                <table className="table table-striped">
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
                            <th scope="col">Hành động   </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product, index) => (
                                <tr key={product.masanpham}>
                                    <td>{(currentPage - 1) * productsPerPage + index + 1}</td>
                                    <td>{product.tensanpham || "Không có tên"}</td>
                                    <td>{product.tenthuonghieu || "Không có thể loại"}</td>
                                    <td>{product.giasanpham || "Không có nhà sản xuất"}</td>
                                    <td>{product.soluongsanpham || "Không có số lượng"}</td>
                                    <td>{product.hedieuhanh || "Không có giá"}</td>
                                    <td>{product.ram || "Không có giá"}</td>
                                    <td>{product.dungluong || "Không có mô tả"}</td>
                                    <td>
                                        <img
                                            width={`70px`}
                                            height={`70px`}
                                            src={`${imgURL}${product.hinhanhchinh}`}
                                            alt={product.tensanpham || "Hình ảnh sản phẩm"}
                                        />
                                    </td>
                                    <td className="d-flex align-items-center justify-content-between gap-1">
                                        <button
                                            className="btn btn-sm btn-info"
                                            style={{ padding: "0.5rem", width: '70px' }}
                                            onClick={() => handleViewDetails(product)}
                                        >
                                            <i class="fa-regular fa-eye"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            style={{ padding: "0.5rem", width: '70px' }}
                                            onClick={() => handleEdit(product)}
                                        >
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            style={{ padding: "0.5rem", width: '70px' }}
                                            onClick={() => openModalDelete(product)}
                                        >
                                            <i class="fa-solid fa-trash"></i>
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
                            className={`page-item ${currentPage === totalPages || currentProducts.length === 0 ? "disabled" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages || currentProducts.length === 0}
                            >
                                Sau
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <ModalProduct
                product={selectedProduct}
                open={openModal}
                onSave={handleSave}
                onClose={() => setOpenModal(false)}
            />
            <ProductDetailModal
                product={selectedProduct}
                open={openDetailModal}
                onClose={() => setOpenDetailModal(false)}
            />
        </>
    );
};

export default Product;
