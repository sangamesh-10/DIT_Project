import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
export const EnrolledSubjects=()=>{
    const [subjects,setSubjects]=useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData=async()=>{
        try{
            const resposne=await axiosClient.get("/enrolledSubjects");
            setSubjects(resposne.data);
            console.log(resposne.data);
        }
        catch(err)
        {
            console.error("Error occurred",err);
        }
    }
    return(
        <div>
            <h2>Enrolled Subjects</h2><br />
            <table>
                    <thead>
                        <tr>
                            <th>Subject Code</th>
                            <th>Subject Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((subject, index) => (
                            <tr key={index}>
                                <td>{subject.subject_code}</td>
                                <td>{subject.subject_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )

}
