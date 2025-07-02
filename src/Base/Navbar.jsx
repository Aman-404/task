import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  InputBase,
  Paper,
  Chip,
  Tooltip,
  Switch
} from '@mui/material';
import {
  Search,
  AccountCircle,
  Notifications,
  Settings,
  Logout,
  Dashboard,
  DarkMode,
  LightMode
} from '@mui/icons-material';
import { logout, toggleTheme } from '../store/slices/authSlice';

export const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, theme } = useSelector(state => state.auth);
  const { currentProject, projects } = useSelector(state => state.projects);
  const { activeSprint, sprints } = useSelector(state => state.sprints);
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentProjectData = projects.find(p => p.id === currentProject);
  const activeSprintData = sprints.find(s => s.id === activeSprint);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    handleClose();
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const isDarkMode = theme === 'dark';

  return (
    <AppBar 
      position="sticky" 
      elevation={2}
      sx={{ 
        backgroundColor: isDarkMode ? '#1f2937' : '#6366f1',
        borderBottom: `1px solid ${isDarkMode ? '#374151' : '#5b21b6'}20`
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        {/* Left Section - Logo and Project Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography 
            variant="h5" 
            component={Link} 
            to="/dashboard"
            sx={{ 
              fontWeight: 700, 
              color: 'white',
              textDecoration: 'none',
              '&:hover': { color: '#e0e7ff' }
            }}
          >
            AgileFlow
          </Typography>
          
          {currentProjectData && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip
                label={currentProjectData.key}
                size="small"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 600
                }}
              />
              <Typography variant="body2" sx={{ color: '#e0e7ff' }}>
                {currentProjectData.name}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Center Section - Search */}
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            borderRadius: 2,
            backgroundColor: isDarkMode ? '#374151' : 'white',
            '&:hover': {
              boxShadow: 2
            }
          }}
        >
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <Search sx={{ color: isDarkMode ? '#9ca3af' : '#6b7280' }} />
          </IconButton>
          <InputBase
            sx={{ 
              ml: 1, 
              flex: 1,
              color: isDarkMode ? 'white' : 'inherit'
            }}
            placeholder="Search tasks, projects, people..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Paper>

        {/* Right Section - Sprint, Notifications, Theme, Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {activeSprintData && (
            <Tooltip title="Active Sprint">
              <Chip
                label={`Sprint ${activeSprintData.name.split(' ')[1]}`}
                size="small"
                sx={{
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#22c55e',
                  fontWeight: 600
                }}
              />
            </Tooltip>
          )}
          
          <Tooltip title="Toggle Theme">
            <IconButton onClick={handleThemeToggle} sx={{ color: 'white' }}>
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton sx={{ color: 'white' }}>
              <Notifications />
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton
              onClick={handleMenu}
              sx={{ color: 'white' }}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  fontSize: '0.9rem'
                }}
              >
                {user ? user.name?.charAt(0).toUpperCase() : 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            PaperProps={{
              sx: {
                mt: 1,
                borderRadius: 2,
                boxShadow: 3,
                minWidth: 200
              }
            }}
          >
            <MenuItem onClick={handleClose}>
              <AccountCircle sx={{ mr: 2 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Settings sx={{ mr: 2 }} />
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 2 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
