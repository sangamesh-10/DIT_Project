import React,{useRef} from "react";
import axiosClient from "../axios-client";
export const AssignFaculty=()=>{
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
            const {data}=await axiosClient.post("/assignFaculty",payload)
            if(data)
            {
                window.alert("Faculty Assigned")
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
            <h2>Assign Faculty</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Subject_code" ref={subject_code}/><br /><br />
                <input type="text" placeholder="faculty_id" ref={faculty_id}/><br /><br />
                <input type="submit" value="ADD"/>
            </form>
        </div>
    )
}
