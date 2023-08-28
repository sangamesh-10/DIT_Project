import React, { useEffect,useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import './studentHomePage.css';
import NoticeBoard from './NoticeBoard';

const AdminHomePage = () => {
    const { user, token, setUser, setToken } = useStateContext();
    const [dashboardOpen, setDashboardOpen] = useState(false);
    const navigate = useNavigate();
    if (!token) {
        return <Navigate to='/AdminLogin' />
    }

    const logout = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/adminLogout');
            setUser({});
            setToken(null);
            navigate('/AdminLogin');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        axiosClient.get('/adminMe')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    //   if (!token) {
    //     return <Navigate to="/StudentLogin" />;
    // }
    useEffect(()=>{
        <NoticeBoard/>
    },[]);
    return (
        <div id="defaultLayout">
            <header>
                    <div>
                        Header
                    </div>
                    <div>
                        <a onClick={logout} className="btn-logout" href="#">Logout</a>
                    </div>
            </header>
            <aside>
            <div id="mySidenav" className={`sidenav ${dashboardOpen ? 'open' : ''}`}    >
            <button  className="dropbtn" onClick={setDashboardOpen}>Dashboard</button>
            <div className="dropdown-content">
                <div className="dropdown-content-link-style">
                <Link to="/admin/NoticeBoard">NoticeBoard</Link>
                <Link to="/admin/welcome">Welcome</Link>
                <Link to="/admin/updatePassword">Update password</Link>
                </div>
                <div className="nested-sidenav">
                    <button className="nested-dropbtn">NoticeBoard Activities</button>
                    <div className="nested-dropdown-content">
                        <Link to="/admin/addNotice">Add Notice</Link>
                        <Link to="/admin/deleteNotice">Delete Notice</Link>                    </div>
                </div>
                <div className="nested-sidenav">
                    <button className="nested-dropbtn">Student Activities</button>
                    <div className="nested-dropdown-content">
                        <Link to="/admin/studentRegistration">Add Students</Link>
                        <Link to="/admin/viewStudents">View Students</Link>
                        <Link to="/admin/addReRegister">Add Re-Registers</Link>
                        <Link to="/admin/viewReRegisters">View Re-Registers</Link>
                        <Link to="/admin/deleteReRegister">Remove Re-Registers</Link>
                    </div>
                </div>

                <div className="nested-sidenav">
                    <button className="nested-dropbtn">Faculty Activities</button>
                    <div className="nested-dropdown-content">
                        <Link to="/admin/facultyRegistration">Add New Faculty</Link>
                        <Link to="/admin/viewFaculty">View Faculty</Link>
                        <Link to="/admin/assignFaculty">Assign Subject</Link>
                        <Link to="/admin/assignedFaculty">View Assigned Subject</Link>
                        <Link to="/admin/updateFacultyAssignment">Update Assigned Subject</Link>
                        <Link to="/admin/deleteFacultyAssignment">Delete Assigned Subject</Link>
                    </div>
                </div>
                <div className="nested-sidenav">
                    <button className="nested-dropbtn">Subjects</button>
                    <div className="nested-dropdown-content">
                        <Link to="/admin/addSubjects">Add Subject</Link>
                        <Link to="/admin/viewSubjects">View Subjects</Link>
                    </div>
                </div>
                <div className="nested-sidenav">
                    <button className="nested-dropbtn">Semester Details</button>
                    <div className="nested-dropdown-content">
                        <Link to="/admin/addSemester">Add Semester</Link>
                        <Link to="/admin/viewSemester">View Semester</Link>
                        <Link to="/admin/updateSemester">Update Semester</Link>
                        <Link to="/admin/deleteSemester">Delete Semester</Link>
                    </div>
                </div>
                <div className="nested-sidenav">
                    <button className="nested-dropbtn">Academic Calendar</button>
                    <div className="nested-dropdown-content">
                        <Link to="/admin/addAcademicCalendar">Add Calendar</Link>
                        <Link to="/admin/viewAcademicCalendar">View Calendar</Link>
                        <Link to="/admin/updateAcademicCalendar">Update Calendar</Link>
                    </div>
                </div>
                <div className="nested-sidenav">
                    <button className="nested-dropbtn">Logins</button>
                    <div className="nested-dropdown-content">
                        <Link to="/admin/deleteStudentLogin">Delete Student Login</Link>
                        <Link to="/admin/deleteFacultyLogin">Delete Faculty Login</Link>
                    </div>
                </div>
                </div>
            </div>
            </aside>

            <div id="content" className={`content ${!dashboardOpen ? 'dashboard-open' : ''}`}>
                <main>
                    {/* <NoticeBoard /> */}
                    {dashboardOpen ? null : <NoticeBoard />}

                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminHomePage
