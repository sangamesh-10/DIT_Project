import React, { useRef, useState } from 'react';
import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const OtpPageFaculty = () => {
  const facultyId = useRef();
  const otp = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [fid, setFid] = useState('');
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setFid(facultyId.current.value);
    const payload = {
      faculty_id: facultyId.current.value,
    };
    try {
      await axiosClient.post('/sendOTPFaculty', payload);
      setOtpSent(true);
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setError(response.data.error);
        console.log(err);
      }
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const payload = {
      otp: otp.current.value,
    };
    try {
      const { data } = await axiosClient.post('/otpVerifyFaculty', payload);
      console.log(data);

      if (data === 'true') {
        setIsOtpVerified(true);
        console.log(isOtpVerified);
      }
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setError(response.data.error);
      }
    }
  };

  const setPwd = async (e) => {
    e.preventDefault();
    const payload = {
      faculty_id: fid,
      new_password: newPassword.current.value,
      confirm_password: confirmPassword.current.value,
    };
    try {
      const { data } = await axiosClient.put('/setPwdFaculty', payload);

      if (data === 'true') {
        console.log(data);
        console.log('Password Updated');
        navigate('/facultyLogin');
      }
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.error);
        setError(response.data.error);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setError({});
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '64px',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom className="form-title">
          OTP Page
        </Typography>
        {!otpSent ? (
          <Box>
            <form onSubmit={sendOtp}>
              <div>
                <TextField
                  type="text"
                  inputRef={facultyId}
                  placeholder="Enter ID"
                  label="Faculty ID"
                  error={error.faculty_id !== undefined}
                  helperText={error.faculty_id && error.faculty_id}
                  fullWidth
                  required
                  sx={{ marginBottom: 2 }}
                />
              </div>
              <Button type="submit" name="sendOtp" variant="contained" color="primary" fullWidth>
                Send OTP
              </Button>
            </form>
          </Box>
        ) : (
          <div>
            {isOtpVerified ? (
              <div>
                <p>OTP Verified Successfully!</p>
                <form className="form" onSubmit={setPwd}>
                  <div className="form-group">
                    <TextField
                      type={showPassword ? 'text' : 'password'}
                      inputRef={newPassword}
                      label="New Password"
                      fullWidth
                      required
                      error={error.new_password !== undefined}
                      helperText={error.new_password && error.new_password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ marginBottom: 2 }}
                    />
                  </div>
                  <div className="form-group">
                    <TextField
                      type={showPassword ? 'text' : 'password'}
                      inputRef={confirmPassword}
                      label="Confirm Password"
                      fullWidth
                      required
                      error={error.confirm_password !== undefined}
                      helperText={error.confirm_password && error.confirm_password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      sx={{ marginBottom: 2 }}
                    />
                  </div>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Update
                  </Button>
                </form>
              </div>
            ) : (
              <div>
                <form className="form" onSubmit={verifyOtp}>
                  <div className="form-group">
                    <TextField
                      type="text"
                      inputRef={otp}
                      placeholder="Enter OTP sent to your email"
                      label="OTP"
                      error={error.otp !== undefined}
                      helperText={error.otp && error.otp}
                      fullWidth
                      required
                      sx={{ marginBottom: 2 }}
                    />
                  </div>
                  <Button type="submit" name="verifyOtp" variant="contained" color="primary" fullWidth>
                    Verify OTP
                  </Button>
                </form>
              </div>
            )}
          </div>
        )}
        <Snackbar open={Object.keys(error).length > 0} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {Object.values(error).map((errorMsg) => (
              <div key={errorMsg}>{errorMsg}</div>
            ))}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default OtpPageFaculty;
