import { useRoutes, Navigate } from "react-router-dom";
import Home from "./component/Home";
const RouterView = () => {
    const element = useRoutes([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "*",
            element: <Navigate to="/" replace />,
        },
    ]);

    return <div> {element} </div>;
};

export default RouterView;