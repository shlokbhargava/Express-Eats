import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { restaurant } from '../actions/restaurantActions';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

const LoginScreen = ({ history }) => {
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, userInfo, error } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isSeller) {
            history.push('/dashboard')
        }

        if (userInfo && !userInfo.isSeller) {
            history.push('/')
        }
    }, [userInfo, history])

    const loginHandler = (e) => {
        e.preventDefault()

        dispatch(login(email, password))
        dispatch(restaurant(email))
    }
  
    return (
        <FormContainer>
            <h2 className='text-center mt-2 mb-3'>LOGIN</h2>
            { loading && <Loader /> }
            { error && <Message variant='danger'>{error}</Message> }
            { localStorage.getItem('message') &&
                <>
                    <Message variant='sucesss'>{localStorage.getItem('message')}</Message>
                    {localStorage.removeItem('message')}    
                </>
            }
            <Form onSubmit={loginHandler}>
                <Row className="mb-3">
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Your Email" required />
                    </Form.Group>
                    <Form.Group className="mb-3">
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
