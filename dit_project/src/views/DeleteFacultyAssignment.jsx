import React, { useRef, useState } from "react";
import axiosClient from "../axios-client";
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
  Alert,
  FormHelperText,
  Paper,
} from "@mui/material";

export const DeleteFacultyAssignment = () => {
  const subjectCodeRef = useRef("");
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");

    const payload = {
      subjectCode: subjectCodeRef.current.value,
    };

    try {
      const { data, response } = await axiosClient.delete("/deleteAssignment", {
        data: payload,
      });
      if (data === "true") {
        setSuccessMessage("Deleted Successfully !");
        subjectCodeRef.current.value = "";
      }
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3}style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Delete Assigned Subject
        </Typography>
        <form onSubmit={onSubmit}>
          <Box m={2}>
            <TextField
              fullWidth
              label="Subject Code"
              variant="outlined"
              inputRef={subjectCodeRef}
              error={!!errors.subjectCode}
            />
            {errors.subjectCode && (
              <FormHelperText error>{errors.subjectCode}</FormHelperText>
            )}
          </Box>
          <Box m={2} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              Delete
            </Button>
          </Box>
          {successMessage && (
            <Box m={2} textAlign="center">
              <Alert severity="success">{successMessage}</Alert>
            </Box>
          )}
        </form>
      </Paper>
    </Container>
  );
};
