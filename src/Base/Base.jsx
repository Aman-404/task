import React from 'react';
import { Box } from '@mui/material';
import { NavBar } from './Navbar';
import { NavigationSidebar } from '../components/navigation/NavigationSidebar';

export const Base = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column',zoom:0.9 }}>
      <NavBar />
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        <NavigationSidebar />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            marginLeft: { xs: 0, md: '280px' }, // Width of sidebar only on desktop
            minHeight: 'calc(100vh - 64px)', // Subtract navbar height
            backgroundColor: '#f9fafb',
            p: { xs: 1, md: 0 }
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
