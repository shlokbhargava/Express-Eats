import React, { useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { getDate, getStringPrice } from '../utility'
import { updateOrder } from '../actions/orderAction'
import OrderModal from './OrderModal'
import Message from './Message'
import moment from 'moment'


const MyOrders = ({ order }) => {
    const [show, setShow] = useState()

    const dispatch = useDispatch()

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const updateOrderStatusHandler = (orderId, status) => {
        console.log('first')
        dispatch(updateOrder(orderId, status))
    }

    return (
        <>
                { show &&  
                    <Modal show={show} onHide={handleClose} size="lg">
                        <OrderModal order={order} />
                        <Modal.Footer>
                            <Button variant="outline-dark" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer> 
                    </Modal>
                }
            <Card key={order._id} style={{ fontSize: '0.88rem' }}>
                <Card.Header as="h6">
                    <Row style={{ fontSize: '0.88rem' }}>
                        <Col md={3}>
                            <strong>ORDER PLACED</strong> <br></br>
                            {getDate(order.createdAt)} &nbsp;{moment(order.createdAt).format('h:mm A')}
                        </Col>
                        <Col md={3}>
                            <strong>ORDER TOTAL</strong> <br></br>
                            ₹{getStringPrice(order.totalPrice)} 
                        </Col>
                        <Col md={3}>
                            <strong>ORDER STATUS</strong> <br></br>
                            {order.status} &nbsp;{getDate(order.createdAt)} &nbsp;{ order.status === 'Delivered' ? moment(order.deliveredAt).format('h:mm A') : moment(order.updatedAt).format('h:mm A')}
                        </Col>
                        <Col md={3}>
                            <strong>ORDER # </strong> <br></br>
                            {order._id}
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={8}>
                            { order.status !== 'Cancel' && 
                                <div className="progresses py-4">
                                    <ul className="d-flex align-items-center justify-content-between">
                                        { order.isPaid ? <li id="step-1" className="active"></li> : <li id="step-1"></li> }
                                        { (order.status === 'Confirm' || order.status === 'Preparing' || order.status === 'OutForDelivery' || order.status === 'Delivered') ? <li id="step-2" className="active"></li> : <li id="step-2"></li> }
                                        { (order.status === 'Preparing' || order.status === 'OutForDelivery' || order.status === 'Delivered') ? <li id="step-3" className="active"></li> : <li id="step-3"></li> }
                                        { (order.status === 'OutForDelivery' || order.status === 'Delivered') ? <li id="step-4" className="active"></li> : <li id="step-4"></li> }
                                        { order.status === 'Delivered' ? <li id="step-5" className="active"></li> : <li id="step-5"></li> }
                                    </ul>
                                    <div className="progress">
                                        { order.isPaid && <div className="progress-bar" role="progressbar"></div> }
                                        { order.status === 'Confirm' && <div className="progress-bar" role="progressbar" style={{ width: '25%' }}></div>}
                                        { order.status === 'Preparing' && <div className="progress-bar" role="progressbar" style={{ width: '50%' }}></div>}
                                        { order.status === 'OutForDelivery' && <div className="progress-bar" role="progressbar" style={{ width: '75%' }}></div>}
                                        { order.status === 'Delivered' && <div className="progress-bar" role="progressbar" style={{ width: '100%' }}></div>}
                                    </div>
                                </div> 
                            }
                            <br></br>
                            <div>
                                { order.status === 'Cancel' ? <Message variant="danger">{'Order Cancelled'}</Message> :
                                    <>
                                        { (order.isPaid && order.status === '') && <li>Order has been Placed.</li>}
                                        { order.status === 'Confirm' && <li>Restaurant has confirmed your Order.</li>}
                                        { order.status === 'Preparing' && <li>Restaurant has started preparing your food.</li>}
                                        { order.status === 'OutForDelivery' && <li>Your order is out for delivery.</li>}
                                        { order.status === 'Delivered' && <p><strong>Payment Method : </strong>{order.paymentMethod}</p> }
                                    </>
                                }
                            </div>
                        </Col>
                        <Col md={4} style={{ textAlign: "right" }}>
                            <strong>Delivery Address</strong> <br></br>
                            {order.deliveryAddress && order.deliveryAddress.name}, {order.deliveryAddress && order.deliveryAddress.contact} <br></br>
                            {order.deliveryAddress && order.deliveryAddress.address} <br></br>
                            {order.deliveryAddress && order.deliveryAddress.city}, {order.deliveryAddress && order.deliveryAddress.state} - {order.deliveryAddress && order.deliveryAddress.postalCode} 
                            <br></br>
                            { order.status === '' && <><Button variant='danger' size='sm' onClick={() => updateOrderStatusHandler(order._id, 'Cancel')}>Cancel</Button>&emsp;</> }
                            <button className="btn btn-link" onClick={handleShow}><strong>View Details</strong></button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <br></br>
            <br></br>
        </>
    )
}

export default MyOrders
