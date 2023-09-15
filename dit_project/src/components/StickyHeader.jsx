import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

const stickyHeaderStyle = {
  position: 'sticky',
  top: 0,
  backgroundColor: 'transparent', // Customize the background color or set it to 'transparent'
  backgroundImage: `url('/headerbgimage.png')`, // Replace with the actual path to your background image
  backgroundSize: 'cover', // Adjust the background size as needed
  backgroundRepeat: 'no-repeat',
  color: 'black',
  borderBottom: '3px solid #f95005',
  marginTop : 0,
  zIndex:1500,
};

const headerText = {
  fontSize: '32px',
  width : '100%',
  color : '#de1c85',
};

const logoStyle = {
  maxWidth: '100px',
  position: 'fixed',
  left : '0%',
  marginLeft : '15px' // Adjust the size as needed
};

function StickyHeader() {
  return (
    <AppBar style={stickyHeaderStyle} elevation={0}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <img
            src="/JNTU_Hyderabad_logo.png"
            alt="JNTUH Logo"
            title="JNTUH Logo"
            style={logoStyle}
          />
          <div className="logopart">
            <div style={headerText}>Department of Information Technology</div>
            <Typography variant="h6">
              <b>Jawaharlal Nehru Technological University Hyderabad</b>
            </Typography>
            <div className="logobottom">
              Kukatpally, Hyderabad - 500 085, Telangana, India
            </div>
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default StickyHeader;
