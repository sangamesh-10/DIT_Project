import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";

export const EnrolledStundents = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [studentProfiles, setStudentProfiles] = useState([]);
    const [isTableVisible, setIsTableVisible] = useState(false); // New state for conditional rendering

    useEffect(() => {
        fetchSubjects();
    }, []);

    useEffect(() => {
        if (enrolledStudents.length > 0) {
            fetchStudentProfiles();
        }
    }, [enrolledStudents]);

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
            setIsTableVisible(true);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchStudentProfiles = async () => {
        const profilePromises = enrolledStudents.map(async roll_num => {
            try {
                const response = await axiosClient.get(`/getStudentDetails?roll_num=${roll_num}`);
                return response.data;
            } catch (error) {
                console.error(`Error fetching profile for student ${roll_num}:`, error);
                return null;
            }
        });

        const profiles = await Promise.all(profilePromises);
        setStudentProfiles(profiles.filter(profile => profile !== null));
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
            {isTableVisible && (
                <table>
                    <thead>
                        <tr>
                            <th>Roll Number</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentProfiles.map((profile, index) => (
                            <tr key={index}>
                                <td>{profile.roll_num}</td>
                                <td>{profile.name}</td>
                                <td>{profile.email}</td>
                                <td>{profile.phone_num}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
