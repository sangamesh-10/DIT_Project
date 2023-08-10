import React, { useEffect } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import './studentHomePage.css';
import Notifications from './Notifications';
import NoticeBoard from './NoticeBoard';

const StudentHomePage = () => {
    const {user,token,setUser,setToken} = useStateContext();
    const navigate = useNavigate();
    if(!token){
        return <Navigate to = '/StudentLogin' />
    }

    const logout = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/studentLogout');
            setUser({});
            setToken(null);
            navigate('/StudentLogin');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        axiosClient.get('/studentMe')
          .then(({data}) => {
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
                    {user && user.name} &nbsp; &nbsp;
                        <a onClick={logout} className="btn-logout" href="#">Logout</a>
                    </div>
                </header>
            <aside>
                <Link to="/student/dashboard">Dashboard</Link>
                <Link to="/student/welcome">Welcome</Link>
                <Link to="/student/updatePwd">Update Password</Link>
            </aside>
            <div className="content">
                <main>
                    <Notifications />
                    <NoticeBoard />
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StudentHomePage
