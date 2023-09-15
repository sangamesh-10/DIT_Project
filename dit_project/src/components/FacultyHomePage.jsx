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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { useStateContext } from '../contexts/ContextProvider';
import axiosClient from '../axios-client';
import NoticeBoard from './NoticeBoard';
import StickyFooter from '../components/StickyFooter';
import StickyHeader from '../components/StickyHeader';

const theme = createTheme();

const FacultyHomePage = () => {
  const { user, token, setUser, setToken } = useStateContext();
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/FacultyLogin" />;
  }

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post('/facultyLogout');
      setUser({});
      setToken(null);
      navigate('/FacultyLogin');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axiosClient.get('/me').then(({ data }) => {
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
                width: '240px',
                position: 'relative',
                height: 'calc(100% - 64px)',
                transition: 'width 0.3s',
              },
            }}
          >
            <div role="presentation">
              <List>
              <ListItem  component={Link} to="/faculty/Profile">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem  component={Link} to="/faculty/updatePwd">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Update Password" />
                </ListItem>
                <ListItem  component={Link} to="/faculty/updateContact">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Update Contact" />
                </ListItem>
                <ListItem  component={Link} to="/faculty/Noticeboard">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="NoticeBoard" />
                </ListItem>
                <ListItem  component={Link} to="/faculty/enrolledStudents">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="View Enrolled Students" />
                </ListItem>
                <ListItem  component={Link} to="/faculty/AddAttendance">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Mark Attendance" />
                </ListItem>
                <ListItem  component={Link} to="/faculty/AddMarks">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add InternalMarks" />
                </ListItem>
                <ListItem  component={Link} to="/faculty/sendNotifications">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Send Notifications" />
                </ListItem>
                <ListItem  component={Link} to="/faculty/viewAcademicCalendar">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Academic Calendar" />
                </ListItem>
                <ListItem  component={Link} to="/faculty/RaiseComplaint">
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Raise Complaints" />
                </ListItem>
              </List>
            </div>
          </Drawer>
          <Box
            component={Paper}
            elevation={3}
            style={{
              width: dashboardOpen ? '75%' : '100%',
              flexGrow: 1,
              marginLeft: dashboardOpen ? '10px' : '0px',
              transition: 'margin-left 0.3s',
            }}
          >
            <Grid container>
              <Grid item xs={12} sm={dashboardOpen ? 10 : 12}>
                {window.location.pathname === '/faculty' ? (
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

export default FacultyHomePage;
