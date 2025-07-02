import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  sprints: [
    {
      id: 'sprint1',
      name: 'Sprint 1 - Authentication & Core Features',
      startDate: '2024-01-01',
      endDate: '2024-01-14',
      status: 'active',
      goal: 'Implement user authentication and basic task management',
      capacity: 40,
      velocity: 0,
      burndownData: [
        { day: 1, remaining: 15, ideal: 15 },
        { day: 2, remaining: 14, ideal: 14 },
        { day: 3, remaining: 12, ideal: 13 },
        { day: 4, remaining: 11, ideal: 12 },
        { day: 5, remaining: 9, ideal: 11 },
        { day: 6, remaining: 8, ideal: 10 },
        { day: 7, remaining: 6, ideal: 9 }
      ]
    },
    {
      id: 'sprint2',
      name: 'Sprint 2 - Advanced Features',
      startDate: '2024-01-15',
      endDate: '2024-01-28',
      status: 'planned',
      goal: 'Add advanced agile features and reporting',
      capacity: 45,
      velocity: 0,
      burndownData: []
    }
  ],
  activeSprint: 'sprint1',
  loading: false,
  error: null
};

const sprintSlice = createSlice({
  name: 'sprints',
  initialState,
  reducers: {
    addSprint: (state, action) => {
      const newSprint = {
        id: uuidv4(),
        ...action.payload,
        status: 'planned',
        velocity: 0,
        burndownData: []
      };
      state.sprints.push(newSprint);
    },
    updateSprint: (state, action) => {
      const { id, ...updates } = action.payload;
      const sprintIndex = state.sprints.findIndex(sprint => sprint.id === id);
      if (sprintIndex !== -1) {
        state.sprints[sprintIndex] = {
          ...state.sprints[sprintIndex],
          ...updates
        };
      }
    },
    deleteSprint: (state, action) => {
      state.sprints = state.sprints.filter(sprint => sprint.id !== action.payload);
    },
    startSprint: (state, action) => {
      const sprintId = action.payload;
      const sprint = state.sprints.find(s => s.id === sprintId);
      if (sprint) {
        // End any currently active sprint
        state.sprints.forEach(s => {
          if (s.status === 'active') {
            s.status = 'completed';
          }
        });
        // Start the new sprint
        sprint.status = 'active';
        state.activeSprint = sprintId;
      }
    },
    completeSprint: (state, action) => {
      const sprintId = action.payload;
      const sprint = state.sprints.find(s => s.id === sprintId);
      if (sprint) {
        sprint.status = 'completed';
        if (state.activeSprint === sprintId) {
          state.activeSprint = null;
        }
      }
    },
    updateBurndownData: (state, action) => {
      const { sprintId, burndownData } = action.payload;
      const sprint = state.sprints.find(s => s.id === sprintId);
      if (sprint) {
        sprint.burndownData = burndownData;
      }
    },
    setActiveSprint: (state, action) => {
      state.activeSprint = action.payload;
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
  addSprint,
  updateSprint,
  deleteSprint,
  startSprint,
  completeSprint,
  updateBurndownData,
  setActiveSprint,
  setLoading,
  setError
} = sprintSlice.actions;

export default sprintSlice.reducer;
