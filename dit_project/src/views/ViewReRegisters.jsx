import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
export const ViewReRegisters=()=>{
    const [students,setStudents]=useState([]);
    useEffect(() => {
        fetchStudents();
    }, []);
    const fetchStudents=async ()=>{
        try{
            const response=await axiosClient.get("/getReRegister");
            setStudents(response.data);
        }
        catch (error) {
            console.error('Error fetching students:', error);
        }
    }
    return(
        <div>
            <h2>ReRegisters Data</h2> <br />
            <table>
                    <thead>
                        <tr>
                            <th>Roll Number</th>
                            <th>Subject Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{student.roll_num}</td>
                                <td>{student.subject_code}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    )
}
