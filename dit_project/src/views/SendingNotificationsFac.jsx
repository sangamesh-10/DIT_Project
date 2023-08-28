import React, { useState,useRef } from "react";
import axiosClient from "../axios-client";

const SendNotifications = () => {
    const departments = ["MCA", "Mtech-DS", "Mtech-SE", "Mtech-CNIS", "Mtech-CS"]; // List of departments
    const semesters = [1, 2, 3, 4]; // List of semesters

    const [selectionType, setSelectionType] = useState(""); // department or roll_numbers
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [enteredRollNumbers, setEnteredRollNumbers] = useState("");
    const description=useRef();

    const handleSelectionTypeChange = (event) => {
        setSelectionType(event.target.value);
    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    const handleRollNumbersChange = (event) => {
        setEnteredRollNumbers(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const payload={
            select_type:selectionType,
            department:selectedDepartment,
            semester:selectedSemester,
            roll_numbers:enteredRollNumbers,
            description:description.current.value
        }
        console.log(payload);
        try{
        const {data}=await axiosClient.post("sendNotificationsFaculty",payload)
        console.log(data);
        if(data=='Success')
        {
            window.alert('Sent Sucessfully');
        }
        }
        catch(err)
        {
            console.error("Error in Sending Notificaation",err);
        }

    };

    return (
        <div>
            <h2>Send Notifications</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Option:</label>
                    <select value={selectionType} onChange={handleSelectionTypeChange}>
                    <option value="">Select an Option</option>
                        <option value="department">Select Department and Semester</option>
                        <option value="roll_numbers">Enter Roll Numbers</option>
                    </select><br /><br />
                    <label htmlFor="description">Enter Message : </label>
                    <input type="text" ref={description}/><br /><br />
                </div>
                {selectionType === "department" && (
                    <div>
                        <label>Select Department:</label>
                        <select value={selectedDepartment} onChange={handleDepartmentChange}>
                            <option value="">Select Department</option>
                            {departments.map((department, index) => (
                                <option key={index} value={department}>
                                    {department}
                                </option>
                            ))}
                        </select> <br/><br />
                        <label>Select Semester:</label>
                        <select value={selectedSemester} onChange={handleSemesterChange}>
                            <option value="">Select Semester</option>
                            {semesters.map((semester, index) => (
                                <option key={index} value={semester}>
                                    {semester}
                                </option>
                            ))}
                        </select><br /><br />
                    </div>
                )}
                {selectionType === "roll_numbers" && (
                    <div>
                        <label>Enter Roll Numbers:</label>
                        <input
                            type="text"
                            value={enteredRollNumbers}
                            onChange={handleRollNumbersChange}
                            placeholder="Comma-separated roll numbers"
                        />
                    </div>
                )}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default SendNotifications;
