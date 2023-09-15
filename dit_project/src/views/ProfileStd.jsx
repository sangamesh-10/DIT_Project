import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import './view.css';

const ProfileStd = () => {
  const [profileData, setProfileData] = useState({});
  const [enrolledData, setEnrolledData] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useStateContext();
  const roll_num = user?.roll_num || '';

  useEffect(() => {
    if (!roll_num) {
      setLoading(false); // No need to make the API request if roll_num is empty
      return;
    }

    // Make the API request to fetch profile data
    axiosClient
      .get(`/studentMe?roll_num=${roll_num}`)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });

    // Make the API request to fetch enrolled student data
    axiosClient.get(`/studentsEnrolled?roll_num=${roll_num}`)
      .then((response) => {
        setEnrolledData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching enrolled student data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [roll_num]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!profileData) {
    return <div>Error: Unable to fetch profile data</div>;
  }

  const {
    name,
    email,
    phone_num,
    father_name,
    mother_name,
  } = profileData;
  const { batch, branch, specialization, semester } = enrolledData;

  return (
    <div className="container">
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>{email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone Number</TableCell>
              <TableCell>{phone_num}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Father's Name</TableCell>
              <TableCell>{father_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mother's Name</TableCell>
              <TableCell>{mother_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Batch</TableCell>
              <TableCell>{batch}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Branch</TableCell>
              <TableCell>{branch}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Specialization</TableCell>
              <TableCell>{specialization}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Semester</TableCell>
              <TableCell>{semester}</TableCell>
            </TableRow>
            {/* Add additional profile fields here */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProfileStd;
