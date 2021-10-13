import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../actions/orderAction'

const OrderScreen = () => {
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { order } = orderDetails

    useEffect(() => {
        if (!order) {
            dispatch(getOrderDetails(order._id))
        }
    }, [dispatch, order])

    return (
        <Card className='mt-5'>
            <Card.Header>{order._id}</Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export default OrderScreen
