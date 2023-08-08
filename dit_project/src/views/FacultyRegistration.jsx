import React,{useRef} from "react";
import axiosClient from '../axios-client';

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
        <div>
            <form onSubmit={onSubmit}>
            <label for="fid" id="fid">Faculty ID : </label>
            <input type="text" name="fid" required ref={fid}/><br/><br/>

            <label for="name" id="name">Name : </label>
            <input type="text" name="name" required ref={name}/><br/><br/>

            <label for="email" id="email">Email : </label>
            <input type="email" name="email" required ref={email}/><br/><br/>

            <label for="altemail" id="altemail">Alternate Email : </label>
            <input type="email" name="altemail" required ref={altemail}/><br/><br/>

            <label for="phno" id="phno">Phone Number : </label>
            <input type="text" name="phno" required ref={phNo}/><br/><br/>

            <label for="Aadharno" id="aadharno">Aadhar Number : </label>
            <input type="text" name="aadharno" required ref={aadharNo}/><br/><br/>

            <label for="desig" id="desig">Designation : </label>
            <input type="text" name="desig" required ref={designation}/><br/><br/>

            <label for="exp" id="exp">Experience : </label>
            <input type="text" name="exp" required ref={experience}/><br/><br/>

            <input type="submit" name="submit"/>
            <input type="reset" name="reset"/>
        </form>
        </div>
    )
}
