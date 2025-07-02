import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  users: [
    {
      id: 'user1',
      name: 'John Doe',
      email: 'john.doe@agileflow.com',
      role: 'admin',
      department: 'Engineering',
      status: 'active',
      avatar: null,
      lastLogin: '2024-01-15T10:30:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      permissions: ['read', 'write', 'delete', 'admin'],
      projects: ['project1'],
      workload: 85,
      timezone: 'UTC-5'
    },
    {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane.smith@agileflow.com',
      role: 'manager',
      department: 'Product',
      status: 'active',
      avatar: null,
      lastLogin: '2024-01-15T14:20:00Z',
      createdAt: '2024-01-02T00:00:00Z',
      permissions: ['read', 'write', 'manage'],
      projects: ['project1'],
      workload: 72,
      timezone: 'UTC-8'
    },
    {
      id: 'user3',
      name: 'Bob Johnson',
      email: 'bob.johnson@agileflow.com',
      role: 'user',
      department: 'Engineering',
      status: 'active',
      avatar: null,
      lastLogin: '2024-01-14T16:45:00Z',
      createdAt: '2024-01-03T00:00:00Z',
      permissions: ['read', 'write'],
      projects: ['project1'],
      workload: 90,
      timezone: 'UTC-5'
    },
    {
      id: 'user4',
      name: 'Alice Brown',
      email: 'alice.brown@agileflow.com',
      role: 'user',
      department: 'Design',
      status: 'inactive',
      avatar: null,
      lastLogin: '2024-01-10T09:15:00Z',
      createdAt: '2024-01-04T00:00:00Z',
      permissions: ['read', 'write'],
      projects: [],
      workload: 45,
      timezone: 'UTC-2'
    },
    {
      id: 'user5',
      name: 'Charlie Wilson',
      email: 'charlie.wilson@agileflow.com',
      role: 'manager',
      department: 'QA',
      status: 'active',
      avatar: null,
      lastLogin: '2024-01-15T11:30:00Z',
      createdAt: '2024-01-05T00:00:00Z',
      permissions: ['read', 'write', 'manage'],
      projects: ['project1'],
      workload: 68,
      timezone: 'UTC+1'
    }
  ],
  loading: false,
  error: null,
  filters: {
    search: '',
    role: 'all',
    department: 'all',
    status: 'all',
    project: 'all'
  },
  sortBy: 'name',
  sortOrder: 'asc',
  pagination: {
    page: 0,
    rowsPerPage: 10,
    total: 5
  }
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // User CRUD operations
    addUser: (state, action) => {
      const newUser = {
        id: uuidv4(),
        ...action.payload,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        status: 'active',
        workload: 0,
        projects: [],
        permissions: action.payload.role === 'admin' 
          ? ['read', 'write', 'delete', 'admin']
          : action.payload.role === 'manager'
          ? ['read', 'write', 'manage']
          : ['read', 'write']
      };
      state.users.push(newUser);
      state.pagination.total = state.users.length;
    },

    updateUser: (state, action) => {
      const { id, ...updates } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          ...updates
        };
      }
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      state.pagination.total = state.users.length;
    },

    bulkDeleteUsers: (state, action) => {
      state.users = state.users.filter(user => !action.payload.includes(user.id));
      state.pagination.total = state.users.length;
    },

    updateUserStatus: (state, action) => {
      const { id, status } = action.payload;
      const user = state.users.find(user => user.id === id);
      if (user) {
        user.status = status;
      }
    },

    assignUserToProject: (state, action) => {
      const { userId, projectId } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user && !user.projects.includes(projectId)) {
        user.projects.push(projectId);
      }
    },

    removeUserFromProject: (state, action) => {
      const { userId, projectId } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.projects = user.projects.filter(id => id !== projectId);
      }
    },

    updateUserWorkload: (state, action) => {
      const { userId, workload } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.workload = workload;
      }
    },

    // Filtering and sorting
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },

    setSorting: (state, action) => {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },

    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },

    // Loading states
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  addUser,
  updateUser,
  deleteUser,
  bulkDeleteUsers,
  updateUserStatus,
  assignUserToProject,
  removeUserFromProject,
  updateUserWorkload,
  setFilters,
  setSorting,
  setPagination,
  setLoading,
  setError,
  clearError
} = userSlice.actions;

export default userSlice.reducer;
