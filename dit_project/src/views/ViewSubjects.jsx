import React, { useState,useEffect } from "react";
import axiosClient from "../axios-client";

export const ViewSubjects=()=>{
    const [subjects,setsubjects]=useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData=async()=>{
        try{
            const response=await axiosClient.get(`/getSubjects`)
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
            <h2>Subjects</h2><br/>
          <table>
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>L</th>
                <th>P</th>
                <th>C</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.subject_code}</td>
                  <td>{subject.subject_name}</td>
                  <td>{subject.L}</td>
                  <td>{subject.P}</td>
                  <td>{subject.C}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}
