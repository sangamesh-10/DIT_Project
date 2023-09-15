import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';
import {
  Typography,
  Paper,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  makeStyles,
} from '@mui/material';

const FeedbackForm = ({ subject, onClose }) => {
  const [feedback, setFeedback] = useState({});
  const [questions, setQuestions] = useState([]);
  const { user } = useStateContext();

  useEffect(() => {
    // Make an API request to fetch questions and options
    axiosClient
      .get('/getQuestions')
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleRadioChange = (questionNumber) => (e) => {
    setFeedback({
      ...feedback,
      [questionNumber]: parseInt(e.target.value, 10),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the form data
    const formData = {
      roll_num: user.roll_num,
      subject_code: subject.subject_code,
      responses: feedback,
    };

    // Make an API request to submit the form data
    axiosClient
      .post('/submitFeedback', formData)
      .then((response) => {
        console.log('Feedback submitted successfully:', response.data);
        // Close the feedback form
        onClose();
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
      });
  };

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

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
        Feedback for {subject.subject_name}
      </Typography>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <Grid container spacing={2} key={question.question_number}>
            <Grid item xs={12} className="question">
              <Typography>
                {index + 1}. {question.question}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                row
                name={`question_${question.question_number}`}
                value={feedback[`question_${question.question_number}`] || ''}
                onChange={handleRadioChange(`question_${question.question_number}`)}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <FormControlLabel
                    key={value}
                    value={value.toString()}
                    control={<Radio />}
                    label={getOptionLabel(value)}
                  />
                ))}
              </RadioGroup>
            </Grid>
          </Grid>
        ))}
        <Button variant="contained" color="primary" type="submit">
          Submit Feedback
        </Button>
      </form>
    </Paper>
  );
};

export default FeedbackForm;
