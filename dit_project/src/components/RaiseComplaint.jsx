import React, { useState } from 'react';
import axiosClient from '../axios-client';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const RaiseComplaint = () => {
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [attachedFileNames, setAttachedFileNames] = useState([]);

  const url = window.location.href; // Get the current URL
  let route = '/'; // Default route

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (url.includes('faculty/RaiseComplaint')) {
      route = '/raiseComplaintFaculty';
    } else if (url.includes('student/raiseComplaint')) {
      route = '/raiseComplaintStudent';
    }

    const formData = new FormData();
    formData.append('description', description);

    for (const attachment of attachments) {
      formData.append('attachments[]', attachment);
    }

    try {
      console.log(route);
      const response = await axiosClient.post(route, formData);

      if (response.status === 200) {
        setOpenSnackbar(true);
        // Clear form inputs and attached files after successful submission
        setDescription('');
        setAttachments([]);
        setAttachedFileNames([]);
      } else {
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setOpenSnackbar(true);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files);
    setAttachments(fileArray);

    // Extract and store file names for display
    const fileNames = fileArray.map((file) => file.name);
    setAttachedFileNames(fileNames);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Raise Complaint
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Description"
            fullWidth
            variant="outlined"
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label htmlFor="fileInput" style={{ display: 'flex', alignItems: 'center', marginBottom: '16px', cursor: 'pointer' }}>
            <IconButton component="span" style={{ marginRight: '8px' }}>
              <AttachFileIcon />
            </IconButton>
            Attach Files
          </label>
          <input
            type="file"
            id="fileInput"
            name="attachments[]"
            multiple
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          {attachedFileNames.length > 0 && (
            <List>
              {attachedFileNames.map((fileName, index) => (
                <ListItem key={index}>
                  <ListItemText primary={fileName} />
                </ListItem>
              ))}
            </List>
          )}
          <Button variant="contained" color="primary" type="submit">
            Raise Complaint
          </Button>
        </form>
        <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            Complaint raised successfully!
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default RaiseComplaint;
