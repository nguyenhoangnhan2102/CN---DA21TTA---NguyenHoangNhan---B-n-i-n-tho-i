import { useRoutes, Navigate } from "react-router-dom";
import Home from "./component/Home";
import ProductDetails from "./component/Details";
import Profile from "./component/Profile";
import Buy from "./component/Buy";
import Cart from "./component/Cart";
import Login from "./component/Login";
import Register from "./component/Register";

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
            path: "/buy",
            element: <Buy />,
        },
        {
            path: "/profile",
            element: <Profile />,
        },
        {
            path: "/cart",
            element: <Cart />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "*",
            element: <Navigate to="/" replace />,
        },
    ]);

    return <div> {element} </div>;
};

export default RouterView;