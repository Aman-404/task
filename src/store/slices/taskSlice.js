import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  tasks: [
    {
      id: '1',
      title: 'User Authentication System',
      description: 'Implement secure user login and registration',
      status: 'todo',
      priority: 'high',
      assignee: 'John Doe',
      reporter: 'Admin',
      storyPoints: 8,
      sprintId: 'sprint1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: '2024-01-15',
      tags: ['backend', 'security'],
      type: 'story'
    },
    {
      id: '2',
      title: 'Dashboard Analytics',
      description: 'Create comprehensive dashboard with charts and metrics',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Jane Smith',
      reporter: 'Admin',
      storyPoints: 5,
      sprintId: 'sprint1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: '2024-01-20',
      tags: ['frontend', 'analytics'],
      type: 'story'
    },
    {
      id: '3',
      title: 'Fix login validation bug',
      description: 'Password validation not working correctly',
      status: 'done',
      priority: 'high',
      assignee: 'Bob Johnson',
      reporter: 'John Doe',
      storyPoints: 2,
      sprintId: 'sprint1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: '2024-01-10',
      tags: ['bug', 'frontend'],
      type: 'bug'
    }
  ],
  loading: false,
  error: null,
  filters: {
    status: 'all',
    priority: 'all',
    assignee: 'all',
    sprint: 'all'
  }
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: uuidv4(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      state.tasks.push(newTask);
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = {
          ...state.tasks[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find(task => task.id === id);
      if (task) {
        task.status = status;
        task.updatedAt = new Date().toISOString();
      }
    },
    reorderTasks: (state, action) => {
      const { sourceIndex, destinationIndex, sourceStatus, destinationStatus } = action.payload;
      
      // Get tasks by status
      const sourceTasks = state.tasks.filter(task => task.status === sourceStatus);
      const destinationTasks = state.tasks.filter(task => task.status === destinationStatus);
      
      if (sourceStatus === destinationStatus) {
        // Reordering within the same column
        const [movedTask] = sourceTasks.splice(sourceIndex, 1);
        sourceTasks.splice(destinationIndex, 0, movedTask);
      } else {
        // Moving between columns
        const [movedTask] = sourceTasks.splice(sourceIndex, 1);
        movedTask.status = destinationStatus;
        movedTask.updatedAt = new Date().toISOString();
        destinationTasks.splice(destinationIndex, 0, movedTask);
      }
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  addTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  reorderTasks,
  setFilters,
  setLoading,
  setError
} = taskSlice.actions;

export default taskSlice.reducer;
