import React, { useRef } from "react"
import axiosClient from "../axios-client"

export const UpdateSemester=()=>
{
    const year=useRef();
    const code=useRef();
    const semester=useRef();

    const onSubmit=async (e)=>
    {
        e.preventDefault();
        const payload={
            year :year.current.value,
            code:code.current.value,
            semester:semester.current.value
        }
        try{
            const {data}=await axiosClient.put("/updateSemester",payload);
            if(data=='true')
            {
                window.alert("Updated Successfully");
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
            <h2>Update Semester</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="year">Year :</label><br />
                <input type="text" name="year" ref={year}/><br /><br />
                <label htmlFor="code">Code :</label><br />
                <input type="text" name="code" ref={code}/><br /><br />
                <label htmlFor="semester">Semester :</label><br />
                <input type="text" name="code" ref={semester}/><br /><br />
                <input type="submit" name="Add"/>
            </form>
        </div>
    )

}

