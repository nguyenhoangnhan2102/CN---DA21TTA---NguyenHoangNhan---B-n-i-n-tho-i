import { Link } from "react-router-dom";
import Carouseles from "../../share/component/Carousel";
import "../style/Home.scss";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../service/productService";
import { getAllManufacturer } from "../../service/manufacturerService";
const imgURL = process.env.REACT_APP_IMG_URL;

const Home = () => {
    const [products, setListProduct] = useState([]);
    const [manufacturers, setListManufacturer] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedManufacturer, setSelectedManufacturer] = useState("");
    const [visibleCount, setVisibleCount] = useState(10); // Số lượng sản phẩm hiển thị ban đầu

    useEffect(() => {
        fetchListProduct();
        fetchListManufacturer();
    }, []);

    const fetchListProduct = async () => {
        try {
            const response = await getAllProducts();
            if (response.EC === 1) {
                setListProduct(response.DT.activeProducts);
            } else {
                console.error("Failed to fetch");
            }
        } catch (err) {
            console.error("Error occurred", err);
        }
    };

    const fetchListManufacturer = async () => {
        try {
            const response = await getAllManufacturer();
            if (response.EC === 1) {
                setListManufacturer(response.DT.activeManufacturer);
            } else {
                console.error("Failed to fetch");
            }
        } catch (err) {
            console.error("Error occurred", err);
        }
    };

    const filteredProducts = products.filter((item) => {
        const matchesCategory = selectedManufacturer
            ? item.tenthuonghieu === selectedManufacturer
            : true;
        const matchesSearch = item.tensanpham
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 10); // Tăng số lượng sản phẩm hiển thị thêm 10
    };

    return (
        <>
            <Carouseles />
            <div className="container product-container my-4">
                <div className="d-flex gap-3 my-4">
                    <div className="col-2 mt-4 ms-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control col-2"
                            style={{ marginLeft: '18px' }}
                        />
                    </div>
                    <div className="col-2 mt-4 ms-3">
                        <select
                            value={selectedManufacturer}
                            onChange={(e) => setSelectedManufacturer(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Thương hiệu</option>
                            {manufacturers &&
                                manufacturers.map((manu, index) => (
                                    <option key={index} value={manu.tenthuonghieu}>
                                        {manu.tenthuonghieu}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="product-list">
                    {filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts.slice(0, visibleCount).map((product, index) => (
                            <Link
                                to={`/product-details/${product.masanpham}`}
                                className="text-decoration-none "
                                key={product.masanpham}
                            >
                                <div className="product-card">
                                    <img
                                        src={`${imgURL}${product.hinhanhchinh}`}
                                        className="product-image"
                                        alt={product.tensanpham || "Hình ảnh sản phẩm"}
                                    />
                                    <h3 className="product-name mt-2">{product.tensanpham}</h3>
                                    <p className="product-price mt-2">
                                        <span className="current-price">
                                            {product.giasanpham.toLocaleString("vi-VN")}<sup> <u>đ</u></sup>
                                        </span>
                                    </p>
                                    <button className="text-decoration-none buy-now-button w-100">
                                        Mua ngay
                                    </button>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-12">"Không có sản phẩm"</div>
                    )}
                </div>
                {visibleCount < filteredProducts.length && (
                    <div className="text-center">
                        <div
                            className="pb-4"
                            style={{ fontSize: '18px' }}
                            onClick={handleShowMore}
                        >
                            Xem thêm
                            <i class="fa-solid fa-caret-down ms-2"></i>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
