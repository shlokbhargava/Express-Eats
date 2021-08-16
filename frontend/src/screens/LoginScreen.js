import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
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
        <FormContainer>
            <h2 className='text-center mt-2 mb-3'>LOGIN</h2>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
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
                </Row>
                <Button className='btn btn-dark btn-block mb-4' type="submit">Login</Button>
            </Form>
            <Link className='text-secondary' to='/register'>New User..? Register Here</Link>
        </FormContainer>
    );
}

export default LoginScreen
