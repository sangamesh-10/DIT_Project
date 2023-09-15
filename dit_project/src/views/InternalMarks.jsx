import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import { Paper, Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InternalMarks = () => {
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    const roll_num = user.roll_num;

    axiosClient.get(`/getInternalMarks?roll_num=${roll_num}`)
      .then(response => {
        if (response.data.error) {
            navigate('/student/feedback');
        } else {
          setMarksData(response.data);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again.');
        setMarksData([]);
        setLoading(false);
      });
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="loading-message">
        <CircularProgress />
      </div>
    );
  }

  if (marksData.length === 0) {
    return <div className="error-message">No marks found.</div>;
  }

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Internal Marks
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject Code</TableCell>
              <TableCell>Subject Name</TableCell>
              <TableCell>Mid 1</TableCell>
              <TableCell>Mid 2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marksData.map((mark, index) => (
              <TableRow key={index}>
                <TableCell>{mark.subject_code}</TableCell>
                <TableCell>{mark.subject_name}</TableCell>
                <TableCell>{mark.mid1 !== null ? mark.mid1 : 'Marks Not Updated'}</TableCell>
                <TableCell>{mark.mid2 !== null ? mark.mid2 : 'Marks Not Updated'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default InternalMarks;
