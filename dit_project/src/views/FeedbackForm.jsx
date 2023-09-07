import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';


const FeedbackForm = ({ subject, onClose }) => {
  const [feedback, setFeedback] = useState({}); // Store responses
  const [questions, setQuestions] = useState([]);
  const { user } = useStateContext();
  useEffect(() => {
    // Make an API request to fetch questions and options
    axiosClient.get('/getQuestions')
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleRadioChange = (questionNumber, selectedOption) => (e) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [questionNumber]: selectedOption,
    }));
    console.log(feedback);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the form data
    const formData = {
      roll_num: user.roll_num, // You need to define 'user' or replace it with the appropriate user data
      subject_code: subject.subject_code,
      responses: feedback,
    };

    // Make an API request to submit the form data
    axiosClient.post('/submitFeedback', formData) // Replace with your API endpoint
      .then((response) => {
        console.log('Feedback submitted successfully:', response.data);
        // Close the feedback form
        onClose();
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
      });
  };
  useEffect(() => {
    setFeedback({});
  }, [subject]);
  return (
    <div className="feedback-form">
      <h3>Feedback for {subject.subject_name}</h3>
      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.question_number}>
            <p>{question.question}</p>
            {/* Create options with values ranging from 1 to 5 */}
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  name={`question_${question.question_number}`}
                  value={value}
                  checked={feedback[`question_${question.question_number}`] === value}
                  onChange={handleRadioChange(`question_${question.question_number}`, value)}
                  required
                />
                {getOptionLabel(value)}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

// Helper function to get the label for each option value
const getOptionLabel = (value) => {
  switch (value) {
    case 1:
      return 'Very Poor';
    case 2:
      return 'Poor';
    case 3:
      return 'Good';
    case 4:
      return 'Very Good';
    case 5:
      return 'Excellent';
    default:
      return '';
  }
};

export default FeedbackForm;
