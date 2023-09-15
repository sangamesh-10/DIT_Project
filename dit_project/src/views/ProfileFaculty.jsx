import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import './view.css';

const ProfileFaculty = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useStateContext();
  const faculty_id = user?.faculty_id || '';

  useEffect(() => {
    if (!faculty_id) {
      setLoading(false);
      return;
    }

    axiosClient
      .get(`/me?faculty_id=${faculty_id}`)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [faculty_id]);

  if (loading) {
    return (
      <div className="container">
        <CircularProgress />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="container">
        <Typography variant="h6">Error: Unable to fetch profile data</Typography>
      </div>
    );
  }

  const {
    name,
    email,
    alt_email,
    phone_num,
    designation,
    experience,
  } = profileData;

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
              <TableCell>Alternative Email</TableCell>
              <TableCell>{alt_email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone Number</TableCell>
              <TableCell>{phone_num}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Designation</TableCell>
              <TableCell>{designation}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Experience</TableCell>
              <TableCell>{experience}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProfileFaculty;
