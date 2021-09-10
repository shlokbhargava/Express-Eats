import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout, profile } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Message'


const ProfileScreen = ({ history }) => {
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading, success, error } = userUpdate

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else if (success) {
            localStorage.setItem('message', 'You have updated your profile. Just login in again.')
            dispatch(logout())
        } else {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo, history, dispatch, success])

    const updateProfileHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(profile({ 
                id: userInfo._id,
                name,
                email,
                password
            })) 
        }
    }

    return (
        <>
            <Breadcrumb className='mt-2'>
                { userInfo && !userInfo.isSeller ? 
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                :
                    <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
                }
                <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>
            <FormContainer>
                <Form onSubmit={updateProfileHandler}>
                    <>
                        <h2 className='text-center mt-2 mb-3'>PROFILE</h2>
                        { loading && <Loader /> }
                        { success && <Message variant='success'>{'Profile updated successfully'}</Message> }
                        { error && <Message variant='danger'>{error}</Message> }
                        { message && <Message variant='danger'>{message}</Message> }
                        <Row className="mb-3">
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Your Name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label>Email</Form.Label>
                                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Your Email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label>Password</Form.Label>
                                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Your Password" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationCustom04">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                            </Form.Group>
                        </Row>
                        <Button className='btn btn-dark' type='submit'>
                            { loading ? 'Loading…' : 'Update' }
                        </Button>
                    </>
                </Form>
            </FormContainer>
        </>
    )
}

export default ProfileScreen
