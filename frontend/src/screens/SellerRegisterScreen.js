import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'

const SellerRegisterScreen = () => {
    return (
        <FormContainer>
            <h2 className='text-center mt-2 mb-3'>SELLER &nbsp;REGISTER</h2>
            <Form>
                <h6>Restaurant Details: </h6>
                <Form.Group className='mb-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder="Name" />
                </Form.Group>
                <Form.Group className='mb-2'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' placeholder="Email" />
                </Form.Group>
                <Row className="mb-3">
                    <Form.Group className='mb-2' as={Col}>
                        <Form.Label>Contact</Form.Label>
                        <Form.Control type='number' placeholder="Contact" pattern="[1-9]{1}[0-9]{9}" />
                    </Form.Group>
                    <Form.Group className='mb-2' as={Col}>
                        <Form.Label>Min Order Value</Form.Label>
                        <Form.Control type="number" placeholder="Min Order Value" />
                    </Form.Group>
                </Row>

                <h6>Address: </h6>
                <Row className="mb-3">
                    <Form.Group className='mb-2' as={Col}>
                        <Form.Label>State</Form.Label>
                        <Form.Control type='text' placeholder="State" />
                    </Form.Group>
                    <Form.Group className='mb-2' as={Col}>
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" placeholder="Country" />
                    </Form.Group>
                </Row>

                <h6>Payment Method: </h6>
                <Row className="mb-1">
                    <Form.Group className='mb-2' as={Col} id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Online Payment" />
                    </Form.Group>
                    <Form.Group className='mb-2' as={Col} id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Cash On Delivery" />
                    </Form.Group>
                </Row>

                <Form.Group className='mb-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>

                <Form.Control type='hidden' name='isAdmin' value='true'></Form.Control>

                <Button className='btn btn-dark mb-4' type="submit">Register</Button>
            </Form>
        </FormContainer>
    )
}

export default SellerRegisterScreen
