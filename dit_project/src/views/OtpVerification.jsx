import React, { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import './form.css'

export const OtpPage=()=> {
    const rollNum=useRef()
    const otp=useRef()
    const newPassword=useRef()
    const confirmPassword=useRef()
    const [otpSent, setOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [rno,setRno]=useState('');
    const navigate=useNavigate();


    const sendOtp = async (e)=> {
        e.preventDefault();
        setRno(rollNum.current.value)
        const payload={
            student_id: rollNum.current.value
        }
        await axiosClient.post('/sendOTPStd',payload)
        .then(
            setOtpSent(true)
        )
        .catch(err =>{
            const response =err.response;
            if(response && response.status===422)
            {
                console.log(response.data.errors);
            }
        })
    };

    const verifyOtp = async (e) => {
        e.preventDefault();
        const payload = {
            otp: otp.current.value,
        };

        try {
            const { data } = await axiosClient.post('/otpVerifyStd', payload);

            if (data === 'true') {
                setIsOtpVerified(true);
            }
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        }
    };


    const setPwd= async (e)=>{
        e.preventDefault();
        const payload={
            student_id:rno,
            new_password:newPassword.current.value,
            confirm_password:confirmPassword.current.value
        }
        console.log(payload);
        try {
            const { data } = await axiosClient.put('/SetPwdStd', payload);

            if (data === 'true') {
                console.log(data);
                console.log("Password Updated");
                navigate("/StudentLogin");
            }
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
            }
        }
    }

    return (
        <div className="form-container">
        <h2 className="form-title">OTP Page</h2>
        {!otpSent ? (
            <div>
                <form className="form" onSubmit={sendOtp}>
                <div className="form-group">
                    <input type="text" ref={rollNum} placeholder="Enter RollNumber" className="input-field"/>
                </div>
                    <input type="submit" name="sendOtp" value="Send OTP" className="submit-button"/>

                </form>
            </div>
        ) : (
            <div>
                {isOtpVerified ? (
                    <div>
                        <p>OTP Verified Successfully!</p>
                        <form form className="form" onSubmit={setPwd}>
                            <label htmlFor="newPassword" id="new_pwd"> New Password :{' '}</label>
                            <input type="password" ref={newPassword} className="input-field"/>
                            <label htmlFor="confirmPassword" id="confirm_pwd">Confirm Password :{' '}</label>
                            <input type="password" ref={confirmPassword} className="input-field"/>
                            <input type="submit" value="Update" className="submit-button"/>
                        </form>
                    </div>
                ) : (
                    <div>
                        <form  form className="form" onSubmit={verifyOtp}>
                             <div className="form-group">
                            <input type="text" ref={otp} placeholder='Enter OTP sent to your email' className="input-field"/>
                            </div>
                            <input type="submit" name="verifyOtp" value="Verify OTP" className="submit-button"/>
                        </form>
                    </div>
                )}
            </div>
        )}
    </div>

    );
}

export default OtpPage;
