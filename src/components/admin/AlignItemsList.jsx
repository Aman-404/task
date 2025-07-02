import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    List,
    ListItemButton,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    TextField,
    InputAdornment,
    Box
} from '@mui/material';
import { Search } from '@mui/icons-material';

export const AlignItemsList = ({ handleAssignToSelect }) => {
    const { users } = useSelector(state => state.users);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredUsers = useMemo(() => {
        if (!searchQuery) {
            return users;
        }
        return users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [users, searchQuery]);

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                sx={{ p: 2 }}
            />
            <List sx={{ overflow: 'auto', maxHeight: 300 }}>
                {filteredUsers.map(user => (
                    <ListItemButton key={user.id} onClick={() => handleAssignToSelect(user)}>
                        <ListItemAvatar>
                            <Avatar
                                sx={{ bgcolor: '#6366f1' }}
                                alt={user.name}
                                src={user.avatar}
                            >
                                {user.name.charAt(0)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.name}
                            secondary={user.email}
                        />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};


