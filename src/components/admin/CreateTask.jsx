import React, { useState } from 'react';
import { Base } from '../../Base/Base';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Chip from '@mui/material/Chip';
import {AlignItemsList} from '../admin/AlignItemsList';

export const CreateTask = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignTo, setSelectedAssignTo] = useState('');

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAssignToSelect = (value) => {
    setSelectedAssignTo(value);
    handleCloseModal();
  };

  return (
    <Base>
      <Row>
        <Col sm={1}></Col>
        <Col sm={10}>
          <Card className='mt-2'>
            <Card.Header style={{backgroundColor:'white'}}>
              <h3 className='text-center' style={{ color: '#6D57F6' }}>Create New Task..</h3>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <Form>
                  <Form.Control placeholder="Title.." />
                  <br />
                  <div style={{ position: 'relative' }}>
                    <Form.Control
                      placeholder="Assign To......"
                      value={selectedAssignTo}
                      readOnly
                      onClick={handleShowModal}
                    />
                    {selectedAssignTo && (
                      <Chip
                        label={selectedAssignTo}
                        onDelete={() => setSelectedAssignTo('')}
                        style={{ position: 'absolute', top: 5, right: 5, cursor: 'pointer' }}
                      />
                    )}
                  </div>
                  <br />
                  <Form.Group className="mb-3" controlId="floatingTextarea2">
                    <Form.Control as="textarea" placeholder="Leave a comment here" style={{ height: '100px' }} />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Multiple files input example</Form.Label>
                    <Form.Control type="file" multiple />
                  </Form.Group>
                  <Button  type="submit" className='float-end custom-button'>
                    Submit
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={1}></Col>
      </Row>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign To</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Use the AlignItemsList component here */}
          <AlignItemsList handleAssignToSelect={handleAssignToSelect} />
        </Modal.Body>
      </Modal>
    </Base>
  );
};


