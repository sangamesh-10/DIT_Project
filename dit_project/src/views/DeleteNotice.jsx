import React, { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';

export const DeleteNotice = () => {
  const noticeIdRef = useRef('');
  const descriptionRef = useRef('');
  const dateRef = useRef('');
  const [error, setError] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      notice_id: noticeIdRef.current.value,
      description: descriptionRef.current.value,
      date: dateRef.current.value,
    };

    try {
      const response = await axiosClient.delete('/deleteNotice', {
        data: payload,
      });

      if (response.data === 'true') {
        setSnackbarMessage('Deleted Successfully');
        setSnackbarOpen(true);

        // Clear input fields and reset error state
        noticeIdRef.current.value = '';
        descriptionRef.current.value = '';
        dateRef.current.value = '';
        setError({});
        setNotFound(false);

        // Refresh the page
        //window.location.reload();
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError(err.response.data.errors);
      } else if (err.response && err.response.status === 404) {
        setNotFound(true);
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
        Delete Notice
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="noticeId"
          label="Notice ID"
          inputRef={noticeIdRef}
          helperText={error.notice_id && error.notice_id[0]}
          error={error.notice_id !== undefined}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          inputRef={descriptionRef}
          helperText={error.description && error.description[0]}
          error={error.description !== undefined}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="date"
          label="Uploaded Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          inputRef={dateRef}
          helperText={error.date && error.date[0]}
          error={error.date !== undefined}
        />
        {notFound && (
          <Typography variant="body2" color="error">
            Record not found.
          </Typography>
        )}
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }}>
          Delete
        </Button>
      </form>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity= 'success'
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Paper>
  );
};
