import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
    AccessTimeFilled as InProcessIcon,
    HourglassEmpty as PendingIcon,
    CheckCircle as CompletedIcon
} from '@mui/icons-material';
import { Layout } from './Layout';
import { Lists } from './List';

const statusCards = [
    {
        title: 'In Process',
        icon: <InProcessIcon sx={{ fontSize: 40, color: '#a16207' }} />,
        backgroundColor: '#f3eca7'
    },
    {
        title: 'Pending',
        icon: <PendingIcon sx={{ fontSize: 40, color: '#f44343' }} />,
        backgroundColor: '#f4c2bf'
    },
    {
        title: 'Completed',
        icon: <CompletedIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
        backgroundColor: '#d7f7c3'
    }
];

export const Dashboard = () => {
    const { tasks } = useSelector(state => state.tasks);

    const getTaskCountByStatus = (status) => {
        return tasks.filter(task => task.status === status).length;
    };

    return (
        <Layout>
            <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    {statusCards.map(card => (
                        <Grid item xs={12} sm={6} md={4} key={card.title}>
                            <Paper
                                elevation={3}
                                sx={{
                                    p: 3,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: card.backgroundColor,
                                    borderRadius: 3
                                }}
                            >
                                <Box>
                                    <Typography variant="h6" color="text.secondary">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                        {getTaskCountByStatus(card.title)}
                                    </Typography>
                                </Box>
                                {card.icon}
                            </Paper>
                        </Grid>
                    ))}
                    <Grid item xs={12}>
                        <Lists />
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};