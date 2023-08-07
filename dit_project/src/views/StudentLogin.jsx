import React, { useState,useRef } from 'react';
import { Navigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export const StudentLogin = () => {
    const student_id = useRef();
    const password = useRef();
    const { setUser, setToken } = useStateContext();
    const [loggedIn, setLoggedIn] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            student_id: student_id.current.value,
            password: password.current.value
        };

        try {
            const { data } = await axiosClient.post('/studentLogin', payload);
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
                <Navigate to="/" replace={true} />
            ) : (
                <div>
                    <h2>LOGIN FORM</h2>
                    <div>
                        <form onSubmit={onSubmit}>
                            <input ref={student_id} type="text" placeholder='RollNumber' /><br /><br />
                            <input ref={password} type="password" placeholder='password' /><br /><br />
                            <button>LOGIN</button>
                        </form>
                        <a  href="/OtpVerification">Forgot Password?</a>

                    </div>
                </div>
            )}
        </div>
    );
};
