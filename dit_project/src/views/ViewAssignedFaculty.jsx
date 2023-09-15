import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Container,
} from "@mui/material";

export const ViewAssignedFaculty = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(`/getAssignedFaculty`);
      setSubjects(response.data);
    } catch (err) {
      console.error("Error occurred", err);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Faculty Assignments
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Faculty ID</TableCell>
                <TableCell>Subject Code</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((assignment, index) => (
                <TableRow key={index}>
                  <TableCell>{assignment.faculty_id}</TableCell>
                  <TableCell>{assignment.subject_code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
