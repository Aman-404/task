import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Avatar,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
  Chip
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  Group,
  Work
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Base } from '../../Base/Base';

const userRoles = [
  { value: 'admin', label: 'Administrator', icon: <AdminPanelSettings />, color: '#ef4444', description: 'Full system access' },
  { value: 'manager', label: 'Project Manager', icon: <Work />, color: '#f59e0b', description: 'Manage projects and teams' },
  { value: 'user', label: 'Team Member', icon: <Group />, color: '#10b981', description: 'Standard user access' }
];

export const CreateUser = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    department: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.role) newErrors.role = 'Role is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log('Creating user:', formData);
    setSuccessMsg(true);

    setTimeout(() => {
      navigate('/home');
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/home');
  };

  const selectedRole = userRoles.find(role => role.value === formData.role);

  return (
    <Base>
      <Box sx={{ p: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden', maxWidth: 800, mx: 'auto' }}>
            {/* Header */}
            <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, textAlign: 'center' }}>
                Create New User
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', mt: 1 }}>
                Add a new team member to your project
              </Typography>
            </Box>

            {/* Avatar Preview */}
            <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
              <Avatar 
                sx={{ 
                  width: 80, 
                  height: 80, 
                  mx: 'auto', 
                  mb: 2,
                  backgroundColor: selectedRole?.color || '#6366f1',
                  fontSize: '2rem'
                }}
              >
                {formData.name ? formData.name.charAt(0).toUpperCase() : <Person />}
              </Avatar>
              {selectedRole && (
                <Chip
                  icon={selectedRole.icon}
                  label={selectedRole.label}
                  sx={{
                    backgroundColor: `${selectedRole.color}20`,
                    color: selectedRole.color,
                    fontWeight: 600
                  }}
                />
              )}
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: '#6b7280' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: '#6b7280' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: '#6b7280' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type={showConfirmPassword ? 'text' : 'password'}
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: '#6b7280' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.role}>
                    <InputLabel>User Role</InputLabel>
                    <Select
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      label="User Role"
                    >
                      {userRoles.map((role) => (
                        <MenuItem key={role.value} value={role.value}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {React.cloneElement(role.icon, { sx: { color: role.color } })}
                              <Typography variant="body1">{role.label}</Typography>
                            </Box>
                            <Typography variant="caption" sx={{ color: '#6b7280', ml: 'auto' }}>
                              {role.description}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  onClick={handleCancel}
                  sx={{ color: '#6b7280' }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5b21b6, #7c3aed)',
                    }
                  }}
                >
                  Create User
                </Button>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Box>

      <Snackbar
        open={successMsg}
        autoHideDuration={3000}
        onClose={() => setSuccessMsg(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          User created successfully! Redirecting to home...
        </Alert>
      </Snackbar>
    </Base>
  );
};
