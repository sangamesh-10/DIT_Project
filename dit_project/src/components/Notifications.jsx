import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  Divider,
  Paper,
  Box,
} from '@mui/material';
import './StudentHomePage.css'; // Import your CSS file with the specified class names

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await axiosClient.get('/getStudentNotifications'); // Replace with your API endpoint
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await axiosClient.put('/studentMarkAsRead', { id: notificationId }); // Adjust the endpoint as needed
      // Update the local state or refetch notifications
      fetchNotifications();
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} className="notification-container">
        <Typography variant="h4" className="notification-title">
          Notifications
        </Typography>
        <Divider />
        <List className="notification-list">
          {notifications.length === 0 ? (
            <ListItem className="notification-item">
              <Typography variant="body1">
                All notifications are read.
              </Typography>
            </ListItem>
          ) : (
            notifications.map((notification) => (
              <ListItem key={notification.id} className="notification-item">
                <Typography variant="body1" style={{ whiteSpace: 'nowrap' }}>
                  {notification.message}
                </Typography>
                <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%">
                  {!notification.read && (
                    <Button
                      variant="outlined"
                      color="primary"
                      className="mark-as-read-button"
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      Mark as Read
                    </Button>
                  )}
                </Box>
              </ListItem>
            ))
          )}
        </List>
      </Paper>
    </Container>
  );
};

export default Notifications;
