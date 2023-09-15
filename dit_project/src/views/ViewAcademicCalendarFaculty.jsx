import React, { useState } from "react";
import axiosClient from "../axios-client";
import {
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from '@mui/material';
export const ViewAcademicCalendarFaculty = () => {
    const departments = ["MCA", "Mtech"]; // List of departments
    const semesters = [1, 2, 3, 4];
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [calendar, setCalendar] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleDepartmentChange = (event) => {
      setSelectedDepartment(event.target.value);
    };

    const handleSemesterChange = (event) => {
      setSelectedSemester(event.target.value);
    };

    const onSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true); // Show loading indicator while fetching data

      try {
        const response = await axiosClient.get(
          `/getCalendarFaculty?branch=${selectedDepartment}&semester=${selectedSemester}`
        );
        setCalendar(response.data);
      } catch (err) {
        console.error('Error occurred', err);
      } finally {
        setIsLoading(false); // Hide loading indicator when data is fetched
      }
    };

    return (
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Typography variant="h4" gutterBottom>
        Academic Calendars
      </Typography>
        <form onSubmit={onSubmit}>
          <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
            <InputLabel>Select Branch</InputLabel>
            <Select
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              label="Select Branch"
            >
              <MenuItem value="">
                <em>Select Department</em>
              </MenuItem>
              {departments.map((department, index) => (
                <MenuItem key={index} value={department}>
                  {department}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
            <InputLabel>Select Semester</InputLabel>
            <Select
              value={selectedSemester}
              onChange={handleSemesterChange}
              label="Select Semester"
            >
              <MenuItem value="">
                <em>Select Semester</em>
              </MenuItem>
              {semesters.map((semester, index) => (
                <MenuItem key={index} value={semester}>
                  {semester}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>

        {isLoading ? (
          // Show loading indicator
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        ) : calendar.length === 0 ? (
          <Typography variant="body1" style={{ textAlign: 'center', marginTop: '20px' }}>
            No data found
          </Typography>
        ) : (
          <div>
            <Typography variant="h6">Academic Calendar</Typography>
            <TableContainer component={Paper}>
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
                      <TableCell>{calendarItem.to_date ? calendarItem.to_date : '-'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </Paper>
    );
  };
