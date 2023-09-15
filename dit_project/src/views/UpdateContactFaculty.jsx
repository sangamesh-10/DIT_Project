import React, { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { Container, CssBaseline, Typography, Box, TextField, Button, Avatar } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';

export default function UpdateContactFaculty() {
  const mobile = useRef();
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({}); // State for API errors

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      mobile: mobile.current.value
    };
    try {
      const { data } = await axiosClient.put('/updateContactFaculty', payload);
      console.log(data);
      setSubmitted(true);
      setSubmissionMessage('Updated Successfully');
      setErrors({}); // Clear any previous errors
      mobile.current.value = '';
      setTimeout(() => {
        setSubmitted(false);
        setSubmissionMessage('');
      }, 2000);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        //console.log(response.data.errors);
        setErrors(response.data.errors); // Set the errors received from the backend
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
            error={errors && errors.mobile ? true : false} // Add error class if there's a mobile error
            helperText={errors && errors.mobile ? errors.mobile[0] : null} // Display the mobile error message
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

