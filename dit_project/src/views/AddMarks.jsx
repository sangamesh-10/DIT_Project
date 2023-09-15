import React, { useState, useEffect } from "react";
import { Container, CssBaseline, Typography, Button, Select, MenuItem, TextField } from "@mui/material";
import { Snackbar, SnackbarContent } from "@mui/material";

import axiosClient from "../axios-client";

export const AddMarks = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [studentMarks, setStudentMarks] = useState({});
    const [selectedExam, setSelectedExam] = useState("");
    const [submissionMessage, setSubmissionMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [reviewStage, setReviewStage] = useState(false); // State for the review stage
    const [editMode, setEditMode] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");


    useEffect(() => {
        fetchSubjects();
    }, []);

    const fetchSubjects = async () => {
        try {
            const response = await axiosClient.get("/getFacultySubjects");
            setSubjects(response.data);
        } catch (error) {
            console.error("Error fetching subjects:", error);
        }
    };

    const handleSubjectClick = async (subject) => {
        setSelectedSubject(subject);
        try {
            const response = await axiosClient.get(`/getEnrolledStudents?subject_code=${subject}`);
            setEnrolledStudents(response.data);

            const initialStudentMarks = response.data.reduce((marksObj, rollNum) => {
                marksObj[rollNum] = 0;
                return marksObj;
            }, {});

            setStudentMarks(initialStudentMarks);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    const handleMarksChange = (rollNum, newMarks) => {
        setStudentMarks((prevStudentMarks) => ({
            ...prevStudentMarks,
            [rollNum]: newMarks,
        }));
    };

    const clearValidationErrors = () => {
        setValidationErrors({});
    };
    const openSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            subject_code: selectedSubject,
            exam_type: selectedExam,
            students: studentMarks,
        };
        console.log(payload);

        try {
            setReviewStage(true);
        } catch (err) {
            console.error("Error while submitting data", err);
            setSubmissionMessage("Error while submitting marks");
            setSubmitted(false);
        }
    };

    const handleFinalSubmit = async () => {
        const payload = {
            subject_code: selectedSubject,
            exam_type: selectedExam,
            students: studentMarks,
        };

        try {
            const { data } = await axiosClient.post("/addInternalMarks", payload);
            setSubmissionMessage("Successfully added marks");
            setStudentMarks({});
            setSubmitted(true);
            setReviewStage(false);
            setEditMode(false); // Reset edit mode
        } catch (err) {
            const response = err.response;
            if (response && response.status === 400) {
                setValidationErrors(response.data.error);
                console.log(validationErrors);

            }
            else if (response && response.status === 500) {
                openSnackbar("Already marks submitted");
            }


        }
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
                <Typography variant="h5" style={{ fontSize: "28px", marginBottom: "1rem", fontWeight: "bold", }}>
                    Add Marks
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ marginRight: '10px' }}>Subjects:</label>
                    <div>
                        {subjects.map((subject) => (
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
                {selectedSubject && !submitted && !reviewStage && (
                    <div>
                        <label>Exams:</label>
                        <Select
                            value={selectedExam}
                            onChange={(e) => setSelectedExam(e.target.value)}
                            sx={{
                                minWidth: '200px',
                                marginLeft: '10px',
                                height: '40px',
                            }}
                        >
                            <MenuItem value="">Select Exam</MenuItem>
                            <MenuItem value="mid1">Midterm 1</MenuItem>
                            <MenuItem value="mid2">Midterm 2</MenuItem>
                        </Select>
                        <div style={{ marginTop: '20px' }}>
                            {Object.keys(studentMarks).map((rollNum) => (
                                <div key={rollNum} style={{ marginBottom: '10px' }}>
                                    <label>{rollNum}:</label>
                                    <TextField
                                        type="number"
                                        value={studentMarks[rollNum] || ''}
                                        onChange={(e) => handleMarksChange(rollNum, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                        {editMode ? (
                            <div>
                                <Button variant="contained" color="primary" onClick={handleFinalSubmit}>
                                    Submit Marks
                                </Button>
                            </div>
                        ) : (
                            <Button variant="contained" color="primary" onClick={onSubmit}>
                                Submit Marks
                            </Button>
                        )}
                    </div>
                )}
                {reviewStage && (
                    <div>
                        <Typography variant="h6" style={{ marginBottom: '10px' }}>Review Marks</Typography>
                        {Object.keys(studentMarks).map((rollNum) => (
                            <div key={rollNum} style={{ marginBottom: '10px' }}>
                                <Typography style={{ display: 'inline-block', width: '100px' }}>{rollNum}:</Typography>
                                {validationErrors[rollNum] ? (
                                    <Typography style={{ display: 'inline-block', color: 'red' }}>Invalid marks</Typography>
                                ) : (
                                    <Typography style={{ display: 'inline-block' }}>{studentMarks[rollNum]}</Typography>
                                )}
                            </div>
                        ))}
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    setReviewStage(false)
                                    clearValidationErrors();
                                }}
                                style={{ marginRight: '10px' }}
                            >
                                Edit Marks
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleFinalSubmit}
                            >
                                Confirm and Submit
                            </Button>
                        </div>
                    </div>
                )}
                {submitted && (
                    <Typography variant="body1" style={{ color: submissionMessage === "Already marks submitted" ? "red" : "green", marginTop: "1rem" }}>
                        {submissionMessage}
                    </Typography>
                )}            </div>
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
            >
                <SnackbarContent
                    message={snackbarMessage}
                    style={{
                        backgroundColor: "red",
                    }}
                />
            </Snackbar>

        </Container>

    );
};
