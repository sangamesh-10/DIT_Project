import React, { useRef, useState } from 'react';
import { Container, CssBaseline, Typography, TextField, Button,Avatar } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import axiosClient from '../axios-client';

export default function UpdateContactFaculty() {
  const mobile = useRef();
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      mobile: mobile.current.value,
    };
    try {
      const { data } = await axiosClient.put('/updateContactFaculty', payload);
      console.log(data);
      setSubmissionMessage('Updated successfully');
      setSubmitted(true);
      mobile.current.value = '';
      setTimeout(() => {
        setSubmitted(false);
        setSubmissionMessage('');
      }, 2000);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.errors);
        setSubmissionMessage('Error occurred');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <ContactPhoneIcon />
        </Avatar>
        <Typography variant="h5" style={{ fontSize: '24px', marginBottom: '1rem' }}>
          Update Contact
        </Typography>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            inputRef={mobile}
            type="number"
            label="New Mobile Number"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '1rem' }}
          >
            Update
          </Button>
        </form>
        {submitted && (
          <Typography variant="body1" style={{ color: 'green', marginTop: '1rem' }}>
            {submissionMessage}
          </Typography>
        )}
      </div>
    </Container>
  );
}
