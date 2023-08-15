import React, { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

export const OtpPageFaculty=()=> {
    const faculty_id=useRef()
    const otp=useRef()
    const newPassword=useRef()
    const confirmPassword=useRef()
    const [otpSent, setOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [fid,setFid]=useState('');
    const navigate=useNavigate();


    const sendOtp = async (e)=> {
        e.preventDefault();
        setFid(faculty_id.current.value)
        const payload={
            faculty_id: faculty_id.current.value
        }
        await axiosClient.post('/sendOTPFaculty',payload)
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
        //console.log(payload);
        try {
            const { data } = await axiosClient.post('/otpVerifyFaculty', payload);
            console.log(data);

            if (data === 'true') {
                setIsOtpVerified(true);
                console.log(isOtpVerified);
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
            faculty_id:fid,
            new_password:newPassword.current.value,
            confirm_password:confirmPassword.current.value
        }
        console.log(payload);
        try {
            const { data } = await axiosClient.put('/setPwdFaculty', payload);

            if (data === 'true') {
                console.log(data);
                console.log("Password Updated");
                navigate("/facultyLogin");
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
                    <input type="text" ref={faculty_id} placeholder="Enter ID"  className="input-field"/>
                </div>
                    <input type="submit" name="sendOtp" value="Send OTP" className="submit-button" />
                </form>
            </div>
        ) : (
            <div>
                {isOtpVerified ? (
                    <div>
                        <p>OTP Verified Successfully!</p>
                        <form className="form" onSubmit={setPwd}>
                            <label htmlFor="newPassword" id="new_pwd"> New Password :{' '}</label>
                            <input type="password" ref={newPassword} className="input-field" />
                            <label htmlFor="confirmPassword" id="confirm_pwd">Confirm Password :{' '}</label>
                            <input type="password" ref={confirmPassword} className="input-field" />
                            <input type="submit" value="Update" className="submit-button" />
                        </form>
                    </div>
                ) : (
                    <div>
                        <form className="form" onSubmit={verifyOtp}>
                            <div className="form-group">
                            <input type="text" ref={otp} placeholder='Enter OTP sent to your email:' className="input-field"/>
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

export default OtpPageFaculty;
