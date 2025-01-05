
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Typography,
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { createColorProduct, getAllColorProduct, updateColorProduct } from "../../service/colorProductService";
import ModalColorProduct from "../../modal/modalColorProduct";
import { uploadSingleFile } from "../../service/fileService";
import "../css/dashboard.scss";
const imgURL = process.env.REACT_APP_IMG_URL;


const ColorProduct = () => {
    const [colorproducts, setColorProducts] = useState([]);
    const [selectedColorProduct, setSelectedColorProduct] = useState(null);
    const [oldImgUrl, setImgUrl] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [isDelete, checkDelete] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [searchTerm, setSearchTerm] = useState(""); // State cho từ khóa tìm kiếm
    const colorProductsPerPage = 5; // Số phim hiển thị mỗi trang

    useEffect(() => {
        getAllColorProductData();
    }, []);

    const getAllColorProductData = async () => {
        try {
            const response = await getAllColorProduct();
            console.log("color", response.DT);
            if (response.EC === 1) {
                setColorProducts(response.DT);
                console.log(response.DT);
            } else {
                console.error("Failed to fetch");
            }
        } catch (err) {
            console.error("Error occurred", err);
        }
    };

    const handleCreate = () => {
        setSelectedColorProduct(null);
        setOpenModal(true);
    };

    const handleEdit = (colorproduct) => {
        console.log("colorproduct", colorproduct)
        setImgUrl(colorproduct.mausachinhanh);
        setSelectedColorProduct(colorproduct);
        setOpenModal(true);
    };

    const handleSave = async (colorproduct) => {
        try {
            let imageUrl = oldImgUrl;
            if (colorproduct.mausachinhanh instanceof File) {
                const uploadResponse = await uploadSingleFile(
                    imageUrl,
                    "image_product",
                    colorproduct.mausachinhanh
                );
                imageUrl = uploadResponse.fileName;
            }

            const colorProductData = {
                ...colorproduct,
                mausachinhanh: imageUrl,
            };

            if (selectedColorProduct) {
                await updateColorProduct(selectedColorProduct.mamau, colorProductData); // Gọi API cập nhật
                toast.success("Cập nhật thành công!!!")

            } else {
                await createColorProduct(colorProductData); // Gọi API tạo mới
                toast.success("Tạo mới thành công!!!")
            }

            setSelectedColorProduct(null);
            setOpenModal(false);
            getAllColorProductData(); // Lấy lại danh sách 
        } catch (error) {
            console.error("Error saving hotel:", error);
        }
    };

    const openModalDelete = (colorproduct) => {
        checkDelete(true);
        setOpenDelete(true);
        setSelectedColorProduct(colorproduct);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    // const handleDeleteManufacturer = async () => {
    //     try {
    //         const response = await deleteManufacturer(selectedColorProduct.mathuonghieu);
    //         if (response.EC === 1) {
    //             toast.success("Xóa thành công!");
    //             // Lấy lại danh sách từ server để đảm bảo dữ liệu chính xác
    //             getAllManufacturerData();
    //         } else {
    //             console.error(response.EM);
    //             alert("Xóa thất bại: " + response.EM);
    //         }
    //         setOpenDelete(false);
    //     } catch (error) {
    //         console.error("Error deleting category:", error);
    //         setOpenDelete(false);
    //     }
    // };


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const indexOfLast = currentPage * colorProductsPerPage;
    const indexOfFirst = indexOfLast - colorProductsPerPage;

    const currentColorProduct = Array.isArray(colorproducts)
        ? colorproducts.filter((colorproduct) =>
            colorproduct.tensanpham?.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(indexOfFirst, indexOfLast)
        : [];

    const totalPages = Math.ceil(colorproducts.length / colorProductsPerPage);

    return (
        <>
            <div>
                <Dialog open={openDelete} onClose={handleCloseDelete}>
                    <DialogTitle>Xác nhận xóa sản phẩm</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Bạn có chắc chắn muốn xóa "{selectedColorProduct?.mamau}" không?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <div
                            onClick={handleCloseDelete}
                            color="primary"
                            className="btn btn-danger"
                        >
                            Không
                        </div>
                        <div
                            //onClick={handleDeleteManufacturer}
                            className="btn btn-success"
                        >
                            Có
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
                        <i className="fa-solid fa-plus"></i> Thêm
                    </button>
                </div>

                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr className="table-title">
                            <th scope="col">STT</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Màu</th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Ảnh chính</th>
                            <th scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentColorProduct && currentColorProduct.length > 0 ? (
                            currentColorProduct.map((colorproduct, index) => (
                                <tr key={colorproduct.mamau}>
                                    <td>{(currentPage - 1) * colorProductsPerPage + index + 1}</td>
                                    <td>{colorproduct.tensanpham || "Không có tên"}</td>
                                    <td>{colorproduct.tenmausanpham || "Không có tên"}</td>
                                    <td>
                                        <img
                                            width={`70px`}
                                            height={`70px`}
                                            src={`${imgURL}${colorproduct.mausachinhanh}`}
                                            alt={colorproduct.tenmausanpham || "Hình ảnh sản phẩm"}
                                        />
                                    </td>
                                    <td>
                                        <img
                                            width={`70px`}
                                            height={`70px`}
                                            src={`${imgURL}${colorproduct.hinhanhchinh}`}
                                            alt={colorproduct.tensanpham || "Hình ảnh sản phẩm"}
                                        />
                                    </td>
                                    <td className="d-flex gap-2" style={{ border: 'none' }}>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            style={{ padding: "0.5rem", width: '100px' }}
                                        // onClick={() => handleEdit(colorproduct)}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i> Sửa
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            style={{ width: '100px' }}
                                        //onClick={() => openModalDelete(colorproduct)}
                                        >
                                            <i className="fa-solid fa-trash"></i> Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">
                                    <h6>Không tìm thấy sản phẩm</h6>
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
                            className={`page-item ${currentPage === totalPages || currentColorProduct.length === 0 ? "disabled" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                                disabled={currentPage === totalPages || currentColorProduct.length === 0}
                            >
                                Sau
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            <ModalColorProduct
                colorproduct={selectedColorProduct}
                open={openModal}
                onSave={handleSave}
                onClose={() => setOpenModal(false)}
            />
        </>
    )
}

export default ColorProduct;