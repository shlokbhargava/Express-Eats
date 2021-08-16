import React, { useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginScreen = () => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, success, userInfo, error } = userLogin

    const loginHandler = (e) => {
        e.preventDefault()

        dispatch(login(email, password))
    }
  
    return (
        <FormContainer>
            <h2 className='text-center mt-2 mb-3'>LOGIN</h2>
            { loading && <Loader /> }
            { success && <Message variant='success'>{'You have logged in'}</Message> }
            { error && <Message variant='danger'>{error}</Message> }
            <Form onSubmit={loginHandler}>
                <Row className="mb-3">
                    <Form.Group className="mb-3" controlId="validationCustom02">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Your Email" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validationCustom03">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" required />
                    </Form.Group>
                </Row>
                <Button className='btn btn-dark mb-4' type='submit'>
                    { loading ? 'Loading…' : 'Login' }
                </Button>
            </Form>
            <Link className='text-secondary' to='/register'>New User..? Register Here</Link>
        </FormContainer>
    );
}

export default LoginScreen
