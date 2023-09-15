import React, { useRef, useState } from "react";
import axiosClient from "../axios-client";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

export const DeleteFacultyLogin = () => {
  const facultyIDRef = useRef("");
  const [error, setError] = useState({});
  const[notFound,setNotFound]=useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      facultyID: facultyIDRef.current.value,
    };

    try {
      const response = await axiosClient.delete("/deleteFacLogin", {
        data: payload,
      });
      if (response.data === "true") {
        setSnackbarMessage("Login Deleted Successfully");
        setSnackbarOpen(true);
        // Clear input field
        facultyIDRef.current.value = "";
        setNotFound(false);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.status===422) {
        setError(err.response.data.errors);
      } else if(err.response.data && err.response.status===404) {
        setNotFound(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h5" align="center" gutterBottom>
        Delete Faculty Login
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="facultyID"
          label="Faculty ID"
          inputRef={facultyIDRef}
        />
        {error.facultyID && (
          <Typography variant="body2" color="error">
            {error.facultyID[0]}
          </Typography>
        )}
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
          sx={{ mt: 3 }}
        >
          Delete Login
        </Button>
      </form>
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
    </Paper>
  );
};
