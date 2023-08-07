import React, { useState,useRef } from 'react';
import { Navigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export const AdminLogin = () => {
    const admin_id = useRef();
    const password = useRef();
    const { setUser, setToken } = useStateContext();
    const [loggedIn, setLoggedIn] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            admin_id: admin_id.current.value,
            password: password.current.value
        };

        try {
            const { data } = await axiosClient.post('/adminLogin', payload);
            setUser(data.user);
            setToken(data.access_token);
            console.log(data);
            setLoggedIn(true);
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        }
    };

    return (
        <div>
            {loggedIn ? (
                <Navigate to="/admin" replace={true} />
            ) : (
                <div>
                    <h2>LOGIN FORM</h2>
                    <div>
                        <form onSubmit={onSubmit}>
                            <input ref={admin_id} type="text" placeholder='Id' /><br /><br />
                            <input ref={password} type="password" placeholder='password' /><br /><br />
                            <button>LOGIN</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
