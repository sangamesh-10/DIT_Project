import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import './form.css';


export const StudentLogin = () => {
    const [errors, setErrors] = useState({});
    const student_id = useRef();
    const password = useRef();
    const { setUser, setToken } = useStateContext();
    const [loggedIn, setLoggedIn] = useState(false);
    const [invalidPasswordError, setInvalidPasswordError] = useState(""); // State for invalid password error

    const onSubmit = async (e) => {
        e.preventDefault();
        setInvalidPasswordError("");

        const payload = {
            student_id: student_id.current.value,
            password: password.current.value
        };

        try {
            const { data } = await axiosClient.post('/studentLogin', payload);
            setUser(data.user);
            setToken(data.access_token);
            setLoggedIn(true);
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
            else if (response && response.status === 401) {
                setInvalidPasswordError("Password is incorrect"); // Set invalid password error message
            }
        }
    };
    return (
        <div className="form-container">
            {loggedIn ? (
                <Navigate to="/student" replace={true} />
            ) : (
                <div>
                    <h2 className="form-title">LOGIN FORM</h2>
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <input ref={student_id} type="text" placeholder="Roll Number" className="input-field" />
                            {errors.student_id && <span className="error">{errors.student_id[0]}</span>}
                        </div>
                        <div className="form-group">
                            <input ref={password} type="password" placeholder="Password" className="input-field" />
                            {invalidPasswordError && <span className="error">{invalidPasswordError}</span>}
                        </div>
                        <button className="button-container">LOGIN</button>
                    </form>
                    <a href="/OtpVerification" className="forgot-password-link">Forgot Password?</a>
                </div>
            )}
        </div>
    );
};

