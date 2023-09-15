import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, CircularProgress } from '@mui/material';

export const EnrolledStundents = () => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [enrolledStudents, setEnrolledStudents] = useState([]);
    const [studentProfiles, setStudentProfiles] = useState([]);
    const [isTableVisible, setIsTableVisible] = useState(false); // New state for conditional rendering
    const [isLoading, setIsLoading] = useState(false);

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
            setIsLoading(true);
            const response = await axiosClient.get("/getFacultySubjects");
            setSubjects(response.data);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
        finally{
            setIsLoading(false);
        }
    };

    const handleSubjectClick = async (subject) => {
        setSelectedSubject(subject);
        try {
            setIsLoading(true);
            const response = await axiosClient.get(`/getEnrolledStudents?subject_code=${subject}`);
            setEnrolledStudents(response.data);
            setIsTableVisible(true);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
        finally{
            setIsLoading(false);
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
          <Typography variant="h5">Subjects:</Typography>
          <div>
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? 'contained' : 'outlined'}
                color="primary"
                onClick={() => handleSubjectClick(subject)}
                style={{ marginRight: '10px', marginBottom: '10px' }}
              >
                {subject}
              </Button>
            ))}
          </div>
          {isLoading ?(
          <CircularProgress style={{marginTop:'20px'}}/>):
          isTableVisible ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Roll Number</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Mobile Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentProfiles.map((profile, index) => (
                    <TableRow key={index}>
                      <TableCell>{profile.roll_num}</TableCell>
                      <TableCell>{profile.name}</TableCell>
                      <TableCell>{profile.email}</TableCell>
                      <TableCell>{profile.phone_num}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ):null}
        </div>
      );
}
