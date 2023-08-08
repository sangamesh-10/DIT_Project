import React, { useEffect } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import './studentHomePage.css';
import NoticeBoard from './NoticeBoard';

const AdminHomePage = () => {
    const {user,token,setUser,setToken} = useStateContext();
    const navigate = useNavigate();
    if(!token){
        return <Navigate to = '/AdminLogin' />
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
          .then(({data}) => {
             setUser(data)
          })
      }, [])

    //   if (!token) {
    //     return <Navigate to="/StudentLogin" />;
    // }

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/admin/dashboard">Dashboard</Link>
                <Link to="/admin/welcome">Welcome</Link>
                <Link to="/admin/addNotice">Update NoticeBoard</Link>
                <Link to="/admin/studentRegistration">Add Student</Link>
                <Link to="/admin/facultyRegistration">Add Faculty</Link>
                <Link to="/admin/assignFaculty">Assign Faculty</Link>
                <Link to="/admin/addSubjects">Add Subjects  </Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>

                    <div>
                        <a onClick={logout} className="btn-logout" href="#">Logout</a>
                    </div>
                </header>
                <main>
                    <NoticeBoard />
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminHomePage
