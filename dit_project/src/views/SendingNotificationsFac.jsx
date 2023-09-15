import React, { useState } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Typography,
    Snackbar,
    Alert,
    Paper
} from "@mui/material";
import axiosClient from "../axios-client";

const SendNotifications = () => {
    const departments = ["MCA", "Mtech-DS", "Mtech-SE", "Mtech-CNIS", "Mtech-CS"]; // List of departments
    const semesters = [1, 2, 3, 4]; // List of semesters

    const [selectionType, setSelectionType] = useState(""); // department or roll_numbers
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [enteredRollNumbers, setEnteredRollNumbers] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSelectionTypeChange = (event) => {
        setSelectionType(event.target.value);
        setError("");
    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const handleSemesterChange = (event) => {
        setSelectedSemester(event.target.value);
    };

    const handleRollNumbersChange = (event) => {
        setEnteredRollNumbers(event.target.value);
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            select_type: selectionType,
            department: selectedDepartment,
            semester: selectedSemester,
            roll_numbers: enteredRollNumbers,
            description: description,
        };
        console.log(payload);

        try {
            const { data } = await axiosClient.post("sendNotificationsFaculty", payload);
            if (data === "Success") {
                setSuccess(true);
                setError("");
                setEnteredRollNumbers("");
                setSelectedDepartment("");
                setSelectedSemester("");
                setDescription("");
            }
        } catch (err) {
            if (err.response && err.response.status === 422) {
                //console.log(err.response.data.errors);
                setError(err.response.data.errors.rollNumber);
            } else {
                setError("Error in Sending Notification");
            }
        }
    };

    const handleClose = () => {
        setSuccess(false);
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h5" style={{ fontSize: "28px", marginBottom: "1rem", fontWeight: "bold" }}>
                Send Notifications
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="select-type">Select Option</InputLabel>
                    <Select
                        label="Select Option"
                        value={selectionType}
                        onChange={handleSelectionTypeChange}
                    >
                        <MenuItem value="">Select an Option</MenuItem>
                        <MenuItem value="department">Select Department and Semester</MenuItem>
                        <MenuItem value="roll_numbers">Enter Roll Numbers</MenuItem>
                    </Select>
                </FormControl>
                <br /><br />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Enter Message"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br /><br />
                {selectionType === "department" && (
                    <div>
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="select-department">Select Department</InputLabel>
                            <Select
                                label="Select Department"
                                value={selectedDepartment}
                                onChange={handleDepartmentChange}
                            >
                                <MenuItem value="">Select Department</MenuItem>
                                {departments.map((department, index) => (
                                    <MenuItem key={index} value={department}>
                                        {department}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <br /><br />
                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="select-semester">Select Semester</InputLabel>
                            <Select
                                label="Select Semester"
                                value={selectedSemester}
                                onChange={handleSemesterChange}
                            >
                                <MenuItem value="">Select Semester</MenuItem>
                                {semesters.map((semester, index) => (
                                    <MenuItem key={index} value={semester}>
                                        {semester}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                )}
                {selectionType === "roll_numbers" && (
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Enter Roll Numbers (Comma-separated)"
                        value={enteredRollNumbers}
                        onChange={handleRollNumbersChange}
                        error={!!error}
                        helperText={error}
                    />
                )}
                <br /><br />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success">
                    Notification sent successfully!
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default SendNotifications;
