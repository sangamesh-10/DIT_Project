import React, { useRef,useState } from 'react'
import axiosClient from '../axios-client';

export default function UpdateContactStd() {
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
            const {data}=await axiosClient.put('/updateContactStd',payload)
            console.log(data);
            setSubmitted(true);
            setSubmissionMessage("Updated Successfully");
        }
        catch(err){
            const response=err.reponse;
            if(response && response.status === 422)
            {
                console.log(response.data.errors);
                setSubmissionMessage("Error Occured !")
            }
        }

    }
  return (

    <div className="form-container">
        <h2 className="form-title">Update Contact</h2>
        <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
            <input ref={mobile} type="number" placeholder='Enter New Mobile Number' className="input-field"/>
        </div>
            <button className="button-container">Update</button>
        </form>
        {submitted  && (
            <p>{submissionMessage}</p>
            )}
    </div>
  )
}
