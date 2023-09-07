import React, { useRef, useState } from 'react';
import { Container, CssBaseline, Typography, TextField, Button, Avatar, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import axiosClient from '../axios-client';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const UpdatePwdAdmin = () => {
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const oldPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const updatePwd = async (e) => {
    e.preventDefault();
    const payload = {
      old_password: oldPassword.current.value,
      new_password: newPassword.current.value,
      confirm_password: confirmPassword.current.value
    };
    console.log(payload);
    try {
      const { data } = await axiosClient.put('/updatePwdAdmin', payload);

      if (data === 'true') {
        console.log("Password Updated");
        setSubmissionMessage("Password updated");
        setSubmitted(true);
        oldPassword.current.value = '';
        newPassword.current.value = '';
        confirmPassword.current.value = '';
        setTimeout(() => {
          setSubmitted(false);
          setSubmissionMessage('');
        }, 2000);
      }
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.errors);
        setSubmissionMessage("Error Occurred");
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
          <LockIcon />
        </Avatar>
        <Typography variant="h5" style={{ fontSize: '24px', marginBottom: '1rem' }}>
          Update Password
        </Typography>
        <form onSubmit={updatePwd} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-old-password">Old Password</InputLabel>
            <OutlinedInput
              inputRef={oldPassword}
              type={showOldPassword ? 'text' : 'password'}
              id="outlined-adornment-old-password"
              label="Old Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleOldPasswordVisibility}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              required
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-new-password">New Password</InputLabel>
            <OutlinedInput
              inputRef={newPassword}
              type={showNewPassword ? 'text' : 'password'}
              id="outlined-adornment-new-password"
              label="New Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleNewPasswordVisibility}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              required
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
            <OutlinedInput
              inputRef={confirmPassword}
              type={showConfirmPassword ? 'text' : 'password'}
              id="outlined-adornment-confirm-password"
              label="Confirm Password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleConfirmPasswordVisibility}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              required
            />
          </FormControl>

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
};
