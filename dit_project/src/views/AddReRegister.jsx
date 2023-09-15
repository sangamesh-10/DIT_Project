import React, { useRef, useState } from "react";
import axiosClient from "../axios-client";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";

export const AddReRegister = () => {
  const rollNo = useRef("");
  const subCode = useRef("");
  const [errors, setErrors] = useState({});
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setAlreadyRegistered(false);
    const payload = {
      rollNumber: rollNo.current.value,
      subjectCode: subCode.current.value,
    };

    try {
      const { data, response } = await axiosClient.post("/addReRegister", payload);
      if (data === "true") {
        setSnackbarMessage("Registered Successfully");
        setSnackbarOpen(true);
        rollNo.current.value = "";
        subCode.current.value = "";
      }
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      } else if (response && response.status === 423) {
        setAlreadyRegistered(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Typography component="h1" variant="h5">
            ADD RE-REGISTER
          </Typography>
          <form onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="rollNo"
              label="Roll Number"
              name="rollNo"
              inputRef={rollNo}
              error={!!errors.rollNumber}
              helperText={errors.rollNumber && errors.rollNumber.join(", ")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="subCode"
              label="Subject Code"
              type="text"
              id="subCode"
              inputRef={subCode}
              error={!!errors.subjectCode}
              helperText={errors.subjectCode && errors.subjectCode[0]}
            />
            {alreadyRegistered && (
              <Typography variant="body2" color="error">
                Already registered for this subject.
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
