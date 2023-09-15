import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

export const ViewFaculty = () => {
  const [facultyProfiles, setFacultyProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(`/facultyDetails`);
      setFacultyProfiles(response.data);
      setLoading(false); // Data has been loaded, so set loading to false
    } catch (err) {
      console.error("Error occurred", err);
      setLoading(false); // Even if there's an error, set loading to false
    }
  };

  return (
    <div>
      <Typography variant="h4" marginBottom={2}>Faculty Profiles</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Faculty ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Alt Email</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Aadhar Number</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Experience</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facultyProfiles.map((faculty, index) => (
                <TableRow key={index}>
                  <TableCell>{faculty.faculty_id}</TableCell>
                  <TableCell>{faculty.name}</TableCell>
                  <TableCell>{faculty.email}</TableCell>
                  <TableCell>{faculty.alt_email}</TableCell>
                  <TableCell>{faculty.phone_num}</TableCell>
                  <TableCell>{faculty.aadhar_num}</TableCell>
                  <TableCell>{faculty.designation}</TableCell>
                  <TableCell>{faculty.experience}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
