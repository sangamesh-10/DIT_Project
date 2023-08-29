import React, { useRef,useState } from 'react'
import axiosClient from '../axios-client';


export default function UpdateContactFaculty() {
    const mobile=useRef();
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const onSubmit=async(e)=>
    {
        e.preventDefault();
        const payload={
            mobile:mobile.current.value
        };
        try{
            const {data}=await axiosClient.put('/updateContactFaculty',payload)
            console.log(data);
            setSubmissionMessage("Updated succesfully");
            setSubmitted(true);
            console.log(submitted);
        }
        catch(err){
            const response=err.response;
            if(response && response.status === 422)
            {
                console.log(response.data.errors);
                setSubmissionMessage("Error occurred");
            }
        }

    }
  return (

    <div className="form-container">
        <h2 className="form-title">Update Contact</h2>
        <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
            <input ref={mobile} type="number" placeholder='Enter New Mobile Number' className="input-field"/><br/>
        </div>
            <button className="button-container">Update</button>
        </form>
        {submitted  && (
            <p>{submissionMessage}</p>
            )}
    </div>
  )
}
