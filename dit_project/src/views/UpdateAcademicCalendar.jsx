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

export const UpdateCalendar = () => {
  const branchRef = useRef("");
  const semesterRef = useRef("");
  const descriptionRef = useRef("");
  const fromRef = useRef("");
  const toRef = useRef("");
  const [errors, setErrors] = useState({});
  const [notFound,setNotFound]=useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const payload = {
      branch: branchRef.current.value,
      semester: semesterRef.current.value,
      description: descriptionRef.current.value,
      from: fromRef.current.value,
      to: toRef.current.value,
    };

    try {
      const { data } = await axiosClient.put("/updateCalendar", payload);
      if (data === "true") {
        setSnackbarMessage("Updated successfully");
        setSnackbarOpen(true);
        // Clear form inputs
        branchRef.current.value = "";
        semesterRef.current.value = "";
        descriptionRef.current.value = "";
        fromRef.current.value = "";
        toRef.current.value = "";
        setNotFound(false);
      }
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
      else if(response.status===404)
      {
        setNotFound(true);
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
      <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Update Calendar
          </Typography>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="branch"
              label="Branch"
              name="branch"
              inputRef={branchRef}
              error={!!errors.branch}
              helperText={errors.branch && errors.branch[0]}
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              inputRef={descriptionRef}
              error={!!errors.description}
              helperText={errors.description && errors.description[0]}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="from"
              label="From"
              type="date"
              id="from"
              inputRef={fromRef}
              error={!!errors.from}
              helperText={errors.from && errors.from[0]}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="to"
              label="To"
              type="date"
              id="to"
              inputRef={toRef}
              error={!!errors.to}
              helperText={errors.to && errors.to[0]}
            />
            {notFound && (
              <Typography variant="body2" color="error">
                Record not found.
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
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
