import React, { useEffect, useState } from 'react'
import { Breadcrumb, Button, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const loading = false

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        }
    }, [userInfo, history])

    return (

        <>
            <Breadcrumb className='mt-2'>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>
            <FormContainer>
                <Form>
                    { userInfo && userInfo.isAdmin ? '' 
                    
                    :
                        <>
                            <h2 className='text-center mt-2 mb-3'>PROFILE</h2>
                            {/* { loading && <Loader /> } */}
                            {/* { success && <Message variant='success'>{'Profile updated successfully'}</Message> } */}
                            {/* { error && <Message variant='danger'>{error}</Message> } */}
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
                            <Button className='btn btn-dark' type='submit'>
                                { loading ? 'Loading…' : 'Update' }
                            </Button>
                        </>
                    }
                </Form>
            </FormContainer>
        </>
    )
}

export default ProfileScreen
