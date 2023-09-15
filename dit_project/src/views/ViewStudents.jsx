import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import {
  Container,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export const ViewStudents = () => {
  const departments = ["MCA", "Mtech-DS", "Mtech-SE", "Mtech-CNIS", "Mtech-CS"];
  const semesters = [1, 2, 3, 4];
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [studentProfiles, setStudentProfiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/studentsDetails?department=${selectedDepartment}&semester=${selectedSemester}`
      );
      setStudentProfiles(response.data);
    } catch (err) {
      console.error("Error occurred", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" gutterBottom>
          View Students
        </Typography>
        <form>
          <FormControl sx={{ minWidth: 300, marginBottom: 2 }}>
            <InputLabel htmlFor="department">Select Department</InputLabel>
            <Select
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              fullWidth
              label="Select Department"
            >
              {departments.map((department, index) => (
                <MenuItem key={index} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <FormControl sx={{ minWidth: 300, marginBottom:2 }}>
            <InputLabel htmlFor="semester">Select Semester</InputLabel>
            <Select
              value={selectedSemester}
              onChange={handleSemesterChange}
              fullWidth
              label="Select Semester"
            >
              {semesters.map((semester, index) => (
                <MenuItem key={index} value={semester}>
                  {semester}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={fetchData}
            disabled={!selectedDepartment || !selectedSemester || loading}
          >
            Submit
          </Button>
        </form>
        {loading ? (
          <Typography variant="body2">Loading...</Typography>
        ) : studentProfiles.length === 0 ? (
          <Typography variant="body2">No data found</Typography>
        ) : (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Student Profiles</Typography>
            <table>
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Aadhar Number</th>
                  <th>Mother Name</th>
                  <th>Father Name</th>
                  <th>Parent Number</th>
                  <th>Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                {studentProfiles.map((student, index) => (
                  <tr key={index}>
                    <td>{student.roll_num}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone_num}</td>
                    <td>{student.aadhar_num}</td>
                    <td>{student.mother_name}</td>
                    <td>{student.father_name}</td>
                    <td>{student.parent_num}</td>
                    <td>{student.dob}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        )}
      </Box>
    </Container>
  );
};
