import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { SearchFeild } from './Search';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <Navbar expand="lg" data-bs-theme="dark" className="nav-color">
            <Container style={{ justifyContent: 'space-around' }}>
                <Navbar.Brand href="#home" className=' font_700'>DoiT !</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Row>

                    <Col xs={4}>

                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to='/process' >Home</Nav.Link>
                                <NavDropdown title="State" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to='/process'>In Process..</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to='/pannding'>
                                        Pannding...
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to='/completed'>
                                        Completad...
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Row>
                <Row>
                    <Col >
                        <form className="float-end">
                            <SearchFeild />
                        </form>
                    </Col>
                </Row>
                <Row className='custom-icon' style={{backgroundColor:'red'}}>
                    <Col  >
                        <h1 style={{textAlign:'center'}} >A</h1>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}
