import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';

import FeedbackForm from './FeedbackForm'; // Assuming you have a FeedbackForm component

const Feedback = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Make an API call to get the list of subjects requiring feedback
    axiosClient.get('/getRequiredFeedbackSubjects')
      .then(response => {
        setSubjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching feedback subjects:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  // ... (code to fetch subjects and render the list)

  function handleOpenFeedbackForm(subject) {
    setSelectedSubject(subject);
    setIsFeedbackFormOpen(true);
  }

  function handleCloseFeedbackForm() {
    setSelectedSubject(null);
    setIsFeedbackFormOpen(false);
  }

  return (
    <div className="container">
 <div className="subject-list">
        {subjects.map(subject => (
          <div key={subject.subject_code} className="subject-item">
            <h3>{subject.subject_name}</h3>
            <button onClick={() => handleOpenFeedbackForm(subject)}>Submit Now</button>
          </div>
        ))}
      </div>
      {isFeedbackFormOpen && (
        <div className="custom-modal">
          <div className="custom-modal-content">
            <button onClick={handleCloseFeedbackForm}>Close</button>
            {selectedSubject && (
              <FeedbackForm
                subject={selectedSubject}
                onClose={handleCloseFeedbackForm}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Feedback;
