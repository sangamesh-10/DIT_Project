import React,{useRef} from "react";
import axiosClient from "../axios-client";

export const DeleteNotice=()=>{
    const notice_id=useRef();
    const description=useRef();
    const date=useRef();

    const onSubmit=async(e)=>{
        e.preventDefault();
        const payload={
            notice_id:notice_id.current.value,
            description:description.current.value,
            date:date.current.value
        }
        try{
        const response=await axiosClient.delete("/deleteNotice",{data:payload});
        if(response.data=='true')
        {
            window.alert("Deleted Successfully");
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
            <h2>Delete Notice</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="noticeID">Notice ID :</label>
                <input type="text" ref={notice_id}/><br /><br />
                <label htmlFor="description">Description :</label>
                <input type="text" ref={description}/><br /><br />
                <label htmlFor="date">Uploaded Date :</label>
                <input type="date" ref={date}/><br /><br />
                <input type="submit" value="delete"/>
            </form>
        </div>
    )
}
