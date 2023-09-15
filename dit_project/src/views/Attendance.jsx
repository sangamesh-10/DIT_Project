import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DayWiseAttendance from './AttendanceDayWise';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const Attendance = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dayWiseModalOpen, setDayWiseModalOpen] = useState(false);
    const [selectedSubjectCode, setSelectedSubjectCode] = useState('');

    const { user } = useStateContext();
    const handleTotalClassesPresentClick = (subjectCode) => {
        setSelectedSubjectCode(subjectCode);
        setDayWiseModalOpen(true);
    }

    useEffect(() => {
        const roll_num = user.roll_num;

        axiosClient.get(`/getAttendance?roll_num=${roll_num}`)
            .then(response => {
                setAttendanceData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [user]);

    if (loading) {
        return (
            <div className="loading-message">
                <CircularProgress />
                Loading...
            </div>
        );
    }

    if (attendanceData.length === 0) {
        return (
            <div className="error-message">
                <ErrorOutlineIcon />
                No Attendance found.
            </div>
        );
    }

    return (
        <Paper elevation={3} className='container'>
            <Typography variant="h5" gutterBottom>
                Attendance
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Subject Code</TableCell>
                        <TableCell>Subject Name</TableCell>
                        <TableCell>Total Classes Present</TableCell>
                        <TableCell>Total Classes Taken</TableCell>
                        <TableCell>Total Percentage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attendanceData.map((attendance, index) => (
                        <TableRow key={index}>
                            <TableCell>{attendance.subject_code}</TableCell>
                            <TableCell>{attendance.subject_name}</TableCell>
                            <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <span style={{marginRight:"20px"}}>{attendance.attended}</span><button
                                        onClick={() => handleTotalClassesPresentClick(attendance.subject_code)}
                                        className="present-button"
                                    >
                                        <CalendarTodayIcon sx={{ color: 'blue' }} />
                                    </button></div></TableCell>
                            <TableCell>{attendance.total}</TableCell>
                            <TableCell>{attendance.percentage + ' %'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DayWiseAttendance
                open={dayWiseModalOpen}
                handleClose={() => setDayWiseModalOpen(false)}
                subjectCode={selectedSubjectCode}
                rollNum={user.roll_num}
            />
        </Paper>
    );
}

export default Attendance;
