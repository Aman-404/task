// User Types
export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
  MANAGER: 'manager',
};

// Task Types
export const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const TaskPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

// API Response Types
export const createApiResponse = (data, message = '', success = true) => ({
  success,
  message,
  data,
  timestamp: new Date().toISOString(),
});

export const createApiError = (message, code = 500) => ({
  success: false,
  message,
  code,
  timestamp: new Date().toISOString(),
});

// Form Validation Schemas (for Yup)
export const loginSchema = {
  email: {
    required: 'Email is required',
    email: 'Enter a valid email address',
  },
  password: {
    required: 'Password is required',
    minLength: 'Password must be at least 6 characters',
  },
};

export const userSchema = {
  name: {
    required: 'Name is required',
    minLength: 'Name must be at least 2 characters',
  },
  email: {
    required: 'Email is required',
    email: 'Enter a valid email address',
  },
  role: {
    required: 'Role is required',
  },
};

export const taskSchema = {
  title: {
    required: 'Title is required',
    minLength: 'Title must be at least 3 characters',
  },
  description: {
    required: 'Description is required',
  },
  priority: {
    required: 'Priority is required',
  },
  assignedTo: {
    required: 'Assignee is required',
  },
  dueDate: {
    required: 'Due date is required',
  },
};

// State Shape Definitions (for Redux)
export const initialAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  theme: 'light',
};

export const initialTaskState = {
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null,
  filters: {
    status: '',
    priority: '',
    assignedTo: '',
    search: '',
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

export const initialUserState = {
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

export const initialProjectState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
};

export const initialSprintState = {
  sprints: [],
  currentSprint: null,
  isLoading: false,
  error: null,
};

// Component Prop Types (for PropTypes validation)
export const userPropType = {
  id: 'string',
  name: 'string',
  email: 'string',
  role: 'string',
  avatar: 'string',
  createdAt: 'string',
  updatedAt: 'string',
};

export const taskPropType = {
  id: 'string',
  title: 'string',
  description: 'string',
  status: 'string',
  priority: 'string',
  assignedTo: 'object',
  createdBy: 'object',
  dueDate: 'string',
  createdAt: 'string',
  updatedAt: 'string',
  project: 'object',
  sprint: 'object',
};

export const projectPropType = {
  id: 'string',
  name: 'string',
  description: 'string',
  status: 'string',
  createdBy: 'object',
  members: 'array',
  createdAt: 'string',
  updatedAt: 'string',
};

export const sprintPropType = {
  id: 'string',
  name: 'string',
  description: 'string',
  startDate: 'string',
  endDate: 'string',
  status: 'string',
  project: 'object',
  tasks: 'array',
  createdAt: 'string',
  updatedAt: 'string',
};
