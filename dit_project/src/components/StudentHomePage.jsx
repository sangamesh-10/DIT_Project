import React, { useEffect,useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import axiosClient from '../axios-client';
import './studentHomePage.css';
import Notifications from './Notifications';
import NoticeBoard from './NoticeBoard';

const StudentHomePage = () => {
    const {user,token,setUser,setToken} = useStateContext();
    const [dashboardOpen, setDashboardOpen] = useState(false);
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
    useEffect(()=>{
        <NoticeBoard/>,
        <Notifications/>
    },[]);

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
            <button  className="dropbtn" onClick={setDashboardOpen}>Dashboard</button>
            <div class="dropdown-content">
                <div class="dropdown-content-link-style">
                <Link to="">Profile</Link>
                <Link to="/student/welcome">Welcome</Link>
                <Link to="/student/Noticeboard">NoticeBoard</Link>
                <Link to="/student/Notifications">Notifications</Link>
                <Link to="/student/updatePwd">Update Password</Link>
                <Link to="/student/Attendance">Check Attendance</Link>
                <Link to="/student/InternalMarks">Check InternalMarks</Link>
                <Link to="">Raise Complaints</Link>

             </div>
             </div>
             </div>
            </aside>
            <div id="content" className={`content ${!dashboardOpen ? 'dashboard-open' : ''}`}>
                <main>
                    {/* <NoticeBoard /> */}
                    {dashboardOpen ? null : <> <Notifications/><br/><NoticeBoard /> </>}
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StudentHomePage
