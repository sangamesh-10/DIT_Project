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

const UpdateForm = () => {
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [newFormFile, setNewFormFile] = useState(null);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('form_id', formId);
    formData.append('form_name', formName);
    formData.append('new_form_file', newFormFile);

    try {
      const response = await axiosClient.post('updateForm', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setErrors({});
      setFormId('');
      setFormName('');
      setNewFormFile(null);
    } catch (error) {
      setMessage('');
      if (error.response && error.response.data && error.response.status === 422) {
        setErrors(error.response.data.error);
      } else if(error.response.status === 500) {
        setErrors({ general: 'Error updating form.Data Not Found.' });
      }
      console.error('Error updating form:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        <b>Update Form</b>
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Form ID"
              fullWidth
              value={formId}
              onChange={(e) => setFormId(e.target.value)}
              error={errors && !!errors.form_id}
              helperText={errors.form_id || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New Form Name"
              fullWidth
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              error={!!errors.form_name}
              helperText={errors.form_name || ''}
            />
          </Grid>
          <Grid item xs={12}>
            <label htmlFor="newFormFile" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <AttachFileIcon style={{ marginRight: '8px' }} />
              {newFormFile ? `Selected File: ${newFormFile.name}` : 'Upload New Form File'}
            </label>
            <input
              type="file"
              accept=".pdf"
              id="newFormFile"
              style={{ display: 'none' }}
              onChange={(e) => setNewFormFile(e.target.files[0])}
              error={!!errors.new_form_file}
            />
            <FormHelperText error>{errors.new_form_file || ''}</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
            >
              Update Form
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

export default UpdateForm;
