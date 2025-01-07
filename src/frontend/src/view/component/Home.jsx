
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
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        fetchListProduct();
        fetchListManufacturer();
    }, []);

    const fetchListProduct = async () => {
        try {
            const response = await getAllProducts();
            if (response.EC === 1) {
                setListProduct(response.DT.activeProducts);
                console.log("setListProduct", response.DT.activeProducts)

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
                console.log("setListManufacturer", response.DT.activeManufacturer)

            } else {
                console.error("Failed to fetch");
            }
        } catch (err) {
            console.error("Error occurred", err);
        }
    };

    const filteredProducts = products.filter(item => {
        const matchesCategory = selectedCategory ? item.tenthuonghieu === selectedCategory : true;
        const matchesSearch = item.tensanpham.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <Carouseles />
            <div className="container product-container my-4">
                <div className="d-flex gap-3 my-4">
                    <div className="col-2 mt-2">
                        <input
                            type="text"
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-control col-2"
                        />
                    </div>
                    <div className="col-1 ilter-category mt-2">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Thể loại</option>
                            {manufacturers && manufacturers.map((manu, index) => (
                                <option key={index} value={manu.tenthuonghieu}>{manu.tenthuonghieu}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="product-list">
                    {filteredProducts.map((product, index) => (
                        <div key={product.masanpham} className="product-card">
                            <Link to={`/product-details/${product.masanpham}`} className="text-decoration-none ">
                                <img
                                    src={`${imgURL}${product.hinhanhchinh}`}
                                    className="product-image"
                                    alt={product.tensanpham || "Hình ảnh sản phẩm"}
                                />
                                <h3 className="product-name mt-2">{product.tensanpham}</h3>
                                <p className="product-price mt-2">
                                    <span className="current-price">{product.giasanpham}đ</span>
                                </p>
                                <button className="text-decoration-none  buy-now-button w-100">
                                    Mua ngay
                                </button>
                            </Link>
                        </div>

                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
