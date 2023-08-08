import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
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
    <div className='notification-container'>
      <h2 className='notification-title'>Notifications</h2>
      <ul className='notification-list'>
        {notifications.length === 0 ? (
          <li className='notification-item'>
            <span>All notifications are read.</span>
          </li>
        ) : (
          notifications.map((notification) => (
            <li key={notification.id} className='notification-item'>
              <span>{notification.message}</span>
              {!notification.read && (
                <button
                  className='mark-as-read-button'
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Notifications;
