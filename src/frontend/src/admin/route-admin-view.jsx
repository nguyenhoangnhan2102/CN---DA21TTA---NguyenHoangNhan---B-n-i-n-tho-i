import { useRoutes, Navigate } from "react-router-dom";
import Product from "./page/Product";
import Dashboard from "./page/Dashboard";

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
