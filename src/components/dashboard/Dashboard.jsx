import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Card, 
  CardContent,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Chip
} from '@mui/material';
import { 
  TrendingUp, 
  Assignment, 
  BugReport, 
  CheckCircle,
  Timer,
  Group
} from '@mui/icons-material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const COLORS = ['#ef4444', '#f59e0b', '#8b5cf6', '#10b981'];

export const Dashboard = () => {
  const { tasks } = useSelector(state => state.tasks);
  const { sprints, activeSprint } = useSelector(state => state.sprints);
  const { projects, currentProject } = useSelector(state => state.projects);

  const currentProjectData = projects.find(p => p.id === currentProject);
  const activeSprintData = sprints.find(s => s.id === activeSprint);

  // Calculate statistics
  const taskStats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    done: tasks.filter(t => t.status === 'done').length
  };

  const tasksByType = [
    { name: 'Stories', value: tasks.filter(t => t.type === 'story').length },
    { name: 'Bugs', value: tasks.filter(t => t.type === 'bug').length },
    { name: 'Tasks', value: tasks.filter(t => t.type === 'task').length }
  ];

  const velocityData = [
    { sprint: 'Sprint 1', planned: 25, completed: 23 },
    { sprint: 'Sprint 2', planned: 30, completed: 28 },
    { sprint: 'Sprint 3', planned: 35, completed: 32 },
    { sprint: 'Sprint 4', planned: 40, completed: 38 }
  ];

  const burndownData = activeSprintData?.burndownData || [];

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <Card elevation={2} sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', mb: 0.5 }}>
              {value}
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', fontWeight: 500 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="caption" sx={{ color: color, fontWeight: 600, mt: 0.5 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              backgroundColor: `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {React.cloneElement(icon, { sx: { color, fontSize: 28 } })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1f2937' }}>
        Project Dashboard
      </Typography>

      {/* Project Overview */}
      {currentProjectData && (
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#111827', mb: 1 }}>
                {currentProjectData.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                {currentProjectData.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.8rem' } }}>
                  {currentProjectData.members.map((member, index) => (
                    <Avatar key={index} sx={{ backgroundColor: currentProjectData.color }}>
                      {member.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </Avatar>
                  ))}
                </AvatarGroup>
                <Chip
                  icon={<Group />}
                  label={`${currentProjectData.members.length} members`}
                  size="small"
                  sx={{ backgroundColor: '#f3f4f6' }}
                />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h3" sx={{ fontWeight: 700, color: currentProjectData.color }}>
                {currentProjectData.progress}%
              </Typography>
              <Typography variant="caption" sx={{ color: '#6b7280' }}>
                Project Progress
              </Typography>
              <LinearProgress
                variant="determinate"
                value={currentProjectData.progress}
                sx={{
                  mt: 1,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#f3f4f6',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: currentProjectData.color,
                    borderRadius: 4
                  }
                }}
              />
            </Box>
          </Box>
        </Paper>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tasks"
            value={taskStats.total}
            icon={<Assignment />}
            color="#6366f1"
            subtitle={`${taskStats.done} completed`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="In Progress"
            value={taskStats.inProgress}
            icon={<Timer />}
            color="#f59e0b"
            subtitle={`${Math.round((taskStats.inProgress / taskStats.total) * 100)}% of total`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={taskStats.done}
            icon={<CheckCircle />}
            color="#10b981"
            subtitle={`${Math.round((taskStats.done / taskStats.total) * 100)}% completion rate`}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Bug Reports"
            value={tasks.filter(t => t.type === 'bug').length}
            icon={<BugReport />}
            color="#ef4444"
            subtitle={`${tasks.filter(t => t.type === 'bug' && t.status === 'done').length} resolved`}
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Velocity Chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#111827' }}>
              Sprint Velocity
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="sprint" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="planned" fill="#e5e7eb" name="Planned" />
                <Bar dataKey="completed" fill="#6366f1" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Task Distribution */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: 400 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#111827' }}>
              Task Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'To Do', value: taskStats.todo },
                    { name: 'In Progress', value: taskStats.inProgress },
                    { name: 'Review', value: taskStats.review },
                    { name: 'Done', value: taskStats.done }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Burndown Chart */}
      {burndownData.length > 0 && (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#111827' }}>
            Sprint Burndown Chart
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={burndownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="ideal" 
                stroke="#e5e7eb" 
                strokeDasharray="5 5" 
                name="Ideal"
              />
              <Line 
                type="monotone" 
                dataKey="remaining" 
                stroke="#6366f1" 
                strokeWidth={3}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      )}
    </Box>
  );
};
