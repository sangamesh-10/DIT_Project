import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';

const AdminViewForms = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axiosClient.get('/viewForms');
        setForms(response.data.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  return (
    <div>
      <h1>Available Forms</h1>
      <ul>
        {forms.map((form, index) => (
          <li key={index}>
            <a
              href={form.path}
              target="_blank"
              rel="noopener noreferrer"
            >
              {form.form_name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminViewForms;
