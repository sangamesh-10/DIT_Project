import React,{useRef,useState} from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
export const UpdatePwd=()=>{
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const oldPassword=useRef()
    const newPassword=useRef()
    const confirmPassword=useRef()
    const navigate=useNavigate()

    const updatePwd= async(e)=>{
        e.preventDefault()
        const payload={
            old_password :oldPassword.current.value,
            new_password :newPassword.current.value,
            confirm_password :confirmPassword.current.value
        }
        console.log(payload);
        try {
            const { data } = await axiosClient.put('/updatePwdStd', payload);
            console.log(data);
            if (data === 'true') {
                setSubmissionMessage("Password Updated");
                setSubmitted(true);

            }
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
                setSubmissionMessage("Error Occured");
            }
        }
    }
    return(
        <div className="form-container">
         <h2 className="form-title">Update Password</h2>
            <form className="form" onSubmit={updatePwd}>
            <div className="form-group">
                <label htmlFor="oldPassword" id="old_pwd"> Old Password :{' '}</label>
                <input type="password" ref={oldPassword} className="input-field" />
            </div>
            <div className="form-group">
                <label htmlFor="newPassword" id="new_pwd"> New Password :{' '}</label>
                <input type="password" ref={newPassword} className="input-field"/>
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword" id="confirm_pwd">Confirm Password :{' '}</label>
                <input type="password" ref={confirmPassword} className="input-field" />
            </div>
                <button className='button-container'>Update</button>
            </form>
            {submitted  && (
            <p>{submissionMessage}</p>
            )}
        </div>
    )
}
