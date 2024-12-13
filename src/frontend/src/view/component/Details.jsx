import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axiosInstance from "../../authentication/axiosInstance";
import "../style/Details.scss";

const apiUrl = process.env.REACT_APP_API_URL;
const apiProductUrl = apiUrl + '/products';
const imgURL = process.env.REACT_APP_IMG_URL;

const ProductDetails = () => {
    const [productdetails, setProductDetails] = useState([]);
    const { masanpham } = useParams();
    const [showDetails, setShowDetails] = useState(false);
    const [showDetailsCamera, setShowDetailsCamera] = useState(false);

    useEffect(() => {
        fecthProductDetails();
    }, [masanpham]);

    const fecthProductDetails = async () => {
        if (masanpham) {
            try {
                const response = await axiosInstance.get(`${apiProductUrl}/${masanpham}`);
                setProductDetails(response.data.DT);
                console.log("setProductDetails", response.data.DT)
            } catch (err) {
                console.error("Error occurred", err);
            }
        }
    };

    if (!productdetails || Object.keys(productdetails).length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row d-flex">
                <div className="col-md-8">
                    <div className="carousel slide" id="productCarousel" data-bs-ride="carousel">
                        <div className="d-flex mb-4 align-items-center">
                            <h3 className="me-2">
                                {productdetails.tensanpham}
                            </h3>
                            <label className="badge me-2 bg-warning text-dark d-flex align-items-center">
                                Chỉ có tại Shopphone
                            </label>
                        </div>
                        <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                {productdetails.danhsachhinhanh.split(",").map((_, index) => (
                                    <button
                                        type="button"
                                        data-bs-target="#productCarousel"
                                        data-bs-slide-to={index}
                                        className={index === 0 ? "active" : ""}
                                        aria-current={index === 0 ? "true" : "false"}
                                        aria-label={`Slide ${index + 1}`}
                                        key={index}
                                    ></button>
                                ))}
                            </div>
                            <div className="carousel-inner product-details-image">
                                {productdetails.danhsachhinhanh.split(",").map((image, index) => (
                                    <div
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                        key={index}
                                    >
                                        <img
                                            src={`${imgURL}${image}`}
                                            alt={`${productdetails.tensanpham} - ${index + 1}`}
                                            className="d-block w-100"
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#productCarousel"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#productCarousel"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-4" style={{ backgroundColor: '#FFFFFF', borderRadius: '12px' }}>
                    <button
                        className="mt-3 btn-show d-flex justify-content-between align-items-center"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        Cấu hình & Bộ nhớ
                        <i class="fa-solid fa-caret-down"></i>
                    </button>
                    {showDetails && (
                        <div className="feature-list">
                            <div className="feature-list_details">
                                <strong>Hệ điều hành:</strong>
                                <p> {productdetails.hedieuhanh}</p>
                            </div>
                            <hr />
                            <div className="feature-list_details">
                                <strong>Chip xử lý (CPU):</strong>
                                <p> {productdetails.cpu}</p>
                            </div>
                            <hr />
                            <div className="feature-list_details">
                                <strong>Chip đồ họa (GPU):</strong>
                                <p>{productdetails.gpu}</p>
                            </div>
                            <hr />
                            <div className="feature-list_details">
                                <strong>RAM:</strong>
                                <p>{productdetails.ram}</p>
                            </div>
                            <hr />
                            <div className="feature-list_details">
                                <strong>Dung lượng:</strong>
                                <p>{productdetails.dungluong}</p>
                            </div>
                            <hr />
                            <div className="feature-list_details">
                                <strong>Pin:</strong>
                                <p>{productdetails.pin}</p>
                            </div>
                            <hr />
                        </div>
                    )}
                    <button
                        className="my-3 btn-show d-flex justify-content-between align-items-center"
                        onClick={() => setShowDetailsCamera(!showDetailsCamera)}
                    >
                        Camera & Màn hình
                        <i class="fa-solid fa-caret-down"></i>
                    </button>
                    {showDetailsCamera && (
                        <div className="feature-list">
                            <div className="feature-list_details">
                                <strong>Độ phân giải camera sau:</strong>
                                <p>{productdetails.camerasau}</p>
                            </div>
                            <hr />
                            <div className="feature-list_details">
                                <strong>Độ phân giải camera trước:</strong>
                                <p>{productdetails.cameratruoc}</p>
                            </div>
                            <hr />
                            <div className="feature-list_details">
                                <strong>Công nghệ màn hình:</strong>
                                <p> {productdetails.gpu}</p>
                            </div >
                            <hr />
                            <div className="feature-list_details">
                                <strong>Độ phân giải màn hình:</strong>
                                <p>{productdetails.ram}</p>
                            </div>
                            <hr />
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 bg-light p-3 border rounded">
                <h4>Shopphone cam kết</h4>
                <ul>
                    <li>1 đổi 1 trong 30 ngày đối với sản phẩm lỗi</li>
                    <li>Bảo hành chính hãng điện thoại 1 năm</li>
                    <li>Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cáp Type C...</li>
                </ul>
            </div>
        </div>
    );
};

export default ProductDetails;
