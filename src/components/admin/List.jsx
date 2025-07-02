import React from 'react';
import { useSelector } from 'react-redux';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip,
    Avatar,
    Box
} from '@mui/material';

const priorityColors = {
    High: 'error',
    Medium: 'warning',
    Low: 'success'
};

export function Lists() {
    const { tasks } = useSelector(state => state.tasks);
    const { users } = useSelector(state => state.users);

    const getAssignee = (assigneeId) => {
        return users.find(user => user.id === assigneeId);
    };

    return (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Assignee</TableCell>
                        <TableCell>Due Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.slice(0, 5).map(task => (
                        <TableRow key={task.id}>
                            <TableCell>
                                <Typography variant="subtitle2">{task.title}</Typography>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={task.priority}
                                    color={priorityColors[task.priority]}
                                    size="small"
                                />
                            </TableCell>
                            <TableCell>
                                {task.assignee ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar
                                            sx={{ width: 24, height: 24, mr: 1 }}
                                            alt={getAssignee(task.assignee)?.name}
                                            src={getAssignee(task.assignee)?.avatar}
                                        />
                                        <Typography variant="body2">
                                            {getAssignee(task.assignee)?.name}
                                        </Typography>
                                    </Box>
                                ) : (
                                    <Typography variant="body2" color="text.secondary">
                                        Unassigned
                                    </Typography>
                                )}
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
