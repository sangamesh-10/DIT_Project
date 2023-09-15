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
  Paper, // Added Paper component
} from "@mui/material";

export const AddSemester = () => {
  const yearRef = useRef("");
  const codeRef = useRef("");
  const semesterRef = useRef("");
  const [errors, setErrors] = useState({});
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const payload = {
      year: yearRef.current.value,
      code: codeRef.current.value,
      semester: semesterRef.current.value,
    };

    try {
      const { data } = await axiosClient.post("/addSemester", payload);
      if (data === "true") {
        setSnackbarMessage("Registered Successfully");
        setSnackbarOpen(true);
        // Clear form inputs
        yearRef.current.value = "";
        codeRef.current.value = "";
        semesterRef.current.value = "";
      }
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      } else if (response && response.status === 423) {
        setAlreadyAdded(true);
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
      <Paper elevation={3} style={{ padding: "20px" }}> {/* Added Paper component */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Semester
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="year"
              label="Year"
              name="year"
              inputRef={yearRef}
              error={!!errors.year}
              helperText={errors.year && errors.year[0]}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="code"
              label="Code"
              type="text"
              id="code"
              inputRef={codeRef}
              error={!!errors.code}
              helperText={errors.code && errors.code[0]}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="semester"
              label="Semester"
              type="text"
              id="semester"
              inputRef={semesterRef}
              error={!!errors.semester}
              helperText={errors.semester && errors.semester[0]}
            />
            {alreadyAdded && (
              <Typography variant="body2" color="error">
                Already Added this year and code.
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
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};
