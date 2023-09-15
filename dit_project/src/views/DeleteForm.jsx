import React, { useState } from 'react';
import axiosClient from '../axios-client';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
} from '@mui/material';

const DeleteForm = () => {
  const initialFormData = {
    formId: '',
    formName: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient.delete('/deleteForm', {
        data: { form_id: formData.formId, form_name: formData.formName },
      });

      setMessage(response.data.result);
      setErrors({});
      setFormData(initialFormData); // Reset form data to initial state
    } catch (err) {
      setMessage('');
      if (err.response && err.response.data && err.response.status === 422) {
        setErrors(err.response.data.error);
      } else if (err.response.status === 404) {
        setErrors({ general: 'Form not found.' });
      }
      console.error('Error deleting form:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        <b>Delete Form</b>
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Form ID"
              fullWidth
              name="formId"
              value={formData.formId}
              onChange={handleInputChange}
              error={errors && !!errors.form_id}
            />
            {errors.form_id && (
              <Typography variant="body2" color="error">
                {errors.form_id}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Form Name"
              fullWidth
              name="formName"
              value={formData.formName}
              onChange={handleInputChange}
              error={!!errors.form_name}
            />
            {errors.form_name && (
              <Typography variant="body2" color="error">
                {errors.form_name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Delete Form
            </Button>
          </Grid>
        </Grid>
      </form>
      {errors.general && (
        <Typography variant="body2" color="error">
          {errors.general}
        </Typography>
      )}
      {message && (
        <Typography variant="body1" color="primary" gutterBottom>
          {message}
        </Typography>
      )}
    </Paper>
  );
};

export default DeleteForm;
