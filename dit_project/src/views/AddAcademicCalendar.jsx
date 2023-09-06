import React,{useRef} from "react";
import axiosClient from "../axios-client";
export const AddCalendar=()=>{
    const branch =useRef();
    const semester =useRef();
    const description =useRef();
    const from =useRef();
    const to =useRef();
    const onSubmit=async(e)=>{
        e.preventDefault();
        const payload={
            branch:branch.current.value,
            semester:semester.current.value,
            description:description.current.value,
            from:from.current.value,
            to:to.current.value
        }
        try{
            const response=await axiosClient.post("/addCalendar",payload);
            if(response.data=='true')
            {
                window.alert("Added successfully");
                window.location.reload();
            }
        }
        catch(err)
        {
            console.error("Error occurred",err);
        }
    }
    return(
        <div>
            <h2> Add Calendar</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="branch">Branch : </label>
                <input type='text' ref={branch}/><br /><br />
                <label htmlFor="semester">semester : </label>
                <input type='text' ref={semester}/><br /><br />
                <label htmlFor="description">description : </label>
                <input type='text' ref={description}/><br /><br />
                <label htmlFor="from">from : </label>
                <input type='text' ref={from}/><br /><br />
                <label htmlFor="to">to : </label>
                <input type='text' ref={to}/><br /><br />
                <input type="submit" value="add"/>
            </form>
        </div>
    )
}
