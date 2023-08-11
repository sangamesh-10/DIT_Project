import {createBrowserRouter} from "react-router-dom";
import {Welcome} from "./views/Welcome.jsx";
import {StudentLogin} from "./views/StudentLogin.jsx";
import {FacultyLogin} from "./views/FacultyLogin.jsx";
import { NotFound } from "./views/NotFound.jsx";
import { StudentReg } from "./views/StudentRegistration.jsx";
import NoticeBoard from "./components/NoticeBoard.jsx";
import Notifications from "./components/Notifications.jsx";
import StudentHomePage from "./components/StudentHomePage.jsx";
import FacultyHomePage from "./components/FacultyHomePage.jsx";
import DashBoard from "./views/DashBoard.jsx";
import { AdminLogin } from "./views/AdminLogin.jsx";
import AdminHomePage from "./components/AdminHomePage.jsx";
import App from "./App.jsx";
import UpdateNoticeBoard from "./views/UpdateNoticeBoard.jsx";
import OtpPage from "./views/OtpVerification.jsx";
import { UpdatePwd } from "./views/UpdatePwd.jsx";
import { FacultyReg } from "./views/FacultyRegistration.jsx";
import { AssignFaculty } from "./views/AssignFaculty.jsx";
import { AddSubjects } from "./views/AddSubjects.jsx";
import { AddMarks } from "./views/AddMarks.jsx";
import InternalMarks from "./views/InternalMarks.jsx";
import Attendance from "./views/Attendance.jsx";
import RaiseComplaint from "./components/RaiseComplaint";
import SoftCopiesUpload from "./views/SoftCopiesUpload.jsx";


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
            },
            {
                path:"/student/updatePwd",
                element:<UpdatePwd/>
            },
            {
                path:'/student/notifications',
                element:<Notifications />
            },
            {
                path:'/student/InternalMarks',
                element:<InternalMarks />
            },
            {
                path:'/student/Attendance',
                element:<Attendance />
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
            },
            {
                path:"/faculty/addMarks",
                element:<AddMarks/>
            },
            {
                path:'/faculty/RaiseComplaint',
                element:<RaiseComplaint />
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
            {
                path: '/admin/studentRegistration',
                element :<StudentReg/>
            },
            {
                path:"/admin/facultyRegistration",
                element:<FacultyReg/>
            },
            {
                path:"/admin/assignFaculty",
                element:<AssignFaculty/>
            },
            {
                path:"/admin/addSubjects",
                element:<AddSubjects/>
            },
            {
                path: '/admin/uploadSoftCopies',
                element:<SoftCopiesUpload />
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
        path: "/AdminLogin",
        element: <AdminLogin />
    },
    {
        path: '*',
        element: <NotFound />
    },

    {
        path:'/OtpVerification',
        element:<OtpPage/>

    }
]);
export default router;
