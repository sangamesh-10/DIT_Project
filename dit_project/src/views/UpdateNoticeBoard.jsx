import React, { useState } from 'react';

import axiosClient from '../axios-client';
import { useNavigate } from 'react-router-dom';

const UpdateNoticeBoard = () => {
  const [noticeId, setNoticeId] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to append form data
    const formData = new FormData();
    formData.append('notice_id', noticeId);
    formData.append('description', description);
    formData.append('date', new Date().toISOString().slice(0, 10));
    formData.append('file', file);

    try {
      // Make API call using axios or your preferred HTTP library
      const response = await axiosClient.post('/addNotice', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/admin');
      console.log('API Response:', response.data);
      // You can perform additional actions here, such as showing success messages
    } catch (error) {
      console.error('API Error:', error);
      // Handle error scenarios, e.g., show error messages to the user
    }
  };

  return (
    <div>
      <h2>Update Notice Board</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="noticeId">Notice ID:</label>
          <input
            type="text"
            id="noticeId"
            value={noticeId}
            onChange={(e) => setNoticeId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="file">PDF File:</label>
          <input type="file" id="file" accept=".pdf" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateNoticeBoard;
