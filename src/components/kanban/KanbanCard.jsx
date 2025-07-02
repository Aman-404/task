import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Avatar, 
  IconButton,
  Tooltip
} from '@mui/material';
import { 
  BugReport, 
  Assignment, 
  Flag, 
  Schedule,
  Person,
  MoreVert
} from '@mui/icons-material';

const priorityColors = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444',
  critical: '#7c2d12'
};

const typeIcons = {
  story: <Assignment fontSize="small" />,
  bug: <BugReport fontSize="small" />,
  task: <Schedule fontSize="small" />
};

export const KanbanCard = ({ task, isDragging, columnColor }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card
      elevation={isDragging ? 8 : 2}
      sx={{
        backgroundColor: '#ffffff',
        border: isDragging ? `2px solid ${columnColor}` : '1px solid #e5e7eb',
        borderRadius: 2,
        cursor: 'grab',
        transition: 'all 0.2s ease',
        transform: isDragging ? 'rotate(5deg)' : 'none',
        '&:hover': {
          elevation: 4,
          borderColor: columnColor,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {/* Header with type and priority */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ color: '#6b7280', display: 'flex', alignItems: 'center' }}>
              {typeIcons[task.type] || typeIcons.task}
            </Box>
            <Chip
              size="small"
              label={task.type.toUpperCase()}
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 600,
                backgroundColor: `${columnColor}20`,
                color: columnColor
              }}
            />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Tooltip title={`Priority: ${task.priority}`}>
              <Flag 
                fontSize="small" 
                sx={{ color: priorityColors[task.priority] }}
              />
            </Tooltip>
            <IconButton size="small" sx={{ p: 0.5 }}>
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        /* Task Title */
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontWeight: 600, 
            color: '#111827',
            mb: 1,
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: { xs: 3, sm: 2 },
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontSize: { xs: '0.875rem', sm: '0.9375rem' }
          }}
        >
          {task.title}
        </Typography>

        {/* Description */}
        {task.description && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: '#6b7280',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mb: 2
            }}
          >
            {task.description}
          </Typography>
        )}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {task.tags.slice(0, 2).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                sx={{
                  height: 18,
                  fontSize: '0.6rem',
                  borderColor: '#d1d5db',
                  color: '#6b7280'
                }}
              />
            ))}
            {task.tags.length > 2 && (
              <Chip
                label={`+${task.tags.length - 2}`}
                size="small"
                variant="outlined"
                sx={{
                  height: 18,
                  fontSize: '0.6rem',
                  borderColor: '#d1d5db',
                  color: '#6b7280'
                }}
              />
            )}
          </Box>
        )}

        {/* Footer with assignee, story points, and due date */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title={task.assignee}>
              <Avatar 
                sx={{ 
                  width: 24, 
                  height: 24,
                  fontSize: '0.7rem',
                  backgroundColor: columnColor
                }}
              >
                {getInitials(task.assignee)}
              </Avatar>
            </Tooltip>
            
            {task.storyPoints && (
              <Chip
                label={`${task.storyPoints} SP`}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  backgroundColor: '#f3f4f6',
                  color: '#374151'
                }}
              />
            )}
          </Box>

          {task.dueDate && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: new Date(task.dueDate) < new Date() ? '#ef4444' : '#6b7280',
                fontWeight: 500,
                fontSize: '0.7rem'
              }}
            >
              {formatDate(task.dueDate)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
