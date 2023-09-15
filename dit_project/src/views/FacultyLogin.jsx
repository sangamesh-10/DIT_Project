import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import './form.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const FacultyLogin = () => {
    const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = useState({});
  const [invalidPasswordError, setInvalidPasswordError] = useState("");
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const faculty_id = useRef();
  const password = useRef();
  const { setUser, setToken } = useStateContext();
  const [loggedIn, setLoggedIn] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    // setErrors({});
    // setInvalidPasswordError("");
    const payload = {
      faculty_id: faculty_id.current.value,
      password: password.current.value
    };

    try {
      const { data } = await axiosClient.post('/facultyLogin', payload);
      setUser(data.user);
      setToken(data.access_token);
      // setLoggedIn(true);
      console.log(data);
      handleClick(); // Show Snackbar on successful login
      setTimeout(() => {
        setLoggedIn(true);
      }, 2000);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      } else if (response && response.status === 401) {
        setInvalidPasswordError("Password is incorrect");
      }
    }
  };
  if(loggedIn){
    return <Navigate to="/faculty" replace={true} />;
  }
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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SIGN IN
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="faculty_id"
            label="ID"
            name="faculty_id"
            inputRef={faculty_id}
            error={!!errors.faculty_id}
            helperText={errors.faculty_id}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            inputRef={password}
            error={!!invalidPasswordError}
            helperText={invalidPasswordError}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LOGIN
          </Button>
        </Box>
        <Typography component="p" variant="body2">
        <a href="/OtpVerificationFaculty" className="forgot-password-link">Forgot Password?</a>
        </Typography>
      </Box>
      {/* Snackbar */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Login successful!
        </Alert>
      </Snackbar>
    </Container>
  );
};
