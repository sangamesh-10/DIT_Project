import React,{useRef} from "react";
import axiosClient from "../axios-client";
export const UpdateFacultyAssignment=()=>{
    const subject_code=useRef();
    const faculty_id=useRef();

    const onSubmit= async(e)=>{
        e.preventDefault()
        const payload={
            subjectCode:subject_code.current.value,
            facultyID:faculty_id.current.value
        }
        console.log(payload);
        try{
            const {data}=await axiosClient.put("/updateAssignment",payload)
            if(data==='true')
            {
                window.alert("Updated Successfully !")
                window.location.reload()
            }
        }
        catch(err)
        {
            const response =err.response;
            if(response && response.status===422)
            {
                console.log(response.data.errors);
            }
        }
    }

    return(
        <div>
            <h2>Update Assignment</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Subject_code" ref={subject_code}/><br /><br />
                <input type="text" placeholder="faculty_id" ref={faculty_id}/><br /><br />
                <input type="submit" value="Update"/>
            </form>
        </div>
    )
}
