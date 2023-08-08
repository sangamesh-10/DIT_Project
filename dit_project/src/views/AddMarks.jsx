import React, { useRef, useState, useEffect } from "react";
import axiosClient from "../axios-client";

export const AddMarks = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [studentMarks, setStudentMarks] = useState([])

    useEffect(() => {
        fetchSubjects();
    }, []);
    const fetchSubjects = async () => {
        try {
            const response = await axiosClient.get("/getFacultySubjects");
            setSubjects(response.data);
            //setSelectedSubject('');
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };
    const handleSubjectClick = async (subject) => {
        window.alert(subject);
        setSelectedSubject(subject);
        try {
            const response = await axiosClient.get(`/getEnrolledStudents?subject_code=${subject}`);
            setEnrolledStudents(response.data);
            setStudentMarks(enrolledStudents.map(rollNum => ({ rollNum, marks: 0 })))

        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };
    const handleMarksChange = (rollNum, newMarks) => {
        //console.log("hie");
        setStudentMarks(prevStudentMarks =>
            prevStudentMarks.map(studentMark =>
                studentMark.rollNum === rollNum ? { ...studentMark, marks: newMarks } : studentMark
            )
        );
    };

    const onSubmit = async (e) => {
        e.preventDefault;
        console.log(selectedSubject);
        const payload = {
            subject_code: selectedSubject,
            students: studentMarks
        }
        console.log(payload);
        try {
            const { data } = await axiosClient.post("/addInternalMarks", payload)
            console.log(data);
        }
        catch (err) {
            console.error("Error while submitting data",err);
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
                {studentMarks.map(studentMark => (
                    <div key={studentMark.rollNum}>
                        <label >{studentMark.rollNum}:</label>
                        <input type="number" value={studentMark.marks}
                            onChange={e => handleMarksChange(studentMark.rollNum, e.target.value)}
                        />
                    </div>
                ))}
                <button onClick={onSubmit}>Submit Marks</button>
            </div>

        </div>
    )

}
