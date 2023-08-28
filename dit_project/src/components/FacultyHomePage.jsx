import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import './studentHomePage.css';
import NoticeBoard from './NoticeBoard';

const FacultyHomePage = () => {
    const { user, token, setUser, setToken } = useStateContext();
    const [dashboardOpen, setDashboardOpen] = useState(false);
    const navigate = useNavigate();
    if (!token) {
        return <Navigate to='/FacultyLogin' />
    }

    const logout = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/facultyLogout');
            setUser({});
            setToken(null);
            navigate('/FacultyLogin');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        axiosClient.get('/me')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])
    useEffect(()=>{
        <NoticeBoard/>
    },[]);

    //   if (!token) {
    //     return <Navigate to="/StudentLogin" />;
    // }

    return (
        <div id="defaultLayout">
            <header>
                <div>
                    Header
                </div>

                <div>
                    {user && user.name} &nbsp; &nbsp;
                    <a onClick={logout} className="btn-logout" href="#">Logout</a>
                </div>
            </header>
            <aside>
                <div id="mySidenav" className={`sidenav ${dashboardOpen ? 'open' : ''}`}    >
                    <button className="dropbtn" onClick={setDashboardOpen}>Dashboard</button>
                    <div className="dropdown-content">
                        <div className="dropdown-content-link-style">
                            <Link to="/faculty/welcome">Welcome</Link>
                            <Link to="/faculty/Noticeboard">NoticeBoard</Link>
                            <Link to="/faculty/updatePwd">Update Password</Link>
                            <Link to="/faculty/updateContact">Update Contact</Link>
                            <Link to="/faculty/enrolledStudents">View Enrolled Students</Link>
                            <Link to="/faculty/AddAttendance">Mark Attendance</Link>
                            <Link to="/faculty/AddMarks">Add InternalMarks</Link>
                            <Link to="/faculty/sendNotifications">Send Notifications</Link>
                            <Link to="/faculty/viewAcademicCalendar">Academic Calendar</Link>
                            <Link to="/faculty/RaiseComplaint">Raise Complaints</Link>

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

export default FacultyHomePage
