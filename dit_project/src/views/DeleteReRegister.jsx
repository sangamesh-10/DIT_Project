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
  Alert,Paper
} from "@mui/material";

export const DeleteReRegister = () => {
  const rollNo = useRef("");
  const subjectCode = useRef("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    const payload = {
      rollNumber: rollNo.current.value,
      subjectCode: subjectCode.current.value,
    };

    try {
      const { data, response } = await axiosClient.delete("/deleteReRegister", {
        data: payload,
      });
      if (data === "true") {
        setSuccessMessage("Deleted Successfully");
        setSnackbarOpen(true);
        // Clear form inputs
        rollNo.current.value = "";
        subjectCode.current.value = "";
      }
    } catch (err) {
        const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSuccessMessage("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          DELETE RE-REGISTER
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
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
            name="subjectCode"
            label="Subject Code"
            type="text"
            id="subjectCode"
            inputRef={subjectCode}
            error={!!errors.subjectCode}
            helperText={errors.subjectCode && errors.subjectCode[0]}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Delete
          </Button>
        </Box>
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
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
