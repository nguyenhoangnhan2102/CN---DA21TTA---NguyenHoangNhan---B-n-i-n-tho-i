import { useRoutes, Navigate } from "react-router-dom";
import Home from "./component/Home";
import ProductDetails from "./component/Details";
const RouterView = () => {
    const element = useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/product-details/:masanpham",
            element: <ProductDetails />,
        },
        {
            path: "*",
            element: <Navigate to="/" replace />,
        },
    ]);

    return <div> {element} </div>;
};

export default RouterView;