import { useRoutes, Navigate } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Product from "./page/Product";
import Manufacturer from "./page/Manufacturer";
import Users from "./page/User";
import Orders from "./page/Order";
import ColorProduct from "./page/ColorProduct";
import AllProduct from "./page/AllProduct";

const AdminRoute = () => {
    const element = useRoutes([
        {
            path: "", // Route chính cho Dashboard
            element: < Dashboard />,
            children: [
                {
                    path: "", // Khi vào "/admin/" sẽ render Users
                    element: <Product />,
                },
                {
                    path: "products", // Khi vào "/admin/users" sẽ render Users
                    element: <Product />,
                },
                {
                    path: "colorproducts", // Khi vào "/admin/users" sẽ render Users
                    element: <ColorProduct />,
                },
                {
                    path: "manufacturers", // Khi vào "/admin/users" sẽ render Users
                    element: <Manufacturer />,
                },
                {
                    path: "all-products", // Khi vào "/admin/users" sẽ render Users
                    element: <AllProduct />,
                },
                {
                    path: "users", // Khi vào "/admin/users" sẽ render Users
                    element: <Users />,
                },
                // {
                //     path: "users", // Khi vào "/admin/users" sẽ render Users
                //     element: <Users />,
                // },
                {
                    path: "*",
                    element: <Navigate to="/admin/users" replace />, // Chuyển hướng nếu không tìm thấy route
                },
            ],
        },
    ]);
    return element;
};

export default AdminRoute;
