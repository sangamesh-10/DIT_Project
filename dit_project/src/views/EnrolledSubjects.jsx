import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export const EnrolledSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get("/enrolledSubjects");
      setSubjects(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error occurred", err);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Enrolled Subjects
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Subject Code</TableCell>
                <TableCell>Subject Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((subject, index) => (
                <TableRow key={index}>
                  <TableCell>{subject.subject_code}</TableCell>
                  <TableCell>{subject.subject_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
