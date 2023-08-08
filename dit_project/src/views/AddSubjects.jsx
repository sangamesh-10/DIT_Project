import React,{useRef} from "react";
import axiosClient from "../axios-client";

export const AddSubjects=()=>{
    const subject_code=useRef()
    const subject_name=useRef()
    const L=useRef()
    const P=useRef()
    const C=useRef()

    const onSubmit=async (e)=>{
        e.preventDefault()
        const payload={
            subject_code:subject_code.current.value,
            subject_name:subject_name.current.value,
            L :L.current.value,
            P:P.current.value,
            C:C.current.value
        }
        try{
            const {data}=await axiosClient.post("/addSubjects",payload)
            if(data)
            {
                window.alert("Subject Added")
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
    return (
        <div>
            <h2>Add Subject</h2>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Subject_code" ref={subject_code}/><br /><br />
                <input type="text" placeholder="subject_name" ref={subject_name}/><br /><br />
                <input type="text" placeholder="Lecture" ref={L}/><br /><br />
                <input type="text" placeholder="Practical" ref={P}/><br /><br />
                <input type="text" placeholder="Credit" ref={C}/><br /><br />
                <input type="submit" value="ADD"/>
            </form>
        </div>
    )
}
