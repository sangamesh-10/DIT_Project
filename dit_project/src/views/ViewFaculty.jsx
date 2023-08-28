import React, { useState,useEffect } from "react";
import axiosClient from "../axios-client";

export const ViewFaculty=()=>{
    const [facultyProfiles,setFacultyProfiles]=useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData=async()=>{
        try{
            const response=await axiosClient.get(`/facultyDetails`)
            // console.log(response.data);
            setFacultyProfiles(response.data);
        }
        catch(err)
        {
            console.error("Error occurred",err);
        }
    }
    return(
        <div>
            <h2>Faculty Profiles</h2>
          <table>
            <thead>
              <tr>
                <th>Faculty ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Alt Email</th>
                <th>Mobile Number</th>
                <th>Aadhar Number</th>
                <th>Designation</th>
                <th>Experience</th>
                {/* Add more table headings as needed */}
              </tr>
            </thead>
            <tbody>
              {facultyProfiles.map((faculty, index) => (
                <tr key={index}>
                  <td>{faculty.faculty_id}</td>
                  <td>{faculty.name}</td>
                  <td>{faculty.email}</td>
                  <td>{faculty.alt_email}</td>
                  <td>{faculty.phone_num}</td>
                  <td>{faculty.aadhar_num}</td>
                  <td>{faculty.designation}</td>
                  <td>{faculty.experience}</td>
                  {/* Add more table data as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
}
