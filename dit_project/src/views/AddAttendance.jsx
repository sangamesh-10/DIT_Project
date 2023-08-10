import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";

export const AddAttendance = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [studentAttd, setStudentAttd] = useState([]);
    const [submissionMessage, setSubmissionMessage] = useState('');

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axiosClient.get("/getFacultySubjects");
            setSubjects(response.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const handleSubjectClick = async (subject) => {
        setSelectedSubject(subject);
        try {
            const response = await axiosClient.get(`/getEnrolledStudents?subject_code=${subject}`);
            setEnrolledStudents(response.data);

            // Create studentMarks object with roll numbers as keys and 0 as values
            const initialStudentAttd = response.data.reduce((attdObj, rollNum) => {
                attdObj[rollNum] = 0;
                return attdObj;
            }, {});

            setStudentAttd(initialStudentAttd);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleAttendanceChange = (rollNum) => {
        setStudentAttd(prevAttendance => ({
            ...prevAttendance,
            [rollNum]: 1
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            subject_code: selectedSubject,
            students: studentAttd
        };
        console.log(payload);

        try {
            const { data } = await axiosClient.post("/markAttendance", payload);
            setSubmissionMessage('Successfully added Attendance');
            setStudentAttd({});
        } catch (err) {
            console.error("Error while submitting data", err);
            setSubmissionMessage('Error while submitting Attendace');
        }
    }
    return (
        <div>
            <label>Subjects:</label>
            <div>
                {subjects.map(subject => (
                    <button
                        key={subject}
                        className={selectedSubject === subject ? 'selected' : ''}
                        onClick={() => handleSubjectClick(subject)}
                    >
                        {subject}
                    </button>
                ))}
            </div>
            {selectedSubject && (
                <div>
                    {Object.keys(studentAttd).map(rollNum => (
                        <div key={rollNum}>
                            <label>{rollNum}:</label>
                            <input
                                type="checkbox"
                                checked={studentAttd[rollNum]}
                                onChange={() => handleAttendanceChange(rollNum)}
                            />
                        </div>
                    ))}
                    <button onClick={onSubmit}>Submit Attendance</button>
                    <p>{submissionMessage}</p>

                </div>
                )}
            </div>
    );
}
