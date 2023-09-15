import React, { useState, useEffect } from 'react';
import axiosClient from "../axios-client";
import { useStateContext } from '../contexts/ContextProvider';
import {
  Typography,
  Grid,
  Link,
  Paper,
  ListItem,
  ListItemText,
  List,
} from '@mui/material';

function GetSoftCopies() {
  const [softCopies, setSoftCopies] = useState({});
  const { user } = useStateContext();

  useEffect(() => {
    async function fetchSoftCopies() {
      try {
        const response = await axiosClient.get(`/getSoftCopies/?roll_num=${user.roll_num}`);
        setSoftCopies(response.data.softCopies);
      } catch (error) {
        console.error(error);
      }
    }

    fetchSoftCopies();
  }, [user]);

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        <b>Certificates</b>
      </Typography>
      <Grid container spacing={2}>
        {Object.keys(softCopies).map((column, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <List>
              <ListItem >
                <ListItemText
                  primary={
                    <Typography variant="body1" style={{ fontSize: '1.1rem' }}>
                      <span style={{ fontSize: '1.2rem', marginRight: '0.5rem' }}>&bull;</span>
                      <Link href={softCopies[column]} target='_blank' download>
                        {column}
                      </Link>
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default GetSoftCopies;
