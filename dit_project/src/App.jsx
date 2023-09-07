import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Button,
    Container,
    Toolbar,
    Typography,
    CssBaseline,
    Card,
    CardContent,
    CardActions,
    Grid,
    Paper,
} from '@mui/material';
import StickyFooter from './components/StickyFooter';
import StickyHeader from './components/StickyHeader';

function App() {
    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
            <CssBaseline />
            <StickyHeader />

            <div style={{ flex: 1, paddingTop: '10px' , paddingBottom:'50px'}}>
                <Container maxWidth="md">
                    <Typography variant="h4" gutterBottom>
                        Welcome to the Department Of Information Technology
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Click the buttons below to navigate:
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <img
                                        src="studenticon.jpg" // Replace with the URL of the student image
                                        alt="Student"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <Typography variant="h6" component="div">
                                        Student Login
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Click here to log in as a student.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate('/StudentLogin')}
                                    >
                                        Login
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Card variant="outlined">
                                <CardContent>
                                    <img
                                        src="facultyicon.jpg" // Replace with the URL of the faculty image
                                        alt="Faculty"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <Typography variant="h6" component="div">
                                        Faculty Login
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Click here to log in as a faculty member.
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate('/FacultyLogin')}
                                    >
                                        Login
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>

                    {/* Add your HTML structure here */}
                </Container>
            </div>
            <StickyFooter />

        </div>
    );
}

export default App;
