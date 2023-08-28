import React,{useRef} from "react";
import axiosClient from "../axios-client";

export const DeleteFacultyLogin=()=> {
    const facultyID = useRef();
    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            facultyID: facultyID.current.value,
        }
        try {
            const response = await axiosClient.delete("/deleteFacLogin",{data: payload});
            if (response.data =='true') {
                window.alert("Login Deleted Succesfully");
                window.location.reload();
            }
        }

        catch (err) {
            console.error("Error Occurrede",err);
        }

    }
    return(
        <div>
            <h2>Delete Faculty Login</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="FacultyID">facultyID :</label>
                <input type="text" ref={facultyID}/><br /><br />
                <input type="submit" name="Delete Login"/>
            </form>
        </div>
    )
}

