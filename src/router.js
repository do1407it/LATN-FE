import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import { Navigate } from "react-router-dom";
import Login from "scenes/login";
import Customers from "scenes/customers";


const publicRoutes = [
    { path: "/login", element: <Login /> },
    { path: "/register", element: "register" },
    { path: "*", element: "404: NotFound" },
];

const privateRoutes = [
    { path: "/", element: <Navigate to="/dashboard" replace />, exact: true },
    { path: "/login", element: <Navigate to="/dashboard" replace />, exact: true },
    { path: "/register", element: <Navigate to="/dashboard" replace />, exact: true },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/products", element: <Products /> },
    { path: "/customers", element: <Customers /> },
    { path: "/transactions", element: "transactions" },
];

const isAuthenticated = () => {
    const isLoggedIn = true;
    return isLoggedIn;
};


export { publicRoutes, privateRoutes, isAuthenticated };
