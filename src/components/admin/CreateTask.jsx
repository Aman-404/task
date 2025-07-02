import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  AvatarGroup
} from '@mui/material';
import {
  Add,
  Assignment,
  BugReport,
  Schedule,
  Person,
  CalendarToday,
  Flag,
  AttachFile,
  Save,
  Cancel
} from '@mui/icons-material';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { addTask } from '../../store/slices/taskSlice';
import { Base } from '../../Base/Base';

const taskTypes = [
  { value: 'story', label: 'User Story', icon: <Assignment />, color: '#6366f1' },
  { value: 'bug', label: 'Bug', icon: <BugReport />, color: '#ef4444' },
  { value: 'task', label: 'Task', icon: <Schedule />, color: '#10b981' }
];

const priorities = [
  { value: 'low', label: 'Low', color: '#10b981' },
  { value: 'medium', label: 'Medium', color: '#f59e0b' },
  { value: 'high', label: 'High', color: '#ef4444' },
  { value: 'critical', label: 'Critical', color: '#7c2d12' }
];

const storyPointOptions = [1, 2, 3, 5, 8, 13, 21];

const steps = ['Basic Info', 'Details', 'Assignment'];

export const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, currentProject } = useSelector(state => state.projects);
  const { sprints, activeSprint } = useSelector(state => state.sprints);
  
  const [activeStep, setActiveStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'story',
    priority: 'medium',
    assignee: '',
    reporter: 'Admin',
    storyPoints: 5,
    sprintId: activeSprint || '',
    dueDate: dayjs().add(7, 'day'),
    tags: [],
    attachments: []
  });
  const [errors, setErrors] = useState({});
  const [newTag, setNewTag] = useState('');

  const currentProjectData = projects.find(p => p.id === currentProject);
  const teamMembers = currentProjectData?.members || ['John Doe', 'Jane Smith', 'Bob Johnson'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch (step) {
      case 0: // Basic Info
        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.type) newErrors.type = 'Task type is required';
        break;
      case 1: // Details
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.priority) newErrors.priority = 'Priority is required';
        break;
      case 2: // Assignment
        if (!formData.assignee) newErrors.assignee = 'Assignee is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    if (validateStep(2)) {
      const taskData = {
        ...formData,
        dueDate: formData.dueDate.format('YYYY-MM-DD'),
        status: 'todo'
      };
      
      dispatch(addTask(taskData));
      setShowSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        navigate('/kanban');
      }, 2000);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Task Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                error={!!errors.title}
                helperText={errors.title}
                placeholder="Enter a descriptive title for your task"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Task Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  label="Task Type"
                >
                  {taskTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {React.cloneElement(type.icon, { sx: { color: type.color } })}
                        {type.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Story Points</InputLabel>
                <Select
                  value={formData.storyPoints}
                  onChange={(e) => handleInputChange('storyPoints', e.target.value)}
                  label="Story Points"
                >
                  {storyPointOptions.map((points) => (
                    <MenuItem key={points} value={points}>
                      {points} {points === 1 ? 'point' : 'points'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
        
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Provide detailed description of the task"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!errors.priority}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  label="Priority"
                >
                  {priorities.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Flag sx={{ color: priority.color }} />
                        {priority.label}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                value={formData.dueDate ? formData.dueDate.format('YYYY-MM-DD') : ''}
                onChange={(e) => handleInputChange('dueDate', dayjs(e.target.value))}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: dayjs().format('YYYY-MM-DD')
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Tags</Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                  {formData.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      size="small"
                    />
                  ))}
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Add tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="small">
                    <Add />
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        );
        
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Autocomplete
                options={teamMembers}
                value={formData.assignee}
                onChange={(event, newValue) => handleInputChange('assignee', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Assignee"
                    error={!!errors.assignee}
                    helperText={errors.assignee}
                  />
                )}
                renderOption={(props, option) => (
                  <Box component="li" {...props} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem' }}>
                      {option.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </Avatar>
                    {option}
                  </Box>
                )}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Reporter"
                value={formData.reporter}
                onChange={(e) => handleInputChange('reporter', e.target.value)}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Sprint</InputLabel>
                <Select
                  value={formData.sprintId}
                  onChange={(e) => handleInputChange('sprintId', e.target.value)}
                  label="Sprint"
                >
                  <MenuItem value="">
                    <em>Backlog (No Sprint)</em>
                  </MenuItem>
                  {sprints.map((sprint) => (
                    <MenuItem key={sprint.id} value={sprint.id}>
                      {sprint.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        );
        
      default:
        return null;
    }
  };

  return (
    <Base>
      <Box sx={{ p: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
              {/* Header */}
              <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, textAlign: 'center' }}>
                  Create New Task
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', mt: 1 }}>
                  Add a new task to your project
                </Typography>
              </Box>

              {/* Stepper */}
              <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              {/* Form Content */}
              <Box sx={{ p: 4 }}>
                {renderStepContent(activeStep)}
              </Box>

              {/* Actions */}
              <Box sx={{ p: 3, borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  onClick={handleCancel}
                  startIcon={<Cancel />}
                  sx={{ color: '#6b7280' }}
                >
                  Cancel
                </Button>
                
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      startIcon={<Save />}
                      sx={{
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #5b21b6, #7c3aed)',
                        }
                      }}
                    >
                      Create Task
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #5b21b6, #7c3aed)',
                        }
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          </motion.div>
        </Box>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Task created successfully! Redirecting to Kanban board...
          </Alert>
        </Snackbar>
    </Base>
  );
};


