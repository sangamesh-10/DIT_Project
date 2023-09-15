import React,{useRef,useState} from "react";
import axiosClient from '../axios-client';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


export const StudentReg=()=>{
    const rno=useRef();
    const name=useRef();
    const email=useRef();
    const phno=useRef();
    const aadharno=useRef();
    const mname=useRef();
    const fname=useRef();
    const parentphno=useRef();
    const dob= useRef();
    const permanentaddr=useRef();
    const presentaddr=useRef();
    const bgroup=useRef();
    const caste=useRef();
    const religion=useRef();
    const [validationErrors, setValidationErrors] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // You can change the severity as needed
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
      };
    const onSubmit= async (e)=>{
        e.preventDefault();
        const payload={
            rollNumber :rno.current.value,
            name :name.current.value,
            email :email.current.value,
            phoneNo :phno.current.value,
            aadharNo :aadharno.current.value,
            motherName :mname.current.value,
            fatherName :fname.current.value,
            parentPhNo :parentphno.current.value,
            dob :dob.current.value,
            permanentAddr :permanentaddr.current.value,
            presentAddr :presentaddr.current.value,
            bloodGroup :bgroup.current.value,
            caste :caste.current.value,
            religion :religion.current.value
        }
        console.log(payload);
        try{
        const {data}=await axiosClient.post('/studentRegistration',payload)
        if(data){
            //setValidationErrors({}); // Clear validation errors
            setSnackbarSeverity("success");
            setSnackbarMessage("Registered successfully");
            setSnackbarOpen(true);
            window.location.reload();
        }
    }
        catch(err){
            const response =err.response;
            console.log(response);
            if(response && response.status===422)
            {
                console.log(response.data.errors);
                 setValidationErrors(response.data.errors);

            }
        }
    }
    // const handleInputChange = (event) => {
    //     const fieldName = event.target.name; // Assuming you set 'name' attribute on your fields
    //     setValidationErrors((prevErrors) => ({
    //       ...prevErrors,
    //       [fieldName]: "", // Clear the error message for the current field
    //     }));
    //   };


    return(
        <div align="center">
        <Typography variant="h6" align="center" color="primary" sx={{ py: 2 }}>STUDENT REGISTRATION FORM</Typography>
        <form onSubmit={onSubmit}>
        <Box sx={{ "& > :not(style)": { marginBottom: 2 } }}>

            <Grid item xs={12} sm={6} >
            <TextField fullWidth label="Roll Number" variant="outlined" required
            inputRef={rno} error={!!validationErrors["rollNumber"]} // Check if there's an error for this field
            helperText={validationErrors["rollNumber"]} // Display the error message
            sx={{ width: '50%', fontSize: '14px' }}
            // onChange={handleInputChange}
            // name="rollNumber"
            />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField fullWidth label="Name"variant="outlined"required
              inputRef={name} error={!!validationErrors["name"]}
              helperText={validationErrors["name"]} sx={{ width: '50%', fontSize: '14px' }}/>
              </Grid>

              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="Email"variant="outlined"required inputRef={email}
              error={!!validationErrors["email"]} helperText={validationErrors["email"]}
               sx={{ width: '50%', fontSize: '14px' }}/>
              </Grid>

              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="PhoneNumber"variant="outlined"required inputRef={phno}
              error={!!validationErrors["phoneNo"]} helperText={validationErrors["phoneNo"]}
              sx={{ width: '50%', fontSize: '14px' }} />
              </Grid>

              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="AadharNumber"variant="outlined"required inputRef={aadharno}
              error={!!validationErrors["aadharNo"]} helperText={validationErrors["aadharNo"]}
              sx={{ width: '50%', fontSize: '14px' }}/>
              </Grid>

              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="MotherName"variant="outlined"required inputRef={mname}
              error={!!validationErrors["motherName"]} helperText={validationErrors["motherName"]}
              sx={{ width: '50%', fontSize: '14px' }}/>
              </Grid>
              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="FatherName"variant="outlined"required inputRef={fname}
              error={!!validationErrors["fatherName"]} helperText={validationErrors["email"]}
              sx={{ width: '50%', fontSize: '14px' }}/>
              </Grid>

              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="ParentNumber"variant="outlined"required inputRef={parentphno}
              error={!!validationErrors["parentPhNo"]} helperText={validationErrors["parentPhNo"]}
              sx={{ width: '50%', fontSize: '14px' }}/>
              </Grid>

              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="DateOfBirth" variant="outlined"required inputRef={dob}
              error={!!validationErrors["dob"]} helperText={validationErrors["dob"]}
              sx={{ width: '50%', fontSize: '14px' }}/>
             <Typography variant="body2" color="textSecondary">
              Please enter the Date of Birth in the yyyy-mm-dd format.
            </Typography>

              </Grid>

              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="PermanentAddress"variant="outlined"required inputRef={permanentaddr}
              error={!!validationErrors["permanentAddr"]} helperText={validationErrors["permanentAddr"]}
              sx={{ width: '50%', fontSize: '14px' }}/>
              </Grid>

              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="PresentAddress"variant="outlined"required inputRef={presentaddr}
              error={!!validationErrors["presentAddr"]} helperText={validationErrors["presentAddr"]}
              sx={{ width: '50%', fontSize: '14px' }}/>
              </Grid>

              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="BloodGroup"variant="outlined"required inputRef={bgroup}
              error={!!validationErrors["bloodGroup"]} helperText={validationErrors["bloodGroup"]}
              sx={{ width: '50%', fontSize: '14px' }}/>
              </Grid>

              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="Caste"variant="outlined"required inputRef={caste}
              error={!!validationErrors["caste"]} helperText={validationErrors["caste"]}
              sx={{ width: '50%', fontSize: '14px' }}/>
              </Grid>
              <Grid item xs={12} sm={6} >
              <TextField fullWidth label="Religion"variant="outlined"required inputRef={religion}
              error={!!validationErrors["religion"]} helperText={validationErrors["religion"]}
              sx={{ width: '50%', fontSize: '14px' }}/>
              </Grid>
            {/* Add similar TextField components for other form fields */}

                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap:'20px' }}>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
                <Button type="reset"variant="outlined"color="secondary">Reset</Button>
                </Box>
                </form>
                <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000} // Adjust the duration as needed
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

