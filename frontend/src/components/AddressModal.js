import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addAddress, listAddress } from '../actions/addressAction'
import Message from './Message'

const AddressModal = ({ item }) => {
    const [address, setAddress] = useState(item ? item.address : '')
    const [city, setCity] = useState(item ? item.city : '')
    const [state, setState] = useState(item ? item.state : '')
    const [postalCode, setPostalCode] = useState(item ? item.postalCode : 0)
    const [country, setCountry] = useState(item ? item.country : '')
    const [contact, setContact] = useState(item ? item.contact : 0)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (success) {
            dispatch(listAddress())
            setSuccess(false)
        }
    }, [success, dispatch])

    const addressHandler = (e) => {
        e.preventDefault()

        if (contact.length < 10 || contact.length > 10) {
            setMessage('Contact number should be of 10 digits')
            return
        }

        dispatch(addAddress({
            address,
            city,
            state,
            postalCode,
            country,
            contact
        }))

        setSuccess(true)
        alert('Address saved!')
    }

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Address
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { message && <Message variant='danger'>{message}</Message> }
                <Form onSubmit={addressHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control as="textarea" rows={2} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
                        </Form.Group> 
                        <Form.Group as={Col}>
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control type="Number" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Pin Code" />
                        </Form.Group> 
                        <Form.Group as={Col}>
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
                        </Form.Group> 
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="number" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact Number" />
                    </Form.Group>
                    <Button type="submit"> Submit </Button>
                </Form>
            </Modal.Body>
        </>
    )
}

export default AddressModal