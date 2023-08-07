import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

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

        <div>
        <h2>OTP Page</h2>
        {!otpSent ? (
            <div>
                <form onSubmit={sendOtp}>
                    <input type="text" ref={rollNum} placeholder="Enter RollNumber" />
                    <br />
                    <br />
                    <input type="submit" name="sendOtp" value="Send OTP" />
                </form>
            </div>
        ) : (
            <div>
                {isOtpVerified ? (
                    <div>
                        <p>OTP Verified Successfully!</p>
                        <form onSubmit={setPwd}>
                            <label htmlFor="newPassword" id="new_pwd">
                                New Password :{' '}
                            </label>
                            <input type="password" ref={newPassword} />
                            <br />
                            <br />
                            <label htmlFor="confirmPassword" id="confirm_pwd">
                                Confirm Password :{' '}
                            </label>
                            <input type="password" ref={confirmPassword} />
                            <br />
                            <br />
                            <input type="submit" value="Update" />
                        </form>
                    </div>
                ) : (
                    <div>
                        <p>Enter OTP sent to your email:</p>
                        <form onSubmit={verifyOtp}>
                            <input type="text" ref={otp} />
                            <br />
                            <br />
                            <input type="submit" name="verifyOtp" value="Verify OTP" />
                        </form>
                    </div>
                )}
            </div>
        )}
    </div>

    );
}

export default OtpPage;
