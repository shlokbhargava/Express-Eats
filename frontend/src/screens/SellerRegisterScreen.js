import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { registerSeller } from '../actions/sellerActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const SellerRegisterScreen = ({ history }) => {

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState()
    const [minOrderValue, setMinOrderValue] = useState(0)
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [onlinePayment, setOnlinePayment] = useState(false)
    const [cod, setCod] = useState(false)
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const isSeller = true
    const [message, setMessage] = useState(null)

    const sellerRegister = useSelector((state) => state.sellerRegister)
    const { loading, success, error } = sellerRegister

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo) {
            history.push('/')
        }

        if (success) {
            localStorage.setItem('message', 'You have registered successfully. Just login to access your dashboard')
            history.push('/login')
        }
    }, [history, userInfo, success])

    const registerHandler = (e) => {
        e.preventDefault()

        if (contact.length < 10 || contact.length > 10) {
            setMessage('Contact number should be of 10 digits')
        } else if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(registerSeller(name, email, contact, minOrderValue, state, country, onlinePayment, cod, password, isSeller))
        }
    }

    return (
        <FormContainer>
            <h2 className='text-center mt-2 mb-3'>SELLER &nbsp;REGISTER</h2>
            { message && <Message variant='danger'>{message}</Message> }
            { loading && <Loader /> }
            { error && <Message variant='danger'>{error}</Message> }
            <Form onSubmit={registerHandler}>
                <h6>Restaurant Details: </h6>
                <Form.Group className='mb-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group className='mb-2' as={Col}>
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type='number' value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact" required />
                    </Form.Group>
                    <Form.Group className='mb-2' as={Col}>
                        <Form.Label>Min Order Value</Form.Label>
                        <Form.Control type="number" value={minOrderValue} onChange={(e) => setMinOrderValue(e.target.value)} placeholder="Min Order Value" required />
                    </Form.Group>
                </Row>

                <h6>Address: </h6>
                <Row className="mb-3">
                    <Form.Group className='mb-2' as={Col}>
                        <Form.Label>State</Form.Label>
                        <Form.Control type='text' value={state} onChange={(e) => setState(e.target.value)} placeholder="State" required />
                    </Form.Group>
                    <Form.Group className='mb-2' as={Col}>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" required />
                    </Form.Group>
                </Row>

                <h6>Payment Method: </h6>
                <Row className="mb-1">
                    <Form.Group className='mb-2' as={Col} id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Online Payment" checked={onlinePayment} onChange={(e) => setOnlinePayment(e.target.checked)} />
                    </Form.Group>
                    <Form.Group className='mb-2' as={Col} id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Cash On Delivery" checked={cod} onChange={(e) => setCod(e.target.checked)} />
                    </Form.Group>
                </Row>

                <Form.Group className='mb-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
                </Form.Group>

                <Button className='btn btn-dark mb-4' type='submit'>
                    { loading ? 'Loading…' : 'Register' }
                </Button>
            </Form>
        </FormContainer>
    )
}

export default SellerRegisterScreen
