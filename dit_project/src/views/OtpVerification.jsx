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
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const OtpPage = () => {
    const rollNum = useRef();
    const otp = useRef();
    const newPassword = useRef();
    const confirmPassword = useRef();
    const [otpSent, setOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [rno, setRno] = useState('');
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const sendOtp = async (e) => {
        e.preventDefault();
        setRno(rollNum.current.value);
        const payload = {
            student_id: rollNum.current.value,
        };
        try {
            await axiosClient.post('/sendOTPStd', payload);
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
            const { data } = await axiosClient.post('/otpVerifyStd', payload);

            if (data === 'true') {
                setIsOtpVerified(true);
            }
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setError(response.data.error);
            }
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const handleMouseDownPassword = (e) => {
        e.preventDefault();
      };
    const setPwd = async (e) => {
        e.preventDefault();
        const payload = {
            student_id: rno,
            new_password: newPassword.current.value,
            confirm_password: confirmPassword.current.value,
        };

        try {
            const { data } = await axiosClient.put('/SetPwdStd', payload);

            if (data === 'true') {
                console.log(data);
                console.log('Password Updated');
                navigate('/StudentLogin');
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
                                    inputRef={rollNum}
                                    placeholder="Enter RollNumber"
                                    label="Roll Number"
                                    error={error.student_id !== undefined}
                                    helperText={error.student_id && error.student_id}
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
export default OtpPage;
