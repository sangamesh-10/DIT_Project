import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

export const ViewAcademicCalendarStudent = () => {
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get("/getAcademicCalendarStudent");
      setCalendar(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error Occurred", err);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Academic Calendar
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
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
                  <TableCell>{calendarItem.to_date ? calendarItem.to_date : "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
