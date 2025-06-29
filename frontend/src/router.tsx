import { createBrowserRouter, Navigate } from "react-router-dom";

import App from "@/App";
import Home from "@/pages/Home";
import AuthPage from "@/pages/AuthPage";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import PrivateRoute from "@/components/PrivateRoute";
import Play from "@/pages/storylines/Play";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";

// Codebreaker Quest
import CodebreakerQuest from "@/pages/storylines/codebreakerQuest/codebreakerQuest";
import CodebreakerLab1 from "@/pages/storylines/codebreakerQuest/lab1";
import CodebreakerLab2 from "@/pages/storylines/codebreakerQuest/lab2";
import CodebreakerLab3 from "@/pages/storylines/codebreakerQuest/lab3";
import CodebreakerLab4 from "@/pages/storylines/codebreakerQuest/lab4";
import CodebreakerLab5 from "@/pages/storylines/codebreakerQuest/lab5";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/auth", element: <AuthPage /> },
    { path: "/signup", element: <Navigate to="/auth" replace /> },
    { path: "/signin", element: <Navigate to="/auth" replace /> },
    // { path: "/signup", element: <Signup /> },
    // { path: "/signin", element: <Signin /> },
    { path: "/home", element: <PrivateRoute><Home /></PrivateRoute> },
    { path: "/home/play", element: <PrivateRoute><Play /></PrivateRoute>},
    { path: "/home/dashboard", element: <PrivateRoute><Dashboard /></PrivateRoute>},
    { path: "/home/settings", element: <PrivateRoute><Settings /></PrivateRoute>},

    // Codebreaker Quest
    { path: "/home/codebreakerQuest", element: <PrivateRoute><CodebreakerQuest /></PrivateRoute>},
    { path: "/home/codebreakerQuest/lab1", element: <PrivateRoute><CodebreakerLab1 /></PrivateRoute>},
    { path: "/home/codebreakerQuest/lab2", element: <PrivateRoute><CodebreakerLab2 /></PrivateRoute>},
    { path: "/home/codebreakerQuest/lab3", element: <PrivateRoute><CodebreakerLab3 /></PrivateRoute>},
    { path: "/home/codebreakerQuest/lab4", element: <PrivateRoute><CodebreakerLab4 /></PrivateRoute>},
    { path: "/home/codebreakerQuest/lab5", element: <PrivateRoute><CodebreakerLab5 /></PrivateRoute>},
]);