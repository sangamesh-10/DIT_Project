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

export const ViewSemester = () => {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(`/getSemester`);
      setSemesters(response.data);
    } catch (err) {
      console.error("Error occurred", err);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Semester Enrollment
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Semester</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {semesters.map((sem, index) => (
                <TableRow key={index}>
                  <TableCell>{sem.year}</TableCell>
                  <TableCell>{sem.code}</TableCell>
                  <TableCell>{sem.semester}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
