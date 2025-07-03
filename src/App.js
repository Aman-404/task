import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { SignIn } from './components/SignIn';
import { Dashboard } from './components/dashboard/Dashboard';
import { KanbanBoard } from './components/kanban/KanbanBoard';
import { Home } from './components/admin/Home';
import { CreateUser } from './components/admin/CreateUser';
import { CreateTask } from './components/admin/CreateTask';
import { UserList } from './components/admin/UserList';
import { Dashboard as AdminDashboard } from './components/admin/Dashboard';
import { InProcess } from './components/admin/taskDetails/InProcess';
import { Main } from './components/users/Main';
import { Pannding } from './components/users/Pannding';
import { Completed } from './components/users/Completed';
import { Process } from './components/users/Process';
import { TaskDetail } from './components/admin/taskDetails/TaskDetail';
import { Base } from './Base/Base';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const { theme } = useSelector(state => state.auth);

  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: '#6366f1',
      },
      secondary: {
        main: '#f59e0b',
      },
      background: {
        default: theme === 'dark' ? '#111827' : '#f9fafb',
        paper: theme === 'dark' ? '#1f2937' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 600,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Base>
                <Dashboard />
              </Base>
            </ProtectedRoute>
          } />
          <Route path="/kanban" element={
            <ProtectedRoute>
              <Base>
                <KanbanBoard />
              </Base>
            </ProtectedRoute>
          } />
          <Route path="home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          } />
          <Route path="create" element={
            <ProtectedRoute>
              <CreateUser />
            </ProtectedRoute>
          } />
          <Route path="createtask" element={
            <ProtectedRoute>
              <CreateTask />
            </ProtectedRoute>
          } />
          <Route path="inprocess" element={
            <ProtectedRoute>
              <InProcess />
            </ProtectedRoute>
          } />
          <Route path="main" element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          } />
          <Route path="pannding" element={
            <ProtectedRoute>
              <Pannding />
            </ProtectedRoute>
          } />
          <Route path="completed" element={
            <ProtectedRoute>
              <Completed />
            </ProtectedRoute>
          } />
          <Route path="process" element={
            <ProtectedRoute>
              <Process />
            </ProtectedRoute>
          } />
          <Route path="taskdetails" element={
            <ProtectedRoute>
              <TaskDetail />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
