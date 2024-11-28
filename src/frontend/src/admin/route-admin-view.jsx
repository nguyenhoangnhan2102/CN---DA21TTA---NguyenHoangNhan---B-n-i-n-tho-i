import { useRoutes, Navigate } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import Product from "./page/Product";
import Manufacturer from "./page/Manufacturer";
import Users from "./page/User";
import Orders from "./page/Order";

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
                    path: "manufacturers", // Khi vào "/admin/users" sẽ render Users
                    element: <Manufacturer />,
                },
                {
                    path: "orders", // Khi vào "/admin/users" sẽ render Users
                    element: <Orders />,
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
