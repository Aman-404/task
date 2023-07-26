import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { IconButton, Paper } from '@mui/material';
import { AccountCircle, Search } from '@mui/icons-material';
export const NavBar = () => {
    return (
        <Navbar sticky="top"  className='nav-color font_600 shadow-sm' bg='' data-bs-theme="dark">
            <Container className='justify-content-start'>
                <Row className='w_500'>
                    <Col sm={3}>
                    <Nav.Link as={Link} to="/" className=' font_700'>DoiT !</Nav.Link>
                    </Col>
                    <Col sm={9}>
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
                                sx={{ p: '10px', color: '#6D57F6' ,ml:'100px'}}
                            >
                                <Search />
                            </IconButton>
                        </Paper>
                    </Col>

                </Row>
                <Row className='ms-auto p-2'>
                    <Col sm={1}>
                        <IconButton
                        className='fontSize '
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle  />
                        </IconButton>
                    </Col>
                </Row>

            </Container>
        </Navbar>
    )
}
