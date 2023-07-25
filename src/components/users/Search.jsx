import React from 'react'
import { IconButton, Paper } from '@mui/material';
import {Search } from '@mui/icons-material';
export const SearchFeild = () => {
    return (
        <div>

            <Paper
                component='form'
                sx={{
                    borderRadius: 20,
                    border: '1px solid #e3e3e3',
                    pl: 2,
                    boxShadow: 2,
                    mr: { sm: 5 },
                }}
            >
                <input

                    className='search-bar bg-white'
                    placeholder='Search...'
                />

                <IconButton type='submite'
                    sx={{ p: '10px', color: '#6D57F6', ml: '100px' }}
                >
                    <Search />
                </IconButton>
            </Paper>
        </div>
    )
}
