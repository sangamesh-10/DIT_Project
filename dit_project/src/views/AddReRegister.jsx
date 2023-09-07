import React, { useRef, useState } from "react";
import axiosClient from "../axios-client";
//import './form.css';

export const AddReRegister = () => {
    const rollNo = useRef();
    const subCode = useRef();
    const [errors, setErrors] = useState({});
    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors({}); // Clear previous errors
        const payload = {
            rollNumber: rollNo.current.value,
            subjectCode: subCode.current.value
        };
        //        console.log(payload);
        try {
            const { response } = await axiosClient.post("/addReRegister", payload);
            if (response.data=='true') {
                window.alert("Registered Successfully");
                window.location.reload();
            }
        }
        catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data);
                setErrors(response.data);
            }
        }
    }

        return (
            <div className="form-container">
            <h2 className="form-title">ADD RE-REGISTER</h2>
                <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="rollNo">RollNumber :</label>
                    <input type="text" name="rollNo"  required ref={rollNo} />
                    {errors.rollNumber && <span className="error">{errors.rollNumber.map((error, index) => (<p key={index}>{error}</p>))}</span>}

                </div>
                <div className="form-group">
                    <label htmlFor="subCode">Subject Code :</label>
                    <input type="text" name="subCode" required ref={subCode} />
                    {errors.subjectCode && <span className="error">{errors.subjectCode[0]}</span>}
                </div>
                    <input type="submit" name="Register" />
                </form>
            </div>
        )
    }
