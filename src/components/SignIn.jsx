
import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FormField = ({ controlId, label, type, placeholder, value, onChange }) => {
    return (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </Form.Group>
    );
};

export const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form validation
        const validationError =
            !email.trim()
                ? 'Please enter your email address.'
                : !password
                    ? 'Please enter your password.'
                    : '';

        if (validationError) {
            setError(validationError);
            return;
        }

        // Clear any previous errors
        setError('');

        // Perform login logic here
        console.log('Email:', email);
        console.log('Password:', password);

        // Reset form fields
        setEmail('');
        setPassword('');
    };

    return (
        <Container fluid className="login-scr d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgb(244, 254, 253)', minHeight: '100vh'}}>
            <Card className="shadow-lg rounded-lg p-4" style={{ width: '400px', color: 'rgb(33, 37, 41)' }}>
                <Card.Body>
                    <h1 className="text-center text-primary mb-4">Login</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <FormField
                            controlId="formEmail"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleChange}
                        />
                        <FormField
                            controlId="formPassword"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handleChange}
                        />
                        <Button variant="primary" type="success" className="w-100 mt-3">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};


