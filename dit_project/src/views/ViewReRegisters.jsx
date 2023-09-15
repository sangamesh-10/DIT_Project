import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export const ViewReRegisters = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axiosClient.get("/getReRegister");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        ReRegisters Data
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Roll Number</TableCell>
            <TableCell>Subject Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={index}>
              <TableCell>{student.roll_num}</TableCell>
              <TableCell>{student.subject_code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
