import React, { useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import {
    Paper,
    Typography,
    Button,
    CircularProgress,
    Modal,
    Box,
    Container,
    Grid,
} from '@mui/material';
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
        return (
            <Container>
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
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
        <container>
            <Grid Container spacing={2}>
                {subjects.map(subject => (
                    <Grid item xs={12} sm={6} md={4} key={subject.subject_code}>
                        <Paper elevation={3}style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                            <Box p={2} display="flex" flexDirection="column" alignItems="center">
                                <Typography variant="h6" gutterBottom>
                                    {subject.subject_name}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleOpenFeedbackForm(subject)}
                                >
                                    Submit Now
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            {isFeedbackFormOpen && (
                <div className="custom-modal">
                    <Box
                        position="absolute"
                        transform="translate(-50%, -50%)"
                        bgcolor="white"
                        p={3}
                        minWidth="300px"
                        maxWidth="80%"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCloseFeedbackForm}
                        >
                            Close
                        </Button>
                        {selectedSubject && (
                            <FeedbackForm
                                subject={selectedSubject}
                                onClose={handleCloseFeedbackForm}
                            />
                        )}
                    </Box>
                </div>
            )}
        </container>
    );
}

export default Feedback;
