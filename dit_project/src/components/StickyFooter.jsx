import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        py: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        // position: 'fixed',
        // bottom: 0,
        // left: 0,
        // right: 0,
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'whitesmoke',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="body1">
          © This is the official website of{' '}
          <Link color="inherit" href="http://jntuhsit.org/">
            Department of Information Technology
          </Link>
          , Jawaharlal Nehru Technological University Hyderabad.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
