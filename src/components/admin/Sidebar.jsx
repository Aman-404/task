import React from 'react'
import { Link } from 'react-router-dom';                                                                                  
import Nav from 'react-bootstrap/Nav';
export const Sidebar = () => {
    return (
                        <div className="sidebar shadow">
                            <Nav className="flex-column">
                                <Nav.Link as={Link} to="/create" className=' font_700'>Create User</Nav.Link>
                                <hr />
                                <Nav.Link as={Link} to="/inprocess" className=' font_700'>In Process</Nav.Link>
                                <hr />
                                <Nav.Link href="#services" className=' font_700'>Pannding</Nav.Link>
                                <hr />
                                <Nav.Link href="#contact" className=' font_700'>Completed </Nav.Link>
                                <hr />
                                <Nav.Link as={Link} to="/createtask" className=' font_700'>Create Task </Nav.Link>
                                <hr />
                            </Nav>
                            
                        </div>
            
    )
}
