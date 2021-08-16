import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message'
import Loader from '../components/Loader'


const RegisterScreen = () => {
    const dispatch = useDispatch()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, success, userInfo, error } = userRegister

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (success) {
            setName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }
    }, [success])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h2 className='text-center mt-2 mb-3'>REGISTER</h2>
            { message && <Message variant='danger'>{message}</Message> }
            { loading && <Loader /> }
            { success && <Message variant='success'>{'You have registered successfully'}</Message> }
            { error && <Message variant='danger'>{error}</Message> }
            <Form onSubmit={submitHandler}>
                <Row className="mb-3">
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Your Name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validationCustom02">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Your Email" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validationCustom03">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="validationCustom04">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" required />
                    </Form.Group>
                </Row>
                <Button className='btn btn-dark mb-4' type='submit'>
                    { loading ? 'Loading…' : 'Register' }
                </Button>
            </Form>
            <Link className='text-secondary' to='/login'>Already registered..? Login Here</Link>
        </FormContainer>
    )
}

export default RegisterScreen
