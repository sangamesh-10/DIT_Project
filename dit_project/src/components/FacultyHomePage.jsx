import React, { useEffect } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import './studentHomePage.css';

const FacultyHomePage = () => {
    const {user,token,setUser,setToken} = useStateContext();
    const navigate = useNavigate();
    if(!token){
        return <Navigate to = '/FacultyLogin' />
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
                <Link to="/faculty/dashboard">Dashboard</Link>
                <Link to="/faculty/welcome">Welcome</Link>
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

export default FacultyHomePage
