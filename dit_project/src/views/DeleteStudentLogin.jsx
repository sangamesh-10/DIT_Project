import React,{useRef} from "react";
import axiosClient from "../axios-client";

export const DeleteStudentLogin=()=> {
    const rollNumber = useRef();
    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            rollNumber: rollNumber.current.value,
        }
        try {
            const response = await axiosClient.delete("/deleteStdLogin",{data: payload});
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
            <h2>Add Student Login</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="rollNo">Roll Number :</label>
                <input type="text" ref={rollNumber}/><br /><br />
                <input type="submit" name="Delete Login"/>
            </form>
        </div>
    )
}

