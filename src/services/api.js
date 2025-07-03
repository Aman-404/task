import { API_BASE_URL, API_ENDPOINTS } from '../constants';
import { getAuthToken, removeAuthToken } from '../utils';

// Base API configuration
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

// API Client class
class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // Private method to get headers with auth token
  getHeaders(customHeaders = {}) {
    const token = getAuthToken();
    const headers = { ...DEFAULT_HEADERS, ...customHeaders };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  // Private method to handle API responses
  async handleResponse(response) {
    const contentType = response.headers.get('content-type');
    
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // Handle unauthorized requests
      if (response.status === 401) {
        removeAuthToken();
        window.location.href = '/login';
      }
      
      const error = new Error(data.message || `HTTP Error: ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  }

  // Private method to build URL
  buildUrl(endpoint, params = {}) {
    let url = `${this.baseURL}${endpoint}`;
    
    // Replace URL parameters
    Object.keys(params).forEach(key => {
      url = url.replace(`:${key}`, params[key]);
    });
    
    return url;
  }

  // GET request
  async get(endpoint, params = {}, queryParams = {}) {
    const url = this.buildUrl(endpoint, params);
    const searchParams = new URLSearchParams(queryParams);
    const fullUrl = searchParams.toString() ? `${url}?${searchParams}` : url;

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  // POST request
  async post(endpoint, data = {}, params = {}, customHeaders = {}) {
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'POST',
      headers: this.getHeaders(customHeaders),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  // PUT request
  async put(endpoint, data = {}, params = {}, customHeaders = {}) {
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'PUT',
      headers: this.getHeaders(customHeaders),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  // PATCH request
  async patch(endpoint, data = {}, params = {}, customHeaders = {}) {
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'PATCH',
      headers: this.getHeaders(customHeaders),
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  // DELETE request
  async delete(endpoint, params = {}) {
    const url = this.buildUrl(endpoint, params);

    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    return this.handleResponse(response);
  }

  // Upload file
  async upload(endpoint, file, additionalData = {}, params = {}) {
    const url = this.buildUrl(endpoint, params);
    const formData = new FormData();
    
    formData.append('file', file);
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });

    const token = getAuthToken();
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    return this.handleResponse(response);
  }
}

// Create API client instance
const apiClient = new ApiClient();

// Auth API
export const authApi = {
  login: (credentials) => apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),
  register: (userData) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData),
  logout: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT),
  refresh: () => apiClient.post(API_ENDPOINTS.AUTH.REFRESH),
};

// Users API
export const usersApi = {
  getAll: (queryParams = {}) => apiClient.get(API_ENDPOINTS.USERS.GET_ALL, {}, queryParams),
  getById: (id) => apiClient.get(API_ENDPOINTS.USERS.GET_BY_ID, { id }),
  create: (userData) => apiClient.post(API_ENDPOINTS.USERS.CREATE, userData),
  update: (id, userData) => apiClient.put(API_ENDPOINTS.USERS.UPDATE, userData, { id }),
  delete: (id) => apiClient.delete(API_ENDPOINTS.USERS.DELETE, { id }),
};

// Tasks API
export const tasksApi = {
  getAll: (queryParams = {}) => apiClient.get(API_ENDPOINTS.TASKS.GET_ALL, {}, queryParams),
  getById: (id) => apiClient.get(API_ENDPOINTS.TASKS.GET_BY_ID, { id }),
  create: (taskData) => apiClient.post(API_ENDPOINTS.TASKS.CREATE, taskData),
  update: (id, taskData) => apiClient.put(API_ENDPOINTS.TASKS.UPDATE, taskData, { id }),
  delete: (id) => apiClient.delete(API_ENDPOINTS.TASKS.DELETE, { id }),
  updateStatus: (id, status) => apiClient.patch(API_ENDPOINTS.TASKS.UPDATE_STATUS, { status }, { id }),
};

// Projects API
export const projectsApi = {
  getAll: (queryParams = {}) => apiClient.get(API_ENDPOINTS.PROJECTS.GET_ALL, {}, queryParams),
  getById: (id) => apiClient.get(API_ENDPOINTS.PROJECTS.GET_BY_ID, { id }),
  create: (projectData) => apiClient.post(API_ENDPOINTS.PROJECTS.CREATE, projectData),
  update: (id, projectData) => apiClient.put(API_ENDPOINTS.PROJECTS.UPDATE, projectData, { id }),
  delete: (id) => apiClient.delete(API_ENDPOINTS.PROJECTS.DELETE, { id }),
};

// Sprints API
export const sprintsApi = {
  getAll: (queryParams = {}) => apiClient.get(API_ENDPOINTS.SPRINTS.GET_ALL, {}, queryParams),
  getById: (id) => apiClient.get(API_ENDPOINTS.SPRINTS.GET_BY_ID, { id }),
  create: (sprintData) => apiClient.post(API_ENDPOINTS.SPRINTS.CREATE, sprintData),
  update: (id, sprintData) => apiClient.put(API_ENDPOINTS.SPRINTS.UPDATE, sprintData, { id }),
  delete: (id) => apiClient.delete(API_ENDPOINTS.SPRINTS.DELETE, { id }),
};

// Export the main API client for custom requests
export default apiClient;
