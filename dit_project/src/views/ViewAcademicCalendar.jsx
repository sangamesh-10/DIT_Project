import React, { useState } from "react";
import axiosClient from "../axios-client";
import {
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

export const ViewAcademicCalendar = () => {
  const departments = ["MCA", "Mtech"];
  const semesters = [1, 2, 3, 4];
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [calendar, setCalendar] = useState([]);

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClient.get(
        `/getCalendar?branch=${selectedDepartment}&semester=${selectedSemester}`
      );
      setCalendar(response.data);
    } catch (err) {
      console.error("Error occurred", err);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Academic Calendar
      </Typography>
      <form onSubmit={onSubmit}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            displayEmpty
            inputProps={{ "aria-label": "Select Department" }}
          >
            <MenuItem value="" disabled>
              Select Department
            </MenuItem>
            {departments.map((department, index) => (
              <MenuItem key={index} value={department}>
                {department}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            value={selectedSemester}
            onChange={handleSemesterChange}
            displayEmpty
            inputProps={{ "aria-label": "Select Semester" }}
          >
            <MenuItem value="" disabled>
              Select Semester
            </MenuItem>
            {semesters.map((semester, index) => (
              <MenuItem key={index} value={semester}>
                {semester}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ m: 2 }}>
          Submit
        </Button>
      </form>
      {calendar.length === 0 ? (
        <Typography variant="body1">No data found</Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calendar.map((calendarItem, index) => (
                <TableRow key={index}>
                  <TableCell>{calendarItem.description}</TableCell>
                  <TableCell>{calendarItem.from_date}</TableCell>
                  <TableCell>{calendarItem.to_date || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};
