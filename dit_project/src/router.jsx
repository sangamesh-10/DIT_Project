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
import { UpdatePwdFaculty } from "./views/UpdatePwdFaculty.jsx";
import UpdateContactStd from "./views/UpdateContactStd.jsx";
import UpdateContactFaculty from "./views/UpdateContactFaculty.jsx";
import { FacultyReg } from "./views/FacultyRegistration.jsx";
import { AssignFaculty } from "./views/AssignFaculty.jsx";
import { AddSubjects } from "./views/AddSubjects.jsx";
import { AddMarks } from "./views/AddMarks.jsx";
import { AddAttendance } from "./views/AddAttendance.jsx";
import InternalMarks from "./views/InternalMarks.jsx";
import Attendance from "./views/Attendance.jsx";
import RaiseComplaint from "./components/RaiseComplaint";
import SoftCopiesUpload from "./views/SoftCopiesUpload.jsx";
import ProfileStd from "./views/ProfileStd.jsx";
import OtpPageFaculty from "./views/OtpVerificationFaculty.jsx";
import AddForm from "./views/AddForm.jsx";
import GetForms from "./views/GetForms.jsx";
import AdminViewForms from "./views/AdminViewForms.jsx";
import UpdateForm from "./views/UpdateForm.jsx";
import DeleteForm from "./views/DeleteForm.jsx";
import { EnrolledStundents } from "./views/EnrolledStudents.jsx";
import SendNotifications from "./views/SendingNotificationsFac.jsx";
import { UpdatePwdAdmin } from "./views/UpdatePwdAdmin.jsx";
import { AddReRegister } from "./views/AddReRegister.jsx";
import { ViewReRegisters } from "./views/ViewReRegisters.jsx";
import { DeleteReRegister } from "./views/DeleteReRegister.jsx";
import { ViewStudents } from "./views/ViewStudents.jsx";
import { ViewFaculty } from "./views/ViewFaculty.jsx";
import { ViewAssignedFaculty } from "./views/ViewAssignedFaculty.jsx";
import { UpdateFacultyAssignment } from "./views/UpdateFacultyAssignment.jsx";
import { DeleteFacultyAssignment } from "./views/DeleteFacultyAssignment.jsx";
import { ViewSubjects } from "./views/ViewSubjects";
import { AddSemester } from "./views/AddSemester.jsx";
import { ViewSemester } from "./views/ViewSemester.jsx";
import { UpdateSemester } from "./views/UpdateSemesters.jsx";
import { DeleteSemester } from "./views/DeleteSemesters.jsx";
import { DeleteStudentLogin } from "./views/DeleteStudentLogin.jsx";
import { DeleteFacultyLogin } from "./views/DeleteFacultyLogin.jsx";
import { AddCalendar } from "./views/AddAcademicCalendar.jsx";
import { UpdateCalendar } from "./views/UpdateAcademicCalendar.jsx";
import { ViewAcademicCalendar } from "./views/ViewAcademicCalendar.jsx";
import { DeleteNotice } from "./views/DeleteNotice.jsx";
import { ViewAcademicCalendarFaculty } from "./views/ViewAcademicCalendarFaculty.jsx";
import { ViewAcademicCalendarStudent } from "./views/ViewAcademicCalendarStd.jsx";
import { EnrolledSubjects } from "./views/EnrolledSubjects.jsx";


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
                path:"/student/Profile",
                element: <ProfileStd />
            },
            {
                path:"/student/updatePwd",
                element:<UpdatePwd/>
            },
            {
                path:"/student/updateContact",
                element:<UpdateContactStd/>
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
            },
            {
                path:"/student/Noticeboard",
                element:<NoticeBoard/>
            },
            {
                path:"/student/raiseComplaint",
                element:<RaiseComplaint />
            },
            {
                path:'/student/Notifications',
                element:<Notifications/>
            },
            {
                path:'/student/getForms',
                element:<GetForms />
            },{
                path:"/student/viewAcadmicCalendar",
                element:<ViewAcademicCalendarStudent/>
            },{
                path:"/student/enrolledSubjects",
                element:<EnrolledSubjects/>
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
                path:"/faculty/updatePwd",
                element:<UpdatePwdFaculty/>
            },
            {
                path:"/faculty/updateContact",
                element:<UpdateContactFaculty/>
            },
            {
                path:"/faculty/addMarks",
                element:<AddMarks/>
            },
            {
                path:'/faculty/RaiseComplaint',
                element:<RaiseComplaint />
            },
            {
                path:"/faculty/addAttendance",
                element:<AddAttendance/>
            },
            {
                path:"/faculty/Noticeboard",
                element:<NoticeBoard/>
            },
            {
                path:"/faculty/enrolledStudents",
                element:<EnrolledStundents/>
            },
            {
                path:"/faculty/sendNotifications",
                element:<SendNotifications/>
            },{
                path:"/faculty/viewAcademicCalendar",
                element:<ViewAcademicCalendarFaculty/>
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
                path:"/admin/deleteNotice",
                element:<DeleteNotice/>
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
                path:"/admin/viewSubjects",
                element:<ViewSubjects/>
            },
            {
                path: '/admin/uploadSoftCopies',
                element:<SoftCopiesUpload />
            },
            {
                path:"/admin/addForm",
                element:<AddForm />
            },
            {
                path:"/admin/viewForms",
                element:<AdminViewForms />
            },
            {
                path:"/admin/updateForm",
                element:<UpdateForm />
            },
            {
                path:"/admin/deleteForm",
                element:<DeleteForm />
            },
            {
                path:'/admin/updatePassword',
                element:<UpdatePwdAdmin/>
            },
            {
                path:"/admin/addReRegister",
                element:<AddReRegister/>
            },
            {
                path:"/admin/viewReRegisters",
                element:<ViewReRegisters/>
            },
            {
                path:"/admin/deleteReRegister",
                element:<DeleteReRegister/>
            },
            {
                path:"/admin/viewStudents",
                element:<ViewStudents/>
            },{
                path:"/admin/viewFaculty",
                element:<ViewFaculty/>
            },
            {
                path:"/admin/assignedFaculty",
                element:<ViewAssignedFaculty/>
            },
            {
                path:"/admin/updateFacultyAssignment",
                element:<UpdateFacultyAssignment/>
            },
            {
                path:"/admin/deleteFacultyAssignment",
                element:<DeleteFacultyAssignment/>
            },{
                path:"/admin/addSemester",
                element:<AddSemester/>
            },
            {
                path:"/admin/viewSemester",
                element:<ViewSemester/>
            },
            {
                path:"/admin/updateSemester",
                element:<UpdateSemester/>
            },
            {
                path:"/admin/deleteSemester",
                element:<DeleteSemester/>
            },
            {
                path:"/admin/DeleteStudentLogin",
                element:<DeleteStudentLogin/>
            },
            {
                path:"/admin/DeleteFacultyLogin",
                element:<DeleteFacultyLogin/>
            },{
                path:"/admin/addAcademicCalendar",
                element:<AddCalendar/>
            },
            {
                path:"/admin/updateAcademicCalendar",
                element:<UpdateCalendar/>
            },
            {
                path:"/admin/viewAcademicCalendar",
                element:<ViewAcademicCalendar/>
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

    },
    {
        path:"/OtpVerificationFaculty",
        element:<OtpPageFaculty/>
    }
]);
export default router;
