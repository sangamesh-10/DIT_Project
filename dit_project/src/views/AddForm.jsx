import React, { useState } from 'react';
import axiosClient from '../axios-client';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  FormHelperText,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const AddForm = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [formFile, setFormFile] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id', id);
    formData.append('name', name);
    formData.append('formFile', formFile);

    try {
      const response = await axiosClient.post('/addForms', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);

      setMessage(response.data.message);
      setErrors({});
      setId('');
      setName('');
      setFormFile(null);
    } catch (error) {
      setMessage('');
      if (error.response && error.response.data && error.response.status === 422) {
        setErrors(error.response.data.error);
      } else {
        setErrors({ general: 'Error adding form. Please try again.' });
      }
      console.error('Error adding form:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        <b>Add Form</b>
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Form ID"
              fullWidth
              value={id}
              onChange={(e) => setId(e.target.value)}
              error={errors && !!errors.id}
              helperText={errors.id || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Form Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name}
              helperText={errors.name || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="formFile" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <AttachFileIcon style={{ marginRight: '8px' }} />
              {formFile ? `Selected File: ${formFile.name}` : 'Upload New Form File'}

            </label>
            <input
              type="file"
              accept=".pdf"
              id="formFile"
              style={{ display: 'none' }}
              onChange={(e) => setFormFile(e.target.files[0])}
              error={!!errors.formFile}
            />
            <FormHelperText error>{errors.formFile || ''}</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Add Form
            </Button>
          </Grid>
        </Grid>
      </form>
      {errors.general && (
        <Typography variant="body1" color="error" gutterBottom>
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

export default AddForm;
