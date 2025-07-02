import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  Divider
} from '@mui/material';
import {
  Dashboard,
  ViewKanban,
  Add,
  People,
  Assignment,
  Analytics,
  Settings
} from '@mui/icons-material';

const navigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <Dashboard /> },
  { path: '/kanban', label: 'Kanban Board', icon: <ViewKanban /> },
  { path: '/createtask', label: 'Create Task', icon: <Add /> },
  { path: '/create', label: 'Create User', icon: <People /> },
  { path: '/home', label: 'Legacy Home', icon: <Assignment /> },
];

export const NavigationSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        width: { xs: '100%', md: 280 },
        height: { xs: 'auto', md: '100vh' },
        position: { xs: 'relative', md: 'fixed' },
        left: { xs: 'auto', md: 0 },
        top: { xs: 'auto', md: 64 }, // Height of AppBar
        backgroundColor: '#f8fafc',
        borderRadius: 0,
        zIndex: 1000
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#374151', mb: 2 }}>
          Navigation
        </Typography>
        
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: '#6366f1',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#5b21b6',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#e0e7ff',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: '#6b7280' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  sx={{ 
                    '& .MuiListItemText-primary': { 
                      fontWeight: 500 
                    } 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />
        
        <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block', mb: 1 }}>
          Quick Actions
        </Typography>
        
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleNavigation('/createtask')}
            sx={{
              borderRadius: 2,
              backgroundColor: '#10b981',
              color: 'white',
              '&:hover': {
                backgroundColor: '#059669',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: 'white' }}>
              <Add />
            </ListItemIcon>
            <ListItemText 
              primary="Create Task" 
              sx={{ 
                '& .MuiListItemText-primary': { 
                  fontWeight: 600 
                } 
              }} 
            />
          </ListItemButton>
        </ListItem>
      </Box>
    </Paper>
  );
};
