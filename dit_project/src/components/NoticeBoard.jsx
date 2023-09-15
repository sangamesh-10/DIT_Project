import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Link,
  Pagination,
  Box,
  Divider,
} from '@mui/material';
import './studentHomePage.css';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotices = async (page) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/getNotice?page=${page}`);
      const { data, meta } = response.data;
      setNotices(data.data);
      setTotalPages(data.last_page);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    fetchNotices(newPage);
  };

  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);

  return (
    <div className="notice-board">
      <Typography variant="h4">Notice Board</Typography>
      <List>
        {notices.map((notice) => (
          <ListItem
            key={notice.description}
            disablePadding
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <ListItemText
              primary={
                <Link
                  href={notice.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>{notice.description}</strong>
                </Link>
              }
            />
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ flex: '0 0 auto' }}
            >
              {notice.date}
            </Typography>
          </ListItem>
        ))}
      </List>
      <div className="pagination">
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </div>
    </div>
  );
};

export default NoticeBoard;
