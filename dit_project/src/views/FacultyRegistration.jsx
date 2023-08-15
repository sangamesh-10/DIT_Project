import React,{useRef} from "react";
import axiosClient from '../axios-client';
import './form.css'
export const FacultyReg=()=>{
    const fid=useRef()
    const name=useRef()
    const email=useRef()
    const altemail=useRef()
    const phNo=useRef()
    const aadharNo=useRef()
    const designation=useRef()
    const experience=useRef()

    const onSubmit= async(e)=>
    {
        e.preventDefault()
        const payload={
            faculty_id:fid.current.value,
            name:name.current.value,
            email:email.current.value,
            altEmail:altemail.current.value,
            phoneNo:phNo.current.value,
            aadharNo:aadharNo.current.value,
            designation:designation.current.value,
            experience:experience.current.value
        }
        try{
            const {data}=await axiosClient.post("/facultyRegistration",payload)
            if(data)
            {
                window.alert("Registered Successfully")
                window.location.reload()
            }
        }
        catch(err)
        {
            const response = err.response;
            if (response && response.status === 422) {
            console.log(response.data.errors);
            }
        }
    }
    return(
        <div className="form-container">
            <h2 className="form-title">FACULTY REGISTRATION</h2>
            <form className="form" onSubmit={onSubmit}>

            <div className="form-group">
            <label htmlFor="fid" id="fid">Faculty ID : </label>
            <input type="text" name="fid" required ref={fid} />
            </div>

            <div className="form-group">
            <label htmlFor="name" id="name">Name : </label>
            <input type="text" name="name" required ref={name} />
            </div>

            <div className="form-group">
            <label htmlFor="email" id="email">Email : </label>
            <input type="email" name="email" required ref={email} />
            </div>

            <div className="form-group">
            <label htmlFor="altemail" id="altemail">Alternate Email : </label>
            <input type="email" name="altemail" required ref={altemail} />
            </div>

            <div className="form-group">
            <label htmlFor="phno" id="phno">Phone Number : </label>
            <input type="text" name="phno" required ref={phNo} />
            </div>

            <div className="form-group">
            <label htmlFor="Aadharno" id="aadharno">Aadhar Number : </label>
            <input type="text" name="aadharno" required ref={aadharNo} />
            </div>

            <div className="form-group">
            <label htmlFor="desig" id="desig">Designation : </label>
            <input type="text" name="desig" required ref={designation} />
            </div>

            <div className="form-group">
            <label htmlFor="exp" id="exp">Experience : </label>
            <input type="text" name="exp" required ref={experience} />
            </div>

            <input type="submit" className="submit-button" name="submit"/>
            <input type="reset" className="reset-button" name="reset"/>
        </form>
        </div>
    )
}
