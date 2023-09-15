import React, { useState } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  IconButton,
} from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const UpdateNoticeBoard = () => {
  const [noticeId, setNoticeId] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('notice_id', noticeId);
    formData.append('description', description);
    formData.append('date', new Date().toISOString().slice(0, 10));
    formData.append('file', file);

    try {
      const response = await axiosClient.post('/addNotice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('API Response:', response.data);

      setNoticeId('');
      setDescription('');
      setFile(null);
      setError({});

      setSnackbarMessage('Notice Updated Successfully');
      setSnackbarOpen(true);
    } catch (error) {
      const response = error.response;
      if (response && response.status === 422) {
        console.error('Validation Errors:', response.data.errors);
        setError(response.data.errors);
      } else {
        console.error('API Error:', error.response.data);
        setSnackbarMessage('Error Updating Notice');
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Update Notice Board
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="noticeId"
          label="Notice ID"
          value={noticeId}
          onChange={(e) => setNoticeId(e.target.value)}
          helperText={error.notice_id && error.notice_id[0]}
          error={error.notice_id !== undefined}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          helperText={error.description && error.description[0]}
          error={error.description !== undefined}
        />
        <input
          type="file"
          id="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ position: 'absolute', left: '-9999px' }}
        />
        <label htmlFor="file">
          <IconButton component="span">
            <AddCircleOutlineIcon />
          </IconButton>
        </label>
        {!file && (
          <Box mt={2}>
            <Typography variant="body2" color="error" >
              Please Attach a  File
            </Typography>
          </Box>
        )}
        {file && (
          <Box mt={2}>
            <Typography variant="body2">
              Attached File: {file.name}
            </Typography>
          </Box>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes('Success') ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default UpdateNoticeBoard;
