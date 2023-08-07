import React, { useEffect } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import './studentHomePage.css';

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
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/welcome">Welcome</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>

                    <div>
                    {user && user.name} &nbsp; &nbsp;
                        <a onClick={logout} className="btn-logout" href="#">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StudentHomePage
