import React,{useRef} from "react";
import axiosClient from '../axios-client';

export const StudentReg=()=>{
    const rno=useRef();
    const name=useRef();
    const email=useRef();
    const phno=useRef();
    const aadharno=useRef();
    const mname=useRef();
    const fname=useRef();
    const parentphno=useRef();
    const dob= useRef();
    const permanentaddr=useRef();
    const presentaddr=useRef();
    const bgroup=useRef();
    const caste=useRef();
    const religion=useRef();

    const onSubmit= async (e)=>{
        e.preventDefault();
        const payload={
            rollNumber :rno.current.value,
            name :name.current.value,
            email :email.current.value,
            phoneNo :phno.current.value,
            aadharNo :aadharno.current.value,
            motherName :mname.current.value,
            fatherName :fname.current.value,
            parentPhNo :parentphno.current.value,
            dob :dob.current.value,
            permanentAddr :permanentaddr.current.value,
            presentAddr :presentaddr.current.value,
            bloodGroup :bgroup.current.value,
            caste :caste.current.value,
            religion :religion.current.value
        }
        console.log(payload);
        try{
        const {data}=await axiosClient.post('/studentRegistration',payload)
        console.log(data)
        .then(window.alert("Registered successfully"))
        .then(window.location.reload())
        }
        catch(err){
            const response =err.response;
            if(response && response.status===422)
            {
                console.log(response.data.errors);
            }
        }
    }

    return(
        <div className="form-container">
            <h2 className="form-title">STUDENT REGISTRATION</h2>
            <form className="form" onSubmit={onSubmit} >

            <div className="form-group">
            <label htmlFor="rno" id="rno">Roll Number : </label>
            <input type="text" name="rno" required ref={rno}/>
            </div>
            <div className="form-group">
            <label htmlFor="name" id="name">Name : </label>
            <input type="text" name="name" required ref={name}/>
            </div>
            <div className="form-group">
            <label htmlFor="email" id="email">Email : </label>
            <input type="email" name="email" required ref={email}/>
            </div>
            <div className="form-group">
            <label htmlFor="phno" id="phno">Phone Number : </label>
            <input type="text" name="phno" required ref={phno}/>
            </div>
            <div className="form-group">
            <label htmlFor="Aadharno" id="aadharno">Aadhar Number : </label>
            <input type="text" name="aadharno" required ref={aadharno}/>
            </div>
            <div className="form-group">
            <label htmlFor="MotherName" id="mothername">Mother's Name : </label>
            <input type="text" name="mname" required ref={mname}/>
            </div>
            <div className="form-group">
            <label htmlFor="FatherName" id="fathername">Father's Name : </label>
            <input type="text" name="fname" required ref={fname}/>
            </div>
            <div className="form-group">
            <label htmlFor="parentnum" id="parentphno">Parent Number: </label>
            <input type="text" name="parentphno" required ref={parentphno}/>
            </div>
            <div className="form-group">
            <label htmlFor="dob" id="dob">Date Of Birth : </label>
            <input type="date" name="dob" required ref={dob}/>
            </div>
            <div className="form-group">
            <label htmlFor="permanentaddr" id="permanentaddr">Permanent Address : </label>
            <textarea rows="5" cols="20" name="permanentaddr" required ref={permanentaddr}></textarea>
            </div>
            <div className="form-group">
            <label htmlFor="presentaddr" id="presentaddr">Present Address : </label>
            <textarea rows="5" cols="20" name="presentaddr" required ref={presentaddr}></textarea>
            </div>
            <div className="form-group">
            <label htmlFor="bloodgroup" id="bgroup">Blood Group : </label>
            <input type="text" name="bgroup" required ref={bgroup}/>
            </div>
            <div className="form-group">
            <label htmlFor="caste" id="caste">Caste : </label>
            <input type="text" name="caste" required ref={caste}/>
            </div>
            <div className="form-group">
            <label htmlFor="Religion" id="religion">Religion : </label>
            <input type="text" name="religion" required ref={religion}/>
            </div>

            <input type="submit"className="submit-button" name="submit"/>
            <input type="reset" className="reset-button" name="reset"/>
            </form>
            </div>
    )
}
