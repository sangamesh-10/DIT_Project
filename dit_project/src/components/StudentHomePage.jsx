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
  Avatar,
  createTheme,
  ThemeProvider,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import Notifications from './Notifications';
import NoticeBoard from './NoticeBoard';
import StickyFooter from '../components/StickyFooter';
import StickyHeader from '../components/StickyHeader';

const theme = createTheme();

const StudentHomePage = () => {
  const { user, token, setUser, setToken } = useStateContext();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/StudentLogin" />;
  }

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/studentLogout');
      setUser({});
      setToken(null);
      navigate('/StudentLogin');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axiosClient.get('/studentMe').then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <>
    <StickyHeader/>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
  <Toolbar style={{  width: '100%', display: 'flex', justifyContent: 'space-between' }}>
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
              transition: 'width 0.3s',            },
          }}
        >
          <div role="presentation">
            <List>
              <ListItem  component={Link} to="/student/Profile">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem  component={Link} to="/student/Attendance">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Check Attendance" />
              </ListItem>
              <ListItem  component={Link} to="/student/Noticeboard">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="NoticeBoard" />
              </ListItem>
              <ListItem  component={Link} to="/student/Notifications">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem  component={Link} to="/student/updatePwd">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Update Password" />
              </ListItem>
              <ListItem  component={Link} to="/student/updateContact">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Update Contact" />
              </ListItem>
              <ListItem  component={Link} to="/student/InternalMarks">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Check InternalMarks" />
              </ListItem>
              <ListItem  component={Link} to="/student/viewAcadmicCalendar">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Academic Calendar" />
              </ListItem>
              <ListItem  component={Link} to="/student/enrolledSubjects">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Enrolled Subjects" />
              </ListItem>
              <ListItem  component={Link} to="/student/raiseComplaint">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Raise Complaints" />
              </ListItem>
              <ListItem  component={Link} to="/student/getForms">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Download Forms" />
              </ListItem>
              <ListItem  component={Link} to="/student/softCopies?roll_num={user}">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Download SoftCopies" />
              </ListItem>
              {/* Add more links as needed */}
            </List>
          </div>
        </Drawer>
        <Box
          component={Paper}
          elevation={3}
          style={{
            left: 0,
            flexGrow: 1,
            marginLeft: dashboardOpen ? '10px' : '0px',
            transition: 'margin-left 0.3s',
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={dashboardOpen ? 10 : 12}>
              {window.location.pathname === '/student' ? (
                <>
                  <Notifications />
                  <br />
                  <br />
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
    <StickyFooter/>
    </>
  );

};

export default StudentHomePage;
