
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Container,
  Paper,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Person,
  Lock
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Demo credentials for easy login
  const demoCredentials = {
    admin: { email: 'admin@agileflow.com', password: 'admin123' },
    user: { email: 'user@agileflow.com', password: 'user123' },
    manager: { email: 'manager@agileflow.com', password: 'manager123' }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch(loginStart());

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if credentials match any demo account
      const matchedRole = Object.keys(demoCredentials).find(role => 
        demoCredentials[role].email === formData.email && 
        demoCredentials[role].password === formData.password
      );
      
      if (matchedRole) {
        const userData = {
          id: `${matchedRole}-1`,
          name: matchedRole === 'admin' ? 'Admin User' : 
                matchedRole === 'manager' ? 'Project Manager' : 'Team Member',
          email: formData.email,
          role: matchedRole,
          avatar: null
        };
        
        dispatch(loginSuccess(userData));
        navigate('/dashboard');
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    } catch (err) {
      dispatch(loginFailure('Login failed. Please try again.'));
    }
  };

  const handleDemoLogin = (role) => {
    setFormData(demoCredentials[role]);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper
            elevation={24}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <Box sx={{ p: 4 }}>
              {/* Header */}
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                </motion.div>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#1f2937', mb: 1 }}>
                  Welcome to AgileFlow
                </Typography>
                <Typography variant="body1" sx={{ color: '#6b7280' }}>
                  Sign in to your account to continue
                </Typography>
              </Box>

              {/* Error Alert */}
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Login Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: '#6b7280' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                  sx={{ mb: 4 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: '#6b7280' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5b21b6, #7c3aed)',
                    },
                    mb: 3
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </Box>

              {/* Demo Accounts */}
              <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e5e7eb' }}>
                <Typography variant="body2" sx={{ color: '#6b7280', mb: 2, textAlign: 'center' }}>
                  Demo Accounts (Click to auto-fill)
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {Object.keys(demoCredentials).map((role) => (
                    <Button
                      key={role}
                      variant="outlined"
                      size="small"
                      onClick={() => handleDemoLogin(role)}
                      sx={{
                        textTransform: 'capitalize',
                        borderRadius: 2,
                        borderColor: '#d1d5db',
                        color: '#6b7280',
                        '&:hover': {
                          borderColor: '#6366f1',
                          color: '#6366f1'
                        }
                      }}
                    >
                      {role}
                    </Button>
                  ))}
                </Box>
                <Typography variant="caption" sx={{ color: '#9ca3af', display: 'block', textAlign: 'center', mt: 1 }}>
                  All demo passwords: admin123, user123, manager123
                </Typography>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};


