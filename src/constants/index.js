// API Constants
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  USERS: {
    GET_ALL: '/users',
    GET_BY_ID: '/users/:id',
    CREATE: '/users',
    UPDATE: '/users/:id',
    DELETE: '/users/:id',
  },
  TASKS: {
    GET_ALL: '/tasks',
    GET_BY_ID: '/tasks/:id',
    CREATE: '/tasks',
    UPDATE: '/tasks/:id',
    DELETE: '/tasks/:id',
    UPDATE_STATUS: '/tasks/:id/status',
  },
  PROJECTS: {
    GET_ALL: '/projects',
    GET_BY_ID: '/projects/:id',
    CREATE: '/projects',
    UPDATE: '/projects/:id',
    DELETE: '/projects/:id',
  },
  SPRINTS: {
    GET_ALL: '/sprints',
    GET_BY_ID: '/sprints/:id',
    CREATE: '/sprints',
    UPDATE: '/sprints/:id',
    DELETE: '/sprints/:id',
  },
};

// Task Status Constants
export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
};

// Application Constants
export const APP_NAME = 'Task Manager';
export const PAGE_SIZE = 10;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Theme Constants
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Route Constants
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  KANBAN: '/kanban',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    TASKS: '/admin/tasks',
  },
  USERS: {
    PROFILE: '/profile',
    TASKS: '/tasks',
    PENDING: '/tasks/pending',
    IN_PROGRESS: '/tasks/in-progress',
    COMPLETED: '/tasks/completed',
  },
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
  },
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  VALIDATION: 'Please check your input and try again.',
  NOT_FOUND: 'Resource not found.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  TASK_CREATED: 'Task created successfully!',
  TASK_UPDATED: 'Task updated successfully!',
  TASK_DELETED: 'Task deleted successfully!',
  USER_CREATED: 'User created successfully!',
  USER_UPDATED: 'User updated successfully!',
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
};
