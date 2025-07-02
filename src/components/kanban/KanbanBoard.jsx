import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Paper, Typography, Chip, Avatar, IconButton } from '@mui/material';
import { Add, MoreVert } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { updateTaskStatus, reorderTasks } from '../../store/slices/taskSlice';
import { KanbanCard } from './KanbanCard';

const columns = [
  { id: 'todo', title: 'To Do', color: '#ef4444' },
  { id: 'in-progress', title: 'In Progress', color: '#f59e0b' },
  { id: 'review', title: 'Review', color: '#8b5cf6' },
  { id: 'done', title: 'Done', color: '#10b981' }
];

export const KanbanBoard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.tasks);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId !== destination.droppableId) {
      // Moving between columns
      dispatch(updateTaskStatus({
        id: result.draggableId,
        status: destination.droppableId
      }));
    }

    dispatch(reorderTasks({
      sourceIndex: source.index,
      destinationIndex: destination.index,
      sourceStatus: source.droppableId,
      destinationStatus: destination.droppableId
    }));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getColumnStats = (status) => {
    const columnTasks = getTasksByStatus(status);
    const totalPoints = columnTasks.reduce((sum, task) => sum + (task.storyPoints || 0), 0);
    return { count: columnTasks.length, points: totalPoints };
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, height: '100vh', overflow: 'hidden' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#1f2937' }}>
        Kanban Board
      </Typography>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)'
          },
          gap: { xs: 2, md: 3 },
          height: 'calc(100vh - 150px)',
          overflow: 'auto'
        }}>
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            const stats = getColumnStats(column.id);
            
            return (
              <Paper
                key={column.id}
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: '#ffffff',
                  border: `2px solid ${column.color}20`,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                {/* Column Header */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: {
                    xs: 'flex-start',
                    sm: 'center'
                  }, 
                  justifyContent: 'space-between',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row'
                  },
                  mb: 2,
                  pb: 2,
                  borderBottom: `2px solid ${column.color}20`
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: { xs: 1, sm: 2 },
                    flexWrap: 'wrap'
                  }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        backgroundColor: column.color
                      }}
                    />
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: '#374151',
                        fontSize: { xs: '1rem', sm: '1.25rem' }
                      }}
                    >
                      {column.title}
                    </Typography>
                    <Chip 
                      label={stats.count} 
                      size="small" 
                      sx={{ 
                        backgroundColor: `${column.color}20`,
                        color: column.color,
                        fontWeight: 600
                      }} 
                    />
                  </Box>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    mt: { xs: 1, sm: 0 }
                  }}>
                    <Typography variant="caption" sx={{ color: '#6b7280' }}>
                      {stats.points} pts
                    </Typography>
                    <IconButton size="small">
                      <Add fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <MoreVert fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                {/* Droppable Area */}
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{
                        flex: 1,
                        minHeight: 200,
                        borderRadius: 2,
                        backgroundColor: snapshot.isDraggingOver ? `${column.color}08` : 'transparent',
                        transition: 'background-color 0.2s ease',
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                          width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                          backgroundColor: '#f1f5f9',
                          borderRadius: '3px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: column.color,
                          borderRadius: '3px',
                        },
                      }}
                    >
                      <AnimatePresence>
                        {columnTasks.map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <motion.div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                  ...provided.draggableProps.style,
                                  marginBottom: 12
                                }}
                              >
                                <KanbanCard 
                                  task={task} 
                                  isDragging={snapshot.isDragging}
                                  columnColor={column.color}
                                />
                              </motion.div>
                            )}
                          </Draggable>
                        ))}
                      </AnimatePresence>
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            );
          })}
        </Box>
      </DragDropContext>
    </Box>
  );
};
