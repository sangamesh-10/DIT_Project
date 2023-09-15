import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';

const DayWiseAttendance = ({ open, handleClose, subjectCode, rollNum }) => {
  const [presentDays, setPresentDays] = useState([]);
  const [absentDays, setAbsentDays] = useState([]);

  useEffect(() => {
    if (open) {
      axiosClient.get(`/getAttendanceDayWise?subject_code=${subjectCode}`)
        .then(response => {
          setPresentDays(response.data.present);
          setAbsentDays(response.data.absent);
        })
        .catch(error => {
          console.error('Error fetching day-wise attendance:', error);
        });
    }
  }, [open, subjectCode, rollNum]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Day-wise Attendance</DialogTitle>
      <DialogContent>
        <h3>Present Days:</h3>
        {presentDays.length === 0 ? (
          <p>0</p>
        ) : (
          <List>
            {presentDays.map((day, index) => (
              <ListItem key={index}>
                <ListItemText primary={day} />
              </ListItem>
            ))}
          </List>
        )}

        <h3>Absent Days:</h3>
        {absentDays.length === 0 ? (
          <p>0</p>
        ) : (
          <List>
            {absentDays.map((day, index) => (
              <ListItem key={index}>
                <ListItemText primary={day} />
              </ListItem>
            ))}
          </List>
        )}

        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default DayWiseAttendance;
