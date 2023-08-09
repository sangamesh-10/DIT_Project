import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";

export const AddMarks = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [studentMarks, setStudentMarks] = useState([]);
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
            students: studentMarks
        };

        try {
            const { data } = await axiosClient.post("/addInternalMarks", payload);
            setSubmissionMessage('Successfully added marks');
            setStudentMarks({});
        } catch (err) {
            console.error("Error while submitting data", err);
            setSubmissionMessage('Error while submitting marks');
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
            <div>
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
                <button onClick={onSubmit}>Submit Marks</button>
                <p>{submissionMessage}</p>
            </div>
        </div>
    );
};
