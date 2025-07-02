import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Chip,
  Avatar,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Toolbar,
  Tooltip,
  Menu,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  Badge,
  Stack
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  Edit,
  Delete,
  Block,
  CheckCircle,
  PersonAdd,
  Download,
  Refresh,
  Assignment,
  Work,
  AdminPanelSettings,
  Group,
  Email,
  Phone,
  Schedule
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import {
  setFilters,
  setSorting,
  setPagination,
  deleteUser,
  bulkDeleteUsers,
  updateUserStatus
} from '../../store/slices/userSlice';
import { Base } from '../../Base/Base';

const roleIcons = {
  admin: <AdminPanelSettings />,
  manager: <Work />,
  user: <Group />
};

const roleColors = {
  admin: '#ef4444',
  manager: '#f59e0b',
  user: '#10b981'
};

const statusColors = {
  active: '#10b981',
  inactive: '#ef4444',
  pending: '#f59e0b'
};

export const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { users, filters, sortBy, sortOrder, pagination, loading } = useSelector(state => state.users);
  const { user: currentUser } = useSelector(state => state.auth);
  
  const [selected, setSelected] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [bulkDeleteDialog, setBulkDeleteDialog] = useState(false);
  const [filterDrawer, setFilterDrawer] = useState(false);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        user.department.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply role filter
    if (filters.role !== 'all') {
      filtered = filtered.filter(user => user.role === filters.role);
    }

    // Apply department filter
    if (filters.department !== 'all') {
      filtered = filtered.filter(user => user.department === filters.department);
    }

    // Apply status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(user => user.status === filters.status);
    }

    // Sort users
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (sortBy === 'lastLogin') {
        aValue = new Date(aValue || 0);
        bValue = new Date(bValue || 0);
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [users, filters, sortBy, sortOrder]);

  const paginatedUsers = useMemo(() => {
    const start = pagination.page * pagination.rowsPerPage;
    return filteredUsers.slice(start, start + pagination.rowsPerPage);
  }, [filteredUsers, pagination]);

  const departments = useMemo(() => {
    return [...new Set(users.map(user => user.department))];
  }, [users]);

  const handleSort = (property) => {
    const isAsc = sortBy === property && sortOrder === 'asc';
    dispatch(setSorting({
      sortBy: property,
      sortOrder: isAsc ? 'desc' : 'asc'
    }));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(paginatedUsers.map(user => user.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelectClick = (userId) => {
    const selectedIndex = selected.indexOf(userId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, userId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleEditUser = () => {
    navigate(`/edit-user/${selectedUser.id}`);
    handleMenuClose();
  };

  const handleDeleteUser = () => {
    setDeleteDialog(true);
    handleMenuClose();
  };

  const confirmDelete = () => {
    dispatch(deleteUser(selectedUser.id));
    setDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleBulkDelete = () => {
    setBulkDeleteDialog(true);
  };

  const confirmBulkDelete = () => {
    dispatch(bulkDeleteUsers(selected));
    setSelected([]);
    setBulkDeleteDialog(false);
  };

  const handleStatusChange = (userId, newStatus) => {
    dispatch(updateUserStatus({ id: userId, status: newStatus }));
  };

  const getWorkloadColor = (workload) => {
    if (workload >= 90) return '#ef4444';
    if (workload >= 75) return '#f59e0b';
    if (workload >= 50) return '#10b981';
    return '#6b7280';
  };

  const formatLastLogin = (lastLogin) => {
    if (!lastLogin) return 'Never';
    const date = new Date(lastLogin);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const isSelected = (userId) => selected.indexOf(userId) !== -1;
  const numSelected = selected.length;
  const rowCount = paginatedUsers.length;

  return (
    <Base>
      <Box sx={{ p: 3 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#1f2937' }}>
              User Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={() => navigate('/create')}
              sx={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5b21b6, #7c3aed)',
                }
              }}
            >
              Add User
            </Button>
          </Box>

          {/* Filters and Search */}
          <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
              <TextField
                placeholder="Search users..."
                value={filters.search}
                onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#6b7280' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 300 }}
              />

              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Role</InputLabel>
                <Select
                  value={filters.role}
                  onChange={(e) => dispatch(setFilters({ role: e.target.value }))}
                  label="Role"
                >
                  <MenuItem value="all">All Roles</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 140 }}>
                <InputLabel>Department</InputLabel>
                <Select
                  value={filters.department}
                  onChange={(e) => dispatch(setFilters({ department: e.target.value }))}
                  label="Department"
                >
                  <MenuItem value="all">All Departments</MenuItem>
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
                  label="Status"
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', gap: 1, ml: 'auto' }}>
                <Tooltip title="Refresh">
                  <IconButton onClick={() => window.location.reload()}>
                    <Refresh />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export">
                  <IconButton>
                    <Download />
                  </IconButton>
                </Tooltip>
              </Box>
            </Stack>
          </Paper>

          {/* Bulk Actions Toolbar */}
          <AnimatePresence>
            {numSelected > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <Toolbar
                  sx={{
                    bgcolor: '#6366f120',
                    borderRadius: 2,
                    mb: 2,
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography color="primary" variant="subtitle1">
                    {numSelected} selected
                  </Typography>
                  <Box>
                    <Button
                      startIcon={<Delete />}
                      onClick={handleBulkDelete}
                      color="error"
                      sx={{ mr: 1 }}
                    >
                      Delete Selected
                    </Button>
                  </Box>
                </Toolbar>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Users Table */}
          <Paper elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: '#f8fafc' }}>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'name'}
                        direction={sortBy === 'name' ? sortOrder : 'asc'}
                        onClick={() => handleSort('name')}
                      >
                        User
                      </TableSortLabel>
                    </TableCell>
                    
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'role'}
                        direction={sortBy === 'role' ? sortOrder : 'asc'}
                        onClick={() => handleSort('role')}
                      >
                        Role
                      </TableSortLabel>
                    </TableCell>
                    
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'department'}
                        direction={sortBy === 'department' ? sortOrder : 'asc'}
                        onClick={() => handleSort('department')}
                      >
                        Department
                      </TableSortLabel>
                    </TableCell>
                    
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'status'}
                        direction={sortBy === 'status' ? sortOrder : 'asc'}
                        onClick={() => handleSort('status')}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                    
                    <TableCell>Workload</TableCell>
                    
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'lastLogin'}
                        direction={sortBy === 'lastLogin' ? sortOrder : 'asc'}
                        onClick={() => handleSort('lastLogin')}
                      >
                        Last Login
                      </TableSortLabel>
                    </TableCell>
                    
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {paginatedUsers.map((user) => {
                    const isItemSelected = isSelected(user.id);
                    
                    return (
                      <TableRow
                        key={user.id}
                        hover
                        selected={isItemSelected}
                        sx={{ 
                          '&:hover': { backgroundColor: '#f8fafc' },
                          ...(isItemSelected && { backgroundColor: '#6366f108' })
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={() => handleSelectClick(user.id)}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Badge
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              variant="dot"
                              sx={{
                                '& .MuiBadge-badge': {
                                  backgroundColor: user.status === 'active' ? '#10b981' : '#ef4444',
                                  '&::after': {
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    animation: user.status === 'active' ? 'ripple 1.2s infinite ease-in-out' : 'none',
                                    border: '1px solid currentColor',
                                    content: '""',
                                  },
                                },
                                '@keyframes ripple': {
                                  '0%': {
                                    transform: 'scale(.8)',
                                    opacity: 1,
                                  },
                                  '100%': {
                                    transform: 'scale(2.4)',
                                    opacity: 0,
                                  },
                                },
                              }}
                            >
                              <Avatar
                                sx={{
                                  backgroundColor: roleColors[user.role],
                                  width: 40,
                                  height: 40
                                }}
                              >
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </Avatar>
                            </Badge>
                            <Box>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {user.name}
                              </Typography>
                              <Typography variant="caption" sx={{ color: '#6b7280' }}>
                                {user.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Chip
                            icon={roleIcons[user.role]}
                            label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            size="small"
                            sx={{
                              backgroundColor: `${roleColors[user.role]}20`,
                              color: roleColors[user.role],
                              fontWeight: 600
                            }}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Typography variant="body2">
                            {user.department}
                          </Typography>
                        </TableCell>
                        
                        <TableCell>
                          <Chip
                            label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            size="small"
                            sx={{
                              backgroundColor: `${statusColors[user.status]}20`,
                              color: statusColors[user.status],
                              fontWeight: 600
                            }}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={user.workload}
                              sx={{
                                width: 60,
                                height: 6,
                                borderRadius: 3,
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: getWorkloadColor(user.workload),
                                  borderRadius: 3
                                }
                              }}
                            />
                            <Typography variant="caption" sx={{ minWidth: 35 }}>
                              {user.workload}%
                            </Typography>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Typography variant="caption" sx={{ color: '#6b7280' }}>
                            {formatLastLogin(user.lastLogin)}
                          </Typography>
                        </TableCell>
                        
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuClick(e, user)}
                          >
                            <MoreVert />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={filteredUsers.length}
              rowsPerPage={pagination.rowsPerPage}
              page={pagination.page}
              onPageChange={(event, newPage) => {
                dispatch(setPagination({ page: newPage }));
              }}
              onRowsPerPageChange={(event) => {
                dispatch(setPagination({
                  rowsPerPage: parseInt(event.target.value, 10),
                  page: 0
                }));
              }}
            />
          </Paper>
        </motion.div>

        {/* Context Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditUser}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit User</ListItemText>
          </MenuItem>
          
          <MenuItem onClick={() => {
            handleStatusChange(selectedUser?.id, selectedUser?.status === 'active' ? 'inactive' : 'active');
            handleMenuClose();
          }}>
            <ListItemIcon>
              {selectedUser?.status === 'active' ? <Block fontSize="small" /> : <CheckCircle fontSize="small" />}
            </ListItemIcon>
            <ListItemText>
              {selectedUser?.status === 'active' ? 'Deactivate' : 'Activate'}
            </ListItemText>
          </MenuItem>
          
          <MenuItem onClick={handleDeleteUser} sx={{ color: 'error.main' }}>
            <ListItemIcon>
              <Delete fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Delete User</ListItemText>
          </MenuItem>
        </Menu>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
          <DialogTitle>Delete User</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Bulk Delete Confirmation Dialog */}
        <Dialog open={bulkDeleteDialog} onClose={() => setBulkDeleteDialog(false)}>
          <DialogTitle>Delete Multiple Users</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete {selected.length} users? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setBulkDeleteDialog(false)}>Cancel</Button>
            <Button onClick={confirmBulkDelete} color="error" variant="contained">
              Delete All
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Base>
  );
};
