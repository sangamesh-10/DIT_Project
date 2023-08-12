import React, { useState,useRef } from 'react';
import { Navigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export const FacultyLogin = () => {
    const faculty_id = useRef();
    const password = useRef();
    const { setUser, setToken } = useStateContext();
    const [loggedIn, setLoggedIn] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            faculty_id: faculty_id.current.value,
            password: password.current.value
        };

        try {
            const { data } = await axiosClient.post('/facultyLogin', payload);
            setUser(data.user);
            setToken(data.access_token);
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
                <Navigate to="/faculty" replace={true} />
            ) : (
                <div>
                    <h2>LOGIN FORM</h2>
                    <div>
                        <form onSubmit={onSubmit}>
                            <input ref={faculty_id} type="text" placeholder='Id' /><br /><br />
                            <input ref={password} type="password" placeholder='password' /><br /><br />
                            <button>LOGIN</button>
                        </form>
                        <a  href="/OtpVerificationFaculty">Forgot Password?</a>
                    </div>
                </div>
            )}
        </div>
    );
};
