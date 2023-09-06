import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";

export const AddMarks = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [studentMarks, setStudentMarks] = useState([]);
    const [selectedExam, setSelectedExam] = useState('');
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
            const initialStudentMarks = response.data.reduce((marksObj, rollNum) => {
                marksObj[rollNum] = 0;
                return marksObj;
            }, {});

            setStudentMarks(initialStudentMarks);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleMarksChange = (rollNum, newMarks) => {
        setStudentMarks(prevStudentMarks => ({
            ...prevStudentMarks,
            [rollNum]: newMarks
        }));
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            subject_code: selectedSubject,
            exam_type: selectedExam,
            students: studentMarks
        };
        console.log(payload);

        try {
            setReviewStage(true); // Move to the review stage after form submission
        } catch (err) {
            console.log(err);
            console.error("Error while submitting data", err);
            setSubmissionMessage('Error while submitting marks');
            setSubmitted(false);
        }
    };

    const handleFinalSubmit = async () => {
        const payload = {
            subject_code: selectedSubject,
            exam_type: selectedExam,
            students: studentMarks
        };

        try {
            const { data } = await axiosClient.post("/addInternalMarks", payload);
            setSubmissionMessage('Successfully added marks');
            setStudentMarks({});
            setSubmitted(true);
            setReviewStage(false);
            setEditMode(false); // Reset edit mode
        } catch (err) {
            console.error("Error while submitting data", err);
            setSubmissionMessage('Error while submitting marks');
            setSubmitted(false);
        }
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
            {selectedSubject && !submitted && !reviewStage && (
                <div>
                    <label>Exams:</label>
                    <select
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e.target.value)}
                    >
                        <option value="">Select Exam</option>
                        <option value="mid1">Midterm 1</option>
                        <option value="mid2">Midterm 2</option>
                    </select>
                    {Object.keys(studentMarks).map(rollNum => (
                        <div key={rollNum}>
                            <label>{rollNum}:</label>
                            <input
                                type="number"
                                value={studentMarks[rollNum] || ''}
                                onChange={e => handleMarksChange(rollNum, e.target.value)}
                            />
                        </div>
                    ))}
                     {editMode ? (
                        <div>
                            <button onClick={handleFinalSubmit}>Submit Marks</button>
                        </div>
                    ) : (
                        <button onClick={onSubmit}>Submit Marks</button>
                    )}
                </div>
            )}
           {reviewStage && (
                <div>
                    <h3>Review Marks</h3>
                    {Object.keys(studentMarks).map(rollNum => (
                        <div key={rollNum}>
                            <span>{rollNum}:</span>
                            <span>{studentMarks[rollNum]}</span>
                        </div>
                    ))}
                    <div>
                        <button onClick={() => setReviewStage(false)}>Edit Marks</button>
                        <button onClick={handleFinalSubmit}>Confirm and Submit</button>
                    </div>
                </div>
            )}
            {submitted && (
                <p>{submissionMessage}</p>
            )}
        </div>
    );
};
