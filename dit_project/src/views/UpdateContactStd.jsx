import React, { useRef, useState } from 'react'
import axiosClient from '../axios-client';
import { TextField, Button, Typography, Box } from '@mui/material';


export default function UpdateContactStd() {
    const mobile = useRef();
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            mobile: mobile.current.value
        };
        try {
            const { data } = await axiosClient.put('/updateContactStd', payload)
            console.log(data);
            setSubmitted(true);
            setSubmissionMessage("Updated Successfully");
        }
        catch (err) {
            const response = err.reponse;
            if (response && response.status === 422) {
                console.log(response.data.errors);
                setSubmissionMessage("Error Occured !")
            }
        }

    }
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh', // Center vertically in the viewport
      };

      const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '16px',
      };

      const inputStyle = {
        marginBottom: '16px',
      };

      const buttonStyle = {
        marginBottom: '16px',
      };
    return (
        <div style={containerStyle}>
            <Typography variant="h5" style={{ fontSize: '24px', marginBottom: '16px' }}>
                Update Contact
            </Typography>
            <form style={formStyle} onSubmit={onSubmit}>
                <TextField
                    inputRef={mobile}
                    type="number"
                    label="New Mobile Number"
                    variant="outlined"
                    style={inputStyle}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    style={buttonStyle}
                >
                    Update
                </Button>
            </form>
            {submitted && (
                <Typography variant="body1"style={{ color: 'green' }}>{submissionMessage}</Typography>
            )}
        </div>
    );
}
