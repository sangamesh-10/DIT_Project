import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";

export const AddAttendance = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [studentAttd, setStudentAttd] = useState([]);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [reviewStage, setReviewStage] = useState(false); // State for the review stage
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axiosClient.get("/getFacultySubjects");
            setSubjects(response.data);
            console.log(response.data);
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
            setReviewStage(true); // Move to the review stage after form submission
        } catch (err) {
            console.error("Error while submitting data", err);
            setSubmissionMessage('Error while submitting Attendance');
            setSubmitted(false);
        }
    }
    const handleFinalSubmit = async () => {
        const payload = {
            subject_code: selectedSubject,
            students: studentAttd
        };

        try {
            const { data } = await axiosClient.post("/markAttendance", payload);
            setSubmissionMessage('Successfully added Attendance');
            setStudentAttd({});
            setReviewStage(false);
            setSubmitted(true);
            setEditMode(false); // Reset edit mode
            showAlertWithTotalPresent();

        } catch (err) {
            console.error("Error while submitting data", err);
            setSubmissionMessage('Error while submitting Attendance');
            setSubmitted(false);
        }
    };
    const showAlertWithTotalPresent = () => {
        const totalPresent = Object.values(studentAttd).reduce((total, value) => total + value, 0);
        alert(`Total Present: ${totalPresent}`);
        //xwindow.location.reload();
    };
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
            {selectedSubject &&!reviewStage && (
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
                    {editMode ? (
                        <div>
                            <button onClick={handleFinalSubmit}>Submit Attendance</button>
                        </div>
                    ) : (
                        <button onClick={onSubmit}>Submit Attendance</button>
                    )}


                </div>
                )}
                {reviewStage && (
                <div>
                    <h3>Review Attendance</h3>
                    {Object.keys(studentAttd).map(rollNum => (
                        <div key={rollNum}>
                            <span>{rollNum}:</span>
                            <span>{studentAttd[rollNum]}</span>
                        </div>
                    ))}
                    <div>
                        <button onClick={() => setReviewStage(false)}>Edit Attendance</button>
                        <button onClick={() => {handleFinalSubmit();}}>Confirm and Submit</button>
                    </div>
                </div>
            )}
            {submitted && (
                <p>{submissionMessage}</p>
            )}
            </div>
    );
}
