import React, { useState } from 'react';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { Base } from '../../Base/Base';
import { Sidebar } from './Sidebar';


const FormField = ({ controlId, label, type, name, placeholder, value, onChange }) => {
  return (
    <Form.Group controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} />
    </Form.Group>
  );
};

export const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    //console.log(formData);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!name.trim()) {
      return 'Please enter your name.';
    } else if (!email.trim()) {
      return 'Please enter your email address.';
    } else if (!password) {
      return 'Please enter a password.';
    } else if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <>
      <Base>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col sm={10} >
            <Card className="shadow-lg rounded-lg p-3 mt-3 ml-4 custom-card">
              <h1 className="custom-heading mb-3">Create New User</h1>
              <Card.Body>
                {error ? <Alert variant="danger">{error}</Alert> : null}
                <Form onSubmit={handleSubmit}>
                  <FormField
                    controlId="formName"
                   
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <FormField
                    controlId="formEmail"
                  
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <FormField
                    controlId="formPassword"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <FormField
                    controlId="formConfirmPassword"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />

                  <Button variant="primary" type="submit" className="mt-3 custom-button float-end">
                    Create
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Base>
    </>
  );
};
