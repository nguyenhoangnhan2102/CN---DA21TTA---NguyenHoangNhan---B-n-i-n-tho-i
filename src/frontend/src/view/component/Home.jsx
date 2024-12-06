
import { Link } from "react-router-dom";
import Carouseles from "../../share/component/Carousel";
import "../style/Home.scss";

const Home = () => {
    const products = [
        {
            id: 1,
            image: "phone.jpg",
            name: "realme C67 8GB/128GB",
            currentPrice: "3.790.000",
            originalPrice: "5.290.000",
            discount: 28,
            stockLeft: 9,
            stockTotal: 20,
        },
        {
            id: 2,
            image: "phone.jpg",
            name: "ELIO Nắng Xuân 32 mm Nữ EL025-01",
            currentPrice: "290.000",
            originalPrice: "890.000",
            discount: 67,
            stockLeft: 10,
            stockTotal: 10,
        },
        {
            id: 3,
            image: "phone.jpg",
            name: "HP 15s fq5229TU i3 1215U",
            currentPrice: "9.990.000",
            originalPrice: "13.690.000",
            discount: 27,
            stockLeft: 10,
            stockTotal: 10,
        },
        {
            id: 4,
            image: "phone.jpg",
            name: "Xiaomi 14 5G 12GB/512GB",
            currentPrice: "17.090.000",
            originalPrice: "24.490.000",
            discount: 30,
            stockLeft: 3,
            stockTotal: 10,
        },
    ];

    return (
        <>
            <Carouseles />
            <div className="container product-container my-4">
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <h3 className="product-name mt-2">{product.name}</h3>
                            <p className="product-price mt-2">
                                <span className="current-price">{product.currentPrice}đ</span>
                            </p>
                            <Link to={"/"} className="text-decoration-none buy-now-button w-100">Mua ngay</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Home;
