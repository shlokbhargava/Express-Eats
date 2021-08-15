import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      setValidated(true);
    };

    return (
        <Container className='mt-5'>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={5}>
                    <h2 className='text-center mt-2 mb-3'>REGISTER</h2>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label>Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter Your Name" />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please Enter Your Name.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" placeholder="Enter Your Email" />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please Enter Your Email.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required type="password" placeholder="Enter Password" />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please Enter Your Password.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom04">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control required type="password" placeholder="Enter Password" />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">Please Enter Your Password.</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button className='btn btn-dark mb-4' type="submit">Register</Button>
                    </Form>
                    <Link className='text-secondary' to='/login'>Already registered..? Login Here</Link>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterScreen
