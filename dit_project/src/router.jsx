import {createBrowserRouter} from "react-router-dom";
import {Welcome} from "./views/Welcome.jsx";
import {StudentLogin} from "./views/StudentLogin.jsx";
import {FacultyLogin} from "./views/FacultyLogin.jsx";
import { NotFound } from "./views/NotFound.jsx";
import NoticeBoard from "./components/NoticeBoard.jsx";
import Notifications from "./components/Notifications.jsx";
import StudentHomePage from "./components/StudentHomePage.jsx";
import DashBoard from "./views/DashBoard.jsx";
import UpdateContact from "./views/UpdateContact.jsx";


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
                path:"/updateContact",
                element:<UpdateContact/>
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
    }
]);
export default router;
