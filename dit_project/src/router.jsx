import {createBrowserRouter} from "react-router-dom";
import {Welcome} from "./views/Welcome.jsx";
import {StudentLogin} from "./views/StudentLogin.jsx";
import {FacultyLogin} from "./views/FacultyLogin.jsx";
import { NotFound } from "./views/NotFound.jsx";
import NoticeBoard from "./components/NoticeBoard.jsx";
import Notifications from "./components/Notifications.jsx";


const router = createBrowserRouter([
    {
        path: "/NoticeBoard",
        element: <NoticeBoard />
    },
    {
        path : "/",
        element : <Notifications />,
        children:[
            {
                path: "/welcome",
                element: <Welcome />
            },
            {
                path: "/StudentLogin",
                element: <StudentLogin />
            },
        ]
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
