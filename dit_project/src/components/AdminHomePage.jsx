import React, { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CssBaseline,
  createTheme,
  ThemeProvider,
  Box,
  Paper,
  Grid,
  Collapse,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import Notifications from './Notifications';
import NoticeBoard from './NoticeBoard';
import StickyFooter from './StickyFooter';
import StickyHeader from './StickyHeader';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

const theme = createTheme();

const AdminHomePage = () => {
  const { user, token, setUser, setToken } = useStateContext();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [openNoticeBoardActivities, setOpenNoticeBoardActivities] = useState(false);
  const [openStudentActivities, setOpenStudentActivities] = useState(false);
  const [openFacultyActivities, setOpenFacultyActivities] = useState(false);
  const [openSubjects, setOpenSubjects] = useState(false);
  const [openLogins, setOpenLogins] = useState(false);
  const [openSemesterDetails, setOpenSemesterDetails] = useState(false);
  const [openStudentForms, setOpenStudentForms] = useState(false);
  const [openAcademicCalendar, setOpenAcademicCalendar] = useState(false);

  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/AdminLogin" />;
  }


  const handleNoticeBoardActivitiesClick = () => {
    setOpenNoticeBoardActivities(!openNoticeBoardActivities);
  };

  const handleStudentActivitiesClick = () => {
    setOpenStudentActivities(!openStudentActivities);
  };
  const handleFacultyActivitiesClick = () => {
    setOpenFacultyActivities(!openFacultyActivities);
  };
  const handleSubjectsClick = () => {
    setOpenSubjects(!openSubjects);
  };
  const handleLoginsClick = () => {
    setOpenLogins(!openLogins);
  };
  const handleSemesterDetailsClick = () => {
    setOpenSemesterDetails(!openSemesterDetails);
  };
  const handleStudentFormsClick = () => {
    setOpenStudentForms(!openStudentForms);
  };
  const handleAcademicCalendarClick = () => {
    setOpenAcademicCalendar(!openAcademicCalendar);
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/adminLogout');
      setUser({});
      setToken(null);
      navigate('/AdminLogin');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axiosClient.get('/adminMe').then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <>
      <StickyHeader />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDashboardOpen(!dashboardOpen)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">Dashboard</Typography>
            </div>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box display="flex">
          <Drawer
            anchor="left"
            open={dashboardOpen}
            onClose={() => setDashboardOpen(false)}
            variant="persistent"
            PaperProps={{
              style: {
                width: dashboardOpen ? '250px' : '0px',
                position: 'relative',
                height: '100%',
                transition: 'width 0.3s',
              },
            }}
          >
            <div role="presentation" >
              <List >
                <ListItem button component={Link} to="/admin/NoticeBoard">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="NoticeBoard" />
                </ListItem>
                <ListItem button component={Link} to="/admin/updatePassword" >
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Update password" />
                </ListItem>
                <ListItemButton onClick={handleNoticeBoardActivitiesClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="NoticeBoard Activities" />
                  {openNoticeBoardActivities ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openNoticeBoardActivities} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/addNotice'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Add Notice" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/deleteNotice'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Delete Notice" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleStudentActivitiesClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Student Activities" />
                  {openStudentActivities ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStudentActivities} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/studentRegistration'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Add Students" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/viewStudents'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="View Students" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/addReRegister'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Add Re-Registers" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/viewReRegisters'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="View Re-Registers" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/deleteReRegister'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Remove Re-Registers" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleFacultyActivitiesClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Faculty Activities" />
                  {openFacultyActivities ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openFacultyActivities} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/facultyRegistration'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Add New Faculty" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/viewFaculty'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="View Faculty" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/assignFaculty'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Assign Subject" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/assignedFaculty'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="View Assigned Subject" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/updateFacultyAssignment'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Update Assigned Subject" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/deleteFacultyAssignment'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Delete Assigned Subject" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleSubjectsClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Subjects" />
                  {openSubjects ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSubjects} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/addSubjects'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Add Subject" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/viewSubjects'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="View Subjects" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleSemesterDetailsClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Semester Details" />
                  {openSemesterDetails ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openSemesterDetails} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/addSemester'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Add Semester" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/viewSemester'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="View Semester" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/updateSemester'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Update Semester" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/deleteSemester'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Delete Semester" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleStudentFormsClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Student Forms" />
                  {openStudentForms ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStudentForms} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/addForm'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Add Form" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/viewForms'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="View Forms" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/updateForm'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Update Form" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/deleteForm'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Delete Form" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleAcademicCalendarClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Student Activities" />
                  {openAcademicCalendar ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openAcademicCalendar} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/addAcademicCalendar'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Add Calendar" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/viewAcademicCalendar'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="View Calendar" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/updateAcademicCalendar'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Update Notice" />
                    </ListItemButton>
                  </List>
                </Collapse>
                <ListItemButton onClick={handleLoginsClick}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logins" />
                  {openLogins ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openLogins} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/deleteStudentLogin'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Delete Student Login" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link} to='/admin/deleteFacultyLogin'>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary="Delete Faculty Login" />
                    </ListItemButton>
                  </List>
                </Collapse>
                {/* Add more links as needed */}
              </List>
            </div>
          </Drawer>
          <Box
            component={Paper}
            elevation={3}
            style={{
              left:0,
              flexGrow: 1,
              marginLeft: dashboardOpen ? '30px' : '15px',
              transition: 'margin-left 0.3s',
            }}
          >
            <Grid container>
              <Grid item xs={12} sm={dashboardOpen ? 12 : 14} marginLeft={'20px '}>
                {window.location.pathname === '/admin' ? (
                  <>
                    <NoticeBoard />
                  </>
                ) : (
                  <Outlet />
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ThemeProvider>
      <StickyFooter />
    </>
  );
};

export default AdminHomePage;
