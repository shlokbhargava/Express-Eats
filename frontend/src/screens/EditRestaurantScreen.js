import React, { useEffect, useState } from 'react'
import { Breadcrumb, Form, Row, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { editRestaurant, restaurant } from '../actions/restaurantActions'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { RESTAURANT_EDIT_RESET } from '../constants/restaurantConstants'

const EditRestaurantScreen = ({ history }) => {
    const dispatch = useDispatch()

    const [contact, setContact] = useState('')
    const [minOrderValue, setMinOrderValue] = useState(0)
    const [time, setTime] = useState('')
    const [description, setDescription] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [onlinePayment, setOnlinePayment] = useState(false)
    const [cod, setCod] = useState(false)

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { restaurantInfo } = restaurantDetails

    const restaurantEdit = useSelector((state) => state.restaurantEdit)
    const { loading, success, error } = restaurantEdit
     
    useEffect(() => {
        if (success) {
            dispatch({ type: RESTAURANT_EDIT_RESET })
            alert('Details updated')
            dispatch(restaurant(restaurantInfo.email))
            history.push('/dashboard')
        } else {
            setContact(restaurantInfo.contact)
            setMinOrderValue(restaurantInfo.minOrderValue)
            setTime(restaurantInfo.time)
            setDescription(restaurantInfo.description)
            setState(restaurantInfo.state)
            setCountry(restaurantInfo.country)
            setOnlinePayment(restaurantInfo.onlinePayment)
            setCod(restaurantInfo.cod)
        }
    }, [success, dispatch, restaurantInfo, history])

    const updateHandler = (e) => {
        e.preventDefault()

        dispatch(editRestaurant(restaurantInfo._id, {
            contact,
            minOrderValue,
            time,
            description,
            state,
            country,
            onlinePayment,
            cod
        }))
    }

    return (
        <>
            <Breadcrumb className='mt-2'>
                <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Restaurant Details</Breadcrumb.Item>
            </Breadcrumb>
            { loading && <Loader /> }
            { error && <Message variant='danger'>{error}</Message> }
            <FormContainer>
                <h2 className='text-center mt-2 mb-3'>RESTAURANT DETAILS</h2>
                <Form onSubmit={updateHandler}>
                    <h6>Restaurant Details: </h6>
                    <Row className="mb-2">
                        <Form.Group as={Col}>
                            <Form.Label>Contact</Form.Label>
                            <Form.Control type='number' value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Min Order Value</Form.Label>
                            <Form.Control type="number" value={minOrderValue} onChange={(e) => setMinOrderValue(e.target.value)} placeholder="Min Order Value" required />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Closing Time</Form.Label>
                            <Form.Control type='time' value={time} onChange={(e) => setTime(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Add a description for your restaurant" style={{ height: '70px' }} />
                    </Form.Group>

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

                    <Button className='btn btn-dark mb-4' type='submit'>
                        { loading ? 'Loading…' : 'Update' }
                    </Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default EditRestaurantScreen
