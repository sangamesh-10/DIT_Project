import React, { useState,useEffect } from "react";
import axiosClient from "../axios-client";

export const ViewAssignedFaculty=()=>{
    const [subjects,setsubjects]=useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData=async()=>{
        try{
            const response=await axiosClient.get(`/getAssignedFaculty`)
            // console.log(response.data);
            setsubjects(response.data);
        }
        catch(err)
        {
            console.error("Error occurred",err);
        }
    }
    return(
        <div>
            <h2>Faculty Assignments</h2>
          <table>
            <thead>
              <tr>
                <th>Faculty ID</th>
                <th>Subject Code</th>
                {/* Add more table headings as needed */}
              </tr>
            </thead>
            <tbody>
              {subjects.map((assignment, index) => (
                <tr key={index}>
                  <td>{assignment.faculty_id}</td>
                  <td>{assignment.subject_code}</td>
                  {/* Add more table data as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}
