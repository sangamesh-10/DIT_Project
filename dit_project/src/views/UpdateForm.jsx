import React, { useState } from 'react';
import axiosClient from '../axios-client';

const UpdateForm = () => {
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [newFormFile, setNewFormFile] = useState(null);
  const [message, setMessage] = useState('');

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
    } catch (error) {
      setMessage('Error updating form. Please try again.');
      console.error('Error updating form:', error);
    }
  };

  return (
    <div>
      <h1>Update Form</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Form ID:
          <input type="text" value={formId} onChange={(e) => setFormId(e.target.value)} />
        </label>
        <br />
        <label>
          New Form Name:
          <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} />
        </label>
        <br />
        <label>
          New Form File:
          <input type="file" accept=".pdf" onChange={(e) => setNewFormFile(e.target.files[0])} />
        </label>
        <br />
        <button type="submit">Update Form</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UpdateForm;
