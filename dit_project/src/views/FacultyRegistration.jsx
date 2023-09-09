import React, { useRef, useState } from "react";
import axiosClient from '../axios-client';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const FacultyReg = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const fid = useRef();
    const name = useRef();
    const email = useRef();
    const altemail = useRef();
    const phNo = useRef();
    const aadharNo = useRef();
    const designation = useRef();
    const experience = useRef();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setValidationErrors({}); // Clear previous errors
        const payload = {
            faculty_id: fid.current.value,
            name: name.current.value,
            email: email.current.value,
            altEmail: altemail.current.value,
            phoneNo: phNo.current.value,
            aadharNo: aadharNo.current.value,
            designation: designation.current.value,
            experience: experience.current.value
        }
        console.log(payload);
        try {
            const { data } = await axiosClient.post("/facultyRegistration", payload)
            if (data) {
                setSnackbarSeverity("success");
                setSnackbarMessage("Registered successfully");
                setSnackbarOpen(true);
                window.location.reload();
            }
        }
        catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setValidationErrors(response.data.errors);
            }
        }
    }

    return (
        <div align="center">
            <Typography variant="h6" align="center" color="primary" sx={{ py: 2 }}>FACULTY REGISTRATION</Typography>
            <form onSubmit={onSubmit}>
                <Box sx={{ "& > :not(style)": { marginBottom: 2 } }}>

            <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Faculty ID" variant="outlined" required
            inputRef={fid}error={!!validationErrors["faculty_id"]} helperText={validationErrors["faculty_id"]}
            sx={{ width: '50%', fontSize: '14px' }}/>
            </Grid>

            <Grid item xs={12} sm={6}>
             <TextField fullWidth label="Name"variant="outlined" required
            inputRef={name} error={!!validationErrors["name"]} helperText={validationErrors["name"]}
             sx={{ width: '50%', fontSize: '14px' }}/>
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField fullWidth    label="Email" variant="outlined"required
            inputRef={email} error={!!validationErrors["email"]} helperText={validationErrors["email"]}
            sx={{ width: '50%', fontSize: '14px' }} />
            </Grid>

            <Grid item xs={12} sm={6}>
             <TextField fullWidth label="Alternate Email"variant="outlined" required
            inputRef={altemail} error={!!validationErrors["altEmail"]} helperText={validationErrors["altEmail"]}
            sx={{ width: '50%', fontSize: '14px' }}/>
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone Number" variant="outlined"required
            inputRef={phNo} error={!!validationErrors["phoneNo"]} helperText={validationErrors["phoneNo"]}
            sx={{ width: '50%', fontSize: '14px' }}/>
             </Grid>

            <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Aadhar Number" variant="outlined" required
            inputRef={aadharNo} error={!!validationErrors["aadharNo"]} helperText={validationErrors["aadharNo"]}
            sx={{ width: '50%', fontSize: '14px' }}/>
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Designation" variant="outlined" required
            inputRef={designation} error={!!validationErrors["designation"]} helperText={validationErrors["designation"]}
            sx={{ width: '50%', fontSize: '14px' }}/>
            </Grid>

            <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Experience" variant="outlined" required
             inputRef={experience} error={!!validationErrors["experience"]} helperText={validationErrors["experience"]}
             sx={{ width: '50%', fontSize: '14px' }}/>
            </Grid>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                    <Button type="reset" variant="outlined" color="secondary">Reset</Button>
                </Box>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={snackbarSeverity}
                    onClose={handleCloseSnackbar}
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    )
}

