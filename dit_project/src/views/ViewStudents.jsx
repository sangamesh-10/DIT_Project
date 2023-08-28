import React, { useState } from "react";
import axiosClient from "../axios-client";
export const ViewStudents = () => {
    const departments = ["MCA", "Mtech-DS", "Mtech-SE", "Mtech-CNIS", "Mtech-CS"]; // List of departments
    const semesters = [1, 2, 3, 4];
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [studentProfiles, setStudentProfiles] = useState([]);

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    const onSubmit=async(e)=>{
        e.preventDefault()
        const payload={
            department:selectedDepartment,
            semester:selectedSemester,
        }
        console.log(payload);
        try{
            const response=await axiosClient.get(`/studentsDetails?department=${selectedDepartment}&semester=${selectedSemester}`)
            //console.log(response.data);
            setStudentProfiles(response.data);
        }
        catch(err)
        {
            console.error("Error occurred",err);
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
            <label>Select Department:</label>
            <select value={selectedDepartment} onChange={handleDepartmentChange}>
                <option value="">Select Department</option>
                {departments.map((department, index) => (
                    <option key={index} value={department}>
                        {department}
                    </option>
                ))}
            </select> <br /><br />
            <label>Select Semester:</label>
            <select value={selectedSemester} onChange={handleSemesterChange}>
                <option value="">Select Semester</option>
                {semesters.map((semester, index) => (
                    <option key={index} value={semester}>
                        {semester}
                    </option>
                ))}
            </select><br /><br />
            <button type="submit">Submit</button>
            </form>
            {studentProfiles.length=== 0 ? (
                <p>No data found</p>):(
        <div>
          <h2>Student Profiles</h2>
          <table>
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Name</th>
                <th>email</th>
                <th>Mobile Number</th>
                <th>Aadhar Number</th>
                <th>Mother Name</th>
                <th>Father Name</th>
                <th>Parent Number</th>
                <th>Date of Birth</th>
                {/* Add more table headings as needed */}
              </tr>
            </thead>
            <tbody>
              {studentProfiles.map((student, index) => (
                <tr key={index}>
                  <td>{student.roll_num}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone_num}</td>
                  <td>{student.aadhar_num}</td>
                  <td>{student.mother_name}</td>
                  <td>{student.father_name}</td>
                  <td>{student.parent_num}</td>
                  <td>{student.dob}</td>
                  {/* Add more table data as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        </div>
    )
}
