import React ,{useRef}from "react";
import axiosClient from "../axios-client";
export const DeleteReRegister=()=>{
    const rollNo=useRef();
    const subjectCode=useRef();
    const onSubmit= async(e)=>
    {
        e.preventDefault()
        const payload={
            rollNumber :rollNo.current.value,
            subjectCode:subjectCode.current.value
        }
        try{
            const response = await axiosClient.delete("/deleteReRegister", {
                data: payload, // Send payload as the data object
              });
            if(response.data ==='true')
            {
                window.alert("Deleted Successfully");
                window.location.reload();
            }
        }
        catch(err)
        {
            console.error("Error Occurred",err)
        }

    }
    return(
        <div>
            <h2>Delete ReRegister</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="rollNumber">RollNumber :</label><br />
                <input type="text" name="rollnumber" ref={rollNo}/><br /><br />
                <label htmlFor="subjectCode">Subject Code :</label><br />
                <input type="text" name="subjectCode" ref={subjectCode}/><br /><br />
                <input type="submit" name="Register"/>
            </form>
        </div>
    )
}
