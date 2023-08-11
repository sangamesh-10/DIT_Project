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

    <div>
        <h2>UpdateContact</h2>
        <form onSubmit={onSubmit}>
            <input ref={mobile} type="number" placeholder='Enter New Mobile Number'/><br/>
            <button>Update</button><br />
        </form>
        {submitted  && (
            <p>{submissionMessage}</p>
            )}
    </div>
  )
}
