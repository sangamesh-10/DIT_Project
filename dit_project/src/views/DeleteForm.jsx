import React, { useState } from 'react';
import axiosClient from '../axios-client';

const DeleteForm = () => {
  const [formId, setFormId] = useState('');
  const [formName, setFormName] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient.delete('/deleteForm', {
        data: { form_id: formId, form_name: formName },
      });

      setMessage(response.data.result);
    } catch (error) {
      setMessage('Error deleting form. Please try again.');
      console.error('Error deleting form:', error);
    }
  };

  return (
    <div>
      <h1>Delete Form</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Form ID:
          <input type="text" value={formId} onChange={(e) => setFormId(e.target.value)} />
        </label>
        <br />
        <label>
          Form Name:
          <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} />
        </label>
        <br />
        <button type="submit">Delete Form</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default DeleteForm;
