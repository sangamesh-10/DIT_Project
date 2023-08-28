import React, { useState } from 'react';
import axiosClient from '../axios-client';

const AddForm = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [formFile, setFormFile] = useState(null);
  const [message, setMessage] = useState('');

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
    } catch (error) {
      setMessage('Error adding form. Please try again.');
      console.error('Error adding form:', error);
    }
  };

  return (
    <div>
      <h1>Add Form</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Form ID:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <br />
        <label>
          Form Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Form File:
          <input type="file" accept=".pdf" onChange={(e) => setFormFile(e.target.files[0])} />
        </label>
        <br />
        <button type="submit">Add Form</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddForm;
