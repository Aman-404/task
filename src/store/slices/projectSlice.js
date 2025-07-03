import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  projects: [
    {
      id: 'project1',
      name: 'TaskManager Pro',
      description: 'Advanced task management system with agile features',
      key: 'TMP',
      owner: 'Admin',
      members: ['John Doe', 'Jane Smith', 'Bob Johnson','Aman Upadhyay'],
      status: 'active',
      createdAt: '2024-01-01',
      color: '#6366f1',
      progress: 65
    }
  ],
  currentProject: 'project1',
  loading: false,
  error: null
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action) => {
      const newProject = {
        id: uuidv4(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        status: 'active',
        progress: 0
      };
      state.projects.push(newProject);
    },
    updateProject: (state, action) => {
      const { id, ...updates } = action.payload;
      const projectIndex = state.projects.findIndex(project => project.id === id);
      if (projectIndex !== -1) {
        state.projects[projectIndex] = {
          ...state.projects[projectIndex],
          ...updates
        };
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    addMember: (state, action) => {
      const { projectId, member } = action.payload;
      const project = state.projects.find(p => p.id === projectId);
      if (project && !project.members.includes(member)) {
        project.members.push(member);
      }
    },
    removeMember: (state, action) => {
      const { projectId, member } = action.payload;
      const project = state.projects.find(p => p.id === projectId);
      if (project) {
        project.members = project.members.filter(m => m !== member);
      }
    },
    updateProgress: (state, action) => {
      const { projectId, progress } = action.payload;
      const project = state.projects.find(p => p.id === projectId);
      if (project) {
        project.progress = progress;
      }
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
  addProject,
  updateProject,
  deleteProject,
  setCurrentProject,
  addMember,
  removeMember,
  updateProgress,
  setLoading,
  setError
} = projectSlice.actions;

export default projectSlice.reducer;
