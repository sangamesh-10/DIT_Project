import React, { useState } from "react";
import axiosClient from "../axios-client";
export const ViewAcademicCalendar = () => {
    const departments = ["MCA", "Mtech"]; // List of departments
    const semesters = [1, 2, 3, 4];
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [calendar, setCalendar] = useState([]);

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };
    const onSubmit=async(e)=>{
        e.preventDefault()
        try{
            const response=await axiosClient.get(`/getCalendar?branch=${selectedDepartment}&semester=${selectedSemester}`)
            //console.log(response.data);
            setCalendar(response.data);
        }
        catch(err)
        {
            console.error("Error occurred",err);
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
            <label>Select Branch:</label>
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
            {calendar.length=== 0 ? (
                <p>No data found</p>):(
        <div>
          <h2>Academic Calendar</h2>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {calendar.map((calendar, index) => (
                <tr key={index}>
                  <td>{calendar.description}</td>
                  <td>{calendar.from_date}</td>
                  <td>{calendarItem.to_date ? calendarItem.to_date : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        </div>
    )
}
