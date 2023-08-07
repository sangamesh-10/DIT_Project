import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import your CSS file for styling

function App() {
  const navigate = useNavigate(); // Hook to handle navigation

  return (
    <div className="card">
      <h1>Welcome to the Department Of Information Technology</h1>
      <p>Click the buttons below to navigate:</p>

      <div className="button-container">
        <button className="login-button" onClick={() => navigate('/StudentLogin')}>
          Student Login
        </button>
        <button className="login-button" onClick={() => navigate('/FacultyLogin')}>
          Faculty Login
        </button>
      </div>
    </div>
  );
}

export default App;
