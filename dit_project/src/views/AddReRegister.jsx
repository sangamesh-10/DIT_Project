import React, { useRef, useState } from "react";
import axiosClient from "../axios-client";
//import './form.css';

export const AddReRegister = () => {
    const rollNo = useRef();
    const subjectCode = useRef();
    const [errors, setErrors] = useState({});
    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors({}); // Clear previous errors
        const payload = {
            roll_num: rollNo.current.value,
            subject_code: subjectCode.current.value
        };
        //        console.log(payload);
        try {
            const { data } = await axiosClient.post("/addReRegister", payload);
            if (data) {
                window.alert("Registered Successfully");
                window.location.reload();
            }
        }
        catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                //console.log(response.data.errors);
                setErrors(response.data.errors);
            }
        }
    }

        return (
            <div className="form-container">
            <h2 className="form-title">ADD RE-REGISTER</h2>
                <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="rollNumber">RollNumber :</label>
                    <input type="text" name="rollnumber"  required ref={rollNo} />
                    {errors.roll_num && <span className="error">{errors.roll_num.map((error, index) => (<p key={index}>{error}</p>))}</span>}

                </div>
                <div className="form-group">
                    <label htmlFor="subjectCode">Subject Code :</label>
                    <input type="text" name="subjectCode" required ref={subjectCode} />
                    {errors.subject_code && <span className="error">{errors.subject_code[0]}</span>}
                </div>
                    <input type="submit" name="Register" />
                </form>
            </div>
        )
    }
