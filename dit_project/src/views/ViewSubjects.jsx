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

export const ViewSubjects = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(`/getSubjects`);
      setSubjects(response.data);
    } catch (err) {
      console.error("Error occurred", err);
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Subjects
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject Code</TableCell>
                <TableCell>Subject Name</TableCell>
                <TableCell>L</TableCell>
                <TableCell>P</TableCell>
                <TableCell>C</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((subject, index) => (
                <TableRow key={index}>
                  <TableCell>{subject.subject_code}</TableCell>
                  <TableCell>{subject.subject_name}</TableCell>
                  <TableCell>{subject.L}</TableCell>
                  <TableCell>{subject.P}</TableCell>
                  <TableCell>{subject.C}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};
