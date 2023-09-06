import React, { useRef, useState } from "react";
import axiosClient from '../axios-client';
import './form.css';
export const FacultyReg = () => {
    const [errors, setErrors] = useState({});
    const fid = useRef();
    const name = useRef();
    const email = useRef();
    const altemail = useRef();
    const phNo = useRef();
    const aadharNo = useRef();
    const designation = useRef();
    const experience = useRef();

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors({}); // Clear previous errors
        const payload = {
            faculty_id: fid.current.value,
            name: name.current.value,
            email: email.current.value,
            altEmail: altemail.current.value,
            phoneNo: phNo.current.value,
            aadharNo: aadharNo.current.value,
            designation: designation.current.value,
            experience: experience.current.value
        }
        try {
            const { data } = await axiosClient.post("/facultyRegistration", payload)
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
            <h2 className="form-title">FACULTY REGISTRATION</h2>
            <form className="form" onSubmit={onSubmit}>

                <div className="form-group">
                    <label htmlFor="fid" id="fid">Faculty ID : </label>
                    <input type="text" name="fid" required ref={fid} />
                    {errors.faculty_id && <span className="error">{errors.faculty_id[0]}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="name" id="name">Name : </label>
                    <input type="text" name="name" required ref={name} />
                    {errors.name && <span className="error">{errors.name[0]}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email" id="email">Email : </label>
                    <input type="email" name="email" required ref={email} />
                    {errors.email && <span className="error">{errors.email[0]}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="altemail" id="altemail">Alternate Email : </label>
                    <input type="email" name="altemail" required ref={altemail} />
                    {errors.altEmail && <span className="error">{errors.altEmail[0]}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phno" id="phno">Phone Number : </label>
                    <input type="text" name="phno" required ref={phNo} />
                    {errors.phoneNo && <span className="error">{errors.phoneNo.map((error, index) => (<p key={index}>{error}</p>))}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="Aadharno" id="aadharno">Aadhar Number : </label>
                    <input type="text" name="aadharno" required ref={aadharNo} />
                    {errors.aadharNo && <span className="error">{errors.aadharNo.map((error, index) => (<p key={index}>{error}</p>))}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="desig" id="desig">Designation : </label>
                    <input type="text" name="desig" required ref={designation} />
                    {errors.designation && <span className="error">{errors.designation[0]}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="exp" id="exp">Experience : </label>
                    <input type="text" name="exp" required ref={experience} />
                    {errors.experience && <span className="error">{errors.experience[0]}</span>}
                </div>

                <input type="submit" className="submit-button" name="submit" />
                <input type="reset" className="reset-button" name="reset" />
            </form>
        </div>
    )
}
