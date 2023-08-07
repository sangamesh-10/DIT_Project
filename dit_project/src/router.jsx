import {createBrowserRouter} from "react-router-dom";
import {Welcome} from "./views/Welcome.jsx";
import {StudentLogin} from "./views/StudentLogin.jsx";
import {FacultyLogin} from "./views/FacultyLogin.jsx";
import { NotFound } from "./views/NotFound.jsx";
import NoticeBoard from "./components/NoticeBoard.jsx";
import Notifications from "./components/Notifications.jsx";
import StudentHomePage from "./components/StudentHomePage.jsx";
import FacultyHomePage from "./components/FacultyHomePage.jsx";
import DashBoard from "./views/DashBoard.jsx";
import { AdminLogin } from "./views/AdminLogin.jsx";
import AdminHomePage from "./components/AdminHomePage.jsx";
import App from "./App.jsx";
import UpdateNoticeBoard from "./views/UpdateNoticeBoard.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },

    {
        path : "/student",
        element : <StudentHomePage />,
        children:[
            {
                path: "/student/welcome",
                element: <Welcome />
            },

            {
                path:"/student/dashBoard",
                element: <DashBoard />
            }
        ]
    },
    {
        path : "/faculty",
        element : <FacultyHomePage />,
        children:[
            {
                path: "/faculty/welcome",
                element: <Welcome />
            },

            {
                path:"/faculty/dashBoard",
                element: <DashBoard />
            }
        ]
    },
    {
        path : "/admin",
        element : <AdminHomePage />,
        children:[
            {
                path: "/admin/welcome",
                element: <Welcome />
            },

            {
                path:"/admin/dashBoard",
                element: <DashBoard />
            },
            {
                path: '/admin/addNotice',
                element: <UpdateNoticeBoard />
            },
            {
                path: "/admin/NoticeBoard",
                element: <NoticeBoard />
            },
        ]
    },
    {
        path: "/StudentLogin",
        element: <StudentLogin />
    },

    {
        path: "/FacultyLogin",
        element: <FacultyLogin />
    },
    {
        path: "/AdminLogin",
        element: <AdminLogin />
    },
    {
        path: '*',
        element: <NotFound />
    },

]);
export default router;
