import React, { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { Container, CssBaseline, Typography, Box, TextField, Button, Avatar } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

export default function UpdateContactStd() {
  const mobile = useRef();
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      mobile: mobile.current.value
    };
    try {
      const { data } = await axiosClient.put('/updateContactStd', payload);
      console.log(data);
      setSubmitted(true);
      setSubmissionMessage('Updated Successfully');
      mobile.current.value = '';
      setTimeout(() => {
        setSubmitted(false);
        setSubmissionMessage('');
      }, 2000);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.errors);
        setSubmissionMessage('Error Occurred!');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <ContactPhoneIcon />
        </Avatar>
        <Typography variant="h5" style={{ fontSize: '24px', marginBottom: '16px' }}>
          Update Contact
        </Typography>
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '16px' }}>
          <TextField
            inputRef={mobile}
            type="number"
            label="New Mobile Number"
            variant="outlined"
            style={{ marginBottom: '16px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginBottom: '16px' }}
          >
            Update
          </Button>
        </form>
        {submitted && (
          <Typography variant="body1" style={{ color: 'green' }}>{submissionMessage}</Typography>
        )}
      </Box>
    </Container>
  );
}
