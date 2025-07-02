import React from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { People, Dashboard } from '@mui/icons-material';

export const Sidebar = () => {
  return (
    <Box sx={{ width: 240, flexShrink: 0, bgcolor: 'background.paper' }}>
      <List>
        <ListItemButton component={Link} to="/admin/dashboard">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton component={Link} to="/admin/users">
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </List>
    </Box>
  );
};
