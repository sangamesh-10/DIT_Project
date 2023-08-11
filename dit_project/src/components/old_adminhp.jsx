import React, { useEffect } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import './studentHomePage.css';
import NoticeBoard from './NoticeBoard';

const AdminHomePage = () => {
    const { user, token, setUser, setToken } = useStateContext();
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
            <div class="sidenav">
            <button class="dropbtn">Dashboard</button>
            <div class="dropdown-content">
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/welcome">Welcome</Link>
                <Link to="">Update password</Link>
                <div class="nested-sidenav">
                    <button class="dropbtn">NoticeBoard Activities</button>
                    <div class="nested-dropdown-content">
                        <Link to="/admin/addNotice">Add Notice</Link>
                        <Link to="">Delete Notice</Link>
                        <Link to="">Update Notice</Link>
                    </div>
                </div>
                <div class="nested-sidenav">
                    <button class="dropbtn">Student Activities</button>
                    <div class="nested-dropdown-content">
                        <Link to="/admin/studentRegistration">Add Students</Link>
                        <Link to="">View Students</Link>
                        <Link to="">Add Re-Registers</Link>
                        <Link to="">View Re-Registers</Link>
                        <Link to="">Remove Re-Registers</Link>
                    </div>
                </div>

                <div class="nested-sidenav">
                    <button class="dropbtn">Faculty Activities</button>
                    <div class="nested-dropdown-content">
                        <Link to="/admin/facultyRegistration">Add New Faculty</Link>
                        <Link to="">View Faculty</Link>
                        <Link to="/admin/assignFaculty">Assign Subject</Link>
                        <Link to="">View Assigned Subject</Link>
                        <Link to="">Update Assigned Subject</Link>
                        <Link to="">Delete Assigned Subject</Link>
                    </div>
                </div>
                <div class="nested-sidenav">
                    <button class="dropbtn">Subjects</button>
                    <div class="nested-dropdown-content">
                        <Link to="/admin/addSubjects">Add Subject</Link>
                        <Link to="">View Subjects</Link>
                    </div>
                </div>
                <div class="nested-sidenav">
                    <button class="dropbtn">Semester Details</button>
                    <div class="nested-dropdown-content">
                        <Link to="">Add Semester</Link>
                        <Link to="">View Semester</Link>
                        <Link to="">Update Semester</Link>
                        <Link to="">Delete Semester</Link>
                    </div>
                </div>
                <div class="nested-sidenav">
                    <button class="dropbtn">Academic Calendar</button>
                    <div class="nested-dropdown-content">
                        <Link to="">Add Calendar</Link>
                        <Link to="">View Calendar</Link>
                        <Link to="">Update Calendar</Link>
                    </div>
                </div>
                <div class="nested-sidenav">
                    <button class="dropbtn">Logins</button>
                    <div class="nested-dropdown-content">
                        <Link to="">Add Student Login</Link>
                        <Link to="">Delete Student Login</Link>
                        <Link to="">Add Faculty Login</Link>
                        <Link to="">Delete Faculty Login</Link>
                    </div>
                </div>
                </div>
            </div>
            </aside>

            <div className="content">
                <main>
                    <NoticeBoard />
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminHomePage
