import React,{useRef} from "react";
import axiosClient from "../axios-client";
export const DeleteFacultyAssignment=()=>{
    const subject_code=useRef();

    const onSubmit= async(e)=>{
        e.preventDefault()
        const payload={
            subjectCode:subject_code.current.value,
        }
        console.log(payload);
        try{
            const {data}=await axiosClient.delete("/deleteAssignment",{data:payload,});
            if(data==='true')
            {
                window.alert("Deleted Successfully !")
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
            <h2> Delete Assigned Subject</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Subject_code" ref={subject_code}/><br /><br />
                <input type="submit" value="Delete"/>
            </form>
        </div>
    )
}
