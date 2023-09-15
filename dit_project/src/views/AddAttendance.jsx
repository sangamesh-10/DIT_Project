import React, { useState, useEffect } from "react";
import { Container, CssBaseline, Typography, Button, Checkbox } from "@mui/material";
import axiosClient from "../axios-client";

export const AddAttendance = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [studentAttd, setStudentAttd] = useState({});
    const [submissionMessage, setSubmissionMessage] = useState("");
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
                attdObj[rollNum] = false; // Use boolean to represent attendance
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
            [rollNum]: !prevAttendance[rollNum], // Toggle attendance using boolean
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            subject_code: selectedSubject,
            students: studentAttd,
        };
        console.log(payload);

        try {
            setReviewStage(true); // Move to the review stage after form submission
        } catch (err) {
            console.error("Error while submitting data", err);
            setSubmissionMessage('Error while submitting Attendance');
            setSubmitted(false);
        }
    };

    const handleFinalSubmit = async () => {
        const payload = {
            subject_code: selectedSubject,
            students: studentAttd,
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
        const totalPresent = Object.values(studentAttd).filter(attended => attended).length;
        alert(`Total Present: ${totalPresent}`);
    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "2rem",
                }}
            >
                <Typography variant="h5" style={{ fontSize: "28px", marginBottom: "1rem" ,fontWeight:'bold'}}>
                    Add Attendance
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Subjects:</label>
                    <div>
                        {subjects.map(subject => (
                            <Button
                                key={subject}
                                variant={selectedSubject === subject ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => handleSubjectClick(subject)}
                                style={{ marginRight: '10px', marginBottom: '10px' }}
                            >
                                {subject}
                            </Button>
                        ))}
                    </div>
                </div>
                {selectedSubject && !reviewStage && (
                    <div>
                        {Object.keys(studentAttd).map(rollNum => (
                            <div key={rollNum}>
                                <label>{rollNum}:</label>
                                <Checkbox
                                    checked={studentAttd[rollNum]}
                                    onChange={() => handleAttendanceChange(rollNum)}
                                />
                            </div>
                        ))}
                        {editMode ? (
                            <div>
                                <Button variant="contained" color="primary" onClick={handleFinalSubmit}>
                                    Submit Attendance
                                </Button>
                            </div>
                        ) : (
                            <Button variant="contained" color="primary" onClick={onSubmit}>
                                Submit Attendance
                            </Button>
                        )}
                    </div>
                )}
                {reviewStage && (
                    <div>
                        <Typography variant="h6" style={{ marginBottom: '10px' }}>Review Attendance</Typography>
                        {Object.keys(studentAttd).map(rollNum => (
                            <div key={rollNum} style={{ marginBottom: '10px' }}>
                                <Typography style={{ display: 'inline-block', width: '100px' }}>{rollNum}:</Typography>
                                <Typography
                                    style={{
                                        display: 'inline-block',
                                        fontWeight: studentAttd[rollNum] ? 'normal' : 'bold',
                                    }}
                                >
                                    {studentAttd[rollNum] ? 'Present' : 'Absent'}
                                </Typography>
                            </div>
                        ))}
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setReviewStage(false)}
                                style={{ marginRight: '10px' }}
                            >
                                Edit Attendance
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => { handleFinalSubmit(); }}
                            >
                                Confirm and Submit
                            </Button>
                        </div>
                    </div>
                )}
                {submitted && <Typography variant="body1" style={{ color: "green", marginTop: "1rem" }}>{submissionMessage}</Typography>}
            </div>
        </Container>
    );
};
