import React, { useState, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import { CssBaseline } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export const AdminLogin = () => {
    const [open, setOpen] = React.useState(false);
    const [errors, setErrors] = useState({ student_id: '', password: '' })

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };
    const admin_id = useRef();
    const password = useRef();
    const { setUser, setToken } = useStateContext();
    const [loggedIn, setLoggedIn] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            admin_id: admin_id.current.value,
            password: password.current.value
        };

        try {
            const { data } = await axiosClient.post('/adminLogin', payload);
            setUser(data.user);
            setToken(data.access_token);
            console.log(data);
            handleClick(); // Show Snackbar on successful login
            setTimeout(() => {
              setLoggedIn(true);
            }, 2000);
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                console.log(response.data.errors);
                setErrors(response.data.errors)
            }
            else if(response.status === 401)
      {
        setErrors({password:"Wrong Password"});
      }
        }
    };
    if(loggedIn){
        return <Navigate to="/admin" replace={true} />;
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
              Sign In
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
              id="admin_id"
              label="ID"
              name="admin_id"
              inputRef={admin_id}
              error={!!errors.admin_id}
              helperText={errors.admin_id}
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
              error={!!errors.password}
              helperText={errors.password}
            />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
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
