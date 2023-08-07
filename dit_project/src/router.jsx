import {createBrowserRouter} from "react-router-dom";
import {Welcome} from "./views/Welcome.jsx";
import {StudentLogin} from "./views/StudentLogin.jsx";
import {FacultyLogin} from "./views/FacultyLogin.jsx";
import { NotFound } from "./views/NotFound.jsx";
import { StudentReg } from "./views/StudentRegistration.jsx";
import NoticeBoard from "./components/NoticeBoard.jsx";
import Notifications from "./components/Notifications.jsx";
import StudentHomePage from "./components/StudentHomePage.jsx";
import DashBoard from "./views/DashBoard.jsx";
import OtpPage from "./views/OtpVerification.jsx";
import { UpdatePwd } from "./views/UpdatePwd.jsx";


const router = createBrowserRouter([
    {
        path: "/NoticeBoard",
        element: <NoticeBoard />
    },
    {
        path : "/",
        element : <StudentHomePage />,
        children:[
            {
                path: "/welcome",
                element: <Welcome />
            },

            {
                path:"/dashBoard",
                element: <DashBoard />
            },
            {
                path:"/updatePwd",
                element:<UpdatePwd/>
            }
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
        path: '*',
        element: <NotFound />
    },
    {
        path: '/studentRegistration',
        element :<StudentReg/>
    },
    {
        path:'/OtpVerification',
        element:<OtpPage/>

    }
]);
export default router;
