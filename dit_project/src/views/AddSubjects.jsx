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

export const AddSubjects = () => {
  const subjectCodeRef = useRef("");
  const subjectNameRef = useRef("");
  const lectureRef = useRef("");
  const practicalRef = useRef("");
  const creditRef = useRef("");
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSnackbarOpen(false);

    const payload = {
      subject_code: subjectCodeRef.current.value,
      subject_name: subjectNameRef.current.value,
      L: lectureRef.current.value,
      P: practicalRef.current.value,
      C: creditRef.current.value,
    };

    try {
      const { data } = await axiosClient.post("/addSubjects", payload);
      if (data) {
        setSnackbarMessage("Subject Added");
        setSnackbarOpen(true);
        // Clear form inputs
        subjectCodeRef.current.value = "";
        subjectNameRef.current.value = "";
        lectureRef.current.value = "";
        practicalRef.current.value = "";
        creditRef.current.value = "";
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
    setSnackbarMessage("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3}>
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
            Add Subject
          </Typography>
          <form onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="subjectCode"
              label="Subject Code"
              name="subjectCode"
              inputRef={subjectCodeRef}
              error={!!errors.subject_code}
              helperText={errors.subject_code}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="subjectName"
              label="Subject Name"
              type="text"
              id="subjectName"
              inputRef={subjectNameRef}
              error={!!errors.subject_name}
              helperText={errors.subject_name}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lecture"
              label="Lecture"
              type="text"
              id="lecture"
              inputRef={lectureRef}
              error={!!errors.L}
              helperText={errors.L}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="practical"
              label="Practical"
              type="text"
              id="practical"
              inputRef={practicalRef}
              error={!!errors.P}
              helperText={errors.P}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="credit"
              label="Credit"
              type="text"
              id="credit"
              inputRef={creditRef}
              error={!!errors.C}
              helperText={errors.C}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
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
