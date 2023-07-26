import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Base } from '../../../Base/Base'
import { Button, Card } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Send } from '@mui/icons-material';

export const TaskDetail = () => {
  
    return (
        <Base>
            <Row className='p-1 g-0 ' style={{ paddingRight: -1 }}>
                <Col sm={9}>
                    {/* <div className=' m-1'> */}
                    <Card className='shadow-sm'>
                        <Card.Body>
                            <Card.Title className='fw-bolder'>FloatingLabel controlId floatingTextarea</Card.Title>
                            <br />
                            <FloatingLabel controlId="floatingTextarea2" >
                                {/* <Form.Label className='fw-medium'>Description</Form.Label> */}
                                <br />
                                <p className='m-2 fs-5 fw-semibold'>Description</p>
                                <Form
                                    as="textarea"
                                    placeholder='Add a descriptions....'
                                    className='text-area'
                                    style={{ height: '150px' }}
                                    onInput={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                    }}
                                />
                            </FloatingLabel>
                            <br />
                            {/* Attachments */}
                            <p className='m-2 fs-5 fw-semibold'>Attachments</p>
                            <br />
                            <Form.Group controlId="formFileMultiple" className="mb-3">
                                <Form.Control type="file" multiple />
                            </Form.Group>
                            <br />
                            {/* Attachments */}
                        </Card.Body>
                        <div className='container'>
                            <Button variant="secondary" size="sm">
                                Comments
                            </Button>
                            <br /><br />
                            <Form.Control className='text-area mt-2'
                                style={{ resize: 'none' }}
                                as="textarea" placeholder="Add a comment..."
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                            />
                        </div>
                        <br />
                    </Card>
                    {/* </div> */}
                </Col >
                <Col sm={3}  style={{position:'fixed',right:0}}>
                    <Card>
                        <Card.Body>
                            <p className=' text-secondary fs-8 fw-semibold'>STATUS</p>
                            <Dropdown as={ButtonGroup} data-bs-theme="dark">
                                <Button variant="secondary" className='btn-sm '> To Do</Button>
                                <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />
                                <Dropdown.Menu bg='Dark'>
                                    <Dropdown.Item href="#/action-1">In Process</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Completed</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <div className='mt-3'>
                                <p className='m-2 fs-7 fw-medium'>Start Date :-</p>
                                <br />
                                <Stack sx={{ width: '120px' }}><input style={{ border: 'none', backgroundColor: '#f0efef' }} type='date'  /></Stack>
                            </div>
                            <div className='mt-3'>
                                <p className='m-2 fs-7 fw-bolder'>Assignee.</p>
                                <Stack direction="row" spacing={2}>
                                    <Avatar className='avrt' sx={{ bgcolor: deepPurple[400] }}>N</Avatar>
                                    <p className='text-secondary fs-9 fw-semibold' style={{ margin: '3px', marginLeft: '30px' }}>Unknown</p>
                                </Stack>
                            </div>
                            <br />
                            <div className='mt-3'>
                                <p className='m-2 fs-7 fw-bolder'>Reporter</p>
                                <Stack direction="row" spacing={2}>
                                    <Avatar className='avrt' sx={{ bgcolor: deepOrange[400] }}>N</Avatar>
                                    <p className='text-secondary fs-9 fw-semibold' style={{ margin: '3px', marginLeft: '30px' }}>Unknown</p>
                                </Stack>
                            </div>
                            <br />
                            <div className='mt-3'>
                                <p className='m-2 fs-7 fw-medium'>End Date :-</p>
                                <br />
                                <Stack sx={{ width: '120px' }}><input style={{ border: 'none', backgroundColor: '#f0efef' }} type='date' /></Stack>
                            </div>
                            <br />
                        </Card.Body>
                    </Card>

                </Col>
            </Row>


        </Base>
    );
}
