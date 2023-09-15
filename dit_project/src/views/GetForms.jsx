import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Paper,
} from '@mui/material';

const GetForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axiosClient.get('/getForms');
        setForms(response.data.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        <b>Available Forms</b>
      </Typography>
      <List>
        {forms.map((form, index) => (
          <ListItem key={index}>
            <ListItemText>
              <Link
                href={form.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                {form.form_name}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default GetForms;
