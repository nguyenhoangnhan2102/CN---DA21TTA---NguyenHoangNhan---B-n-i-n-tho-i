
import { Link } from "react-router-dom";
import Carouseles from "../../share/component/Carousel";
import "../style/Home.scss";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../service/productService";
const imgURL = process.env.REACT_APP_IMG_URL;

const Home = () => {
    const [products, setListProduct] = useState([]);

    useEffect(() => {
        fetchListProduct();
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

    return (
        <>
            <Carouseles />
            <div className="container product-container my-4">
                <div className="product-list">
                    {products.map((product, index) => (
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
