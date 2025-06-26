import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/components/ui/Home";
import Signin from "@/components/ui/Signin";
import Signup from "@/components/ui/Signup";
import PrivateRoute from "@/components/ui/PrivateRoute";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/signup", element: <Signup /> },
    { path: "/signin", element: <Signin /> },
    { path: "/home", element: <PrivateRoute><Home /></PrivateRoute> },
]);