import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../actions/orderAction'
import { getDate, getStringPrice } from '../utility'
import Loader from '../components/Loader'
import Message from '../components/Message'
import OrderModal from '../components/OrderModal'

const OrderScreen = ({ match, history }) => {
    const [show, setShow] = useState()

    const userId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { orders, loading, error } = orderDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (!userInfo || (userInfo && userInfo.isSeller)) {
            history.push('/login')
        }
        dispatch(getOrderDetails(userId))
    }, [dispatch, userId, history, userInfo])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
            <Container className='mt-5'>
                <Row>
                    <Col sm={12} md={{ span: 10, offset: 1 }}>
                        { orders && orders.length === 0 && <Message variant='info'>{'No orders yet!'}</Message> }
                        { orders && orders.map((order) => (
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
                                                {getDate(order.createdAt)}
                                            </Col>
                                            <Col md={3}>
                                                <strong>ORDER TOTAL</strong> <br></br>
                                                ₹{getStringPrice(order.totalPrice)}
                                            </Col>
                                            <Col md={3}>
                                                <strong>ORDER STATUS</strong> <br></br>
                                                { (order.isPaid && !order.isConfirmed) ? 'PLACED' : 
                                                (order.isConfirmed && !order.isPreparing) ? 'CONFIRMED' :
                                                (order.isPreparing && !order.isOutForDelivery) ? 'PREPARING' :
                                                (order.isOutForDelivery && !order.isDelivered) ?'OUT FOR DELIVERY' :
                                                order.isDelivered && 'DELIVERED'
                                                }
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
                                                <div className="progresses py-4">
                                                    <ul className="d-flex align-items-center justify-content-between">
                                                        { order.isPaid ? <li id="step-1" className="active"></li> : <li id="step-1"></li> }
                                                        { order.isConfirmed ? <li id="step-2" className="active"></li> : <li id="step-2"></li> }
                                                        { (order.isPreparing) ? <li id="step-3" className="active"></li> : <li id="step-3"></li> }
                                                        { order.isOutForDelivery ? <li id="step-4" className="active"></li> : <li id="step-4"></li> }
                                                        { order.isDelivered ? <li id="step-5" className="active"></li> : <li id="step-5"></li> }
                                                    </ul>
                                                    <div className="progress">
                                                        { order.isPaid && <div className="progress-bar" role="progressbar"></div> }
                                                        { order.isConfirmed && <div className="progress-bar" role="progressbar" style={{ width: '25%' }}></div>}
                                                        { order.isPreparing && <div className="progress-bar" role="progressbar" style={{ width: '25%' }}></div>}
                                                        { order.isOutForDelivery && <div className="progress-bar" role="progressbar" style={{ width: '25%' }}></div>}
                                                        { order.isDelivered && <div className="progress-bar" role="progressbar" style={{ width: '25%' }}></div>}
                                                    </div>
                                                </div>
                                                <br></br>
                                                <div>
                                                    { (order.isPaid && !order.isConfirmed) && <li>Order has been Placed.</li>}
                                                    { (order.isConfirmed && !order.isPreparing) && <li>Restaurant has confirmed your Order.</li>}
                                                    { (order.isPreparing && !order.isOutForDelivery) && <li>Restaurant has started preparing your food.</li>}
                                                    { (order.isOutForDelivery && !order.isDelivered) && <li>Your order is out for delivery.</li>}
                                                    { order.isDelivered && <p><strong>Payment Method : </strong>{order.paymentMethod}</p> }
                                                </div>
                                            </Col>
                                            <Col md={4} style={{ textAlign: "right" }}>
                                                <strong>Delivery Address</strong> <br></br>
                                                {order.deliveryAddress && order.deliveryAddress.name}, {order.deliveryAddress && order.deliveryAddress.contact} <br></br>
                                                {order.deliveryAddress && order.deliveryAddress.address} <br></br>
                                                {order.deliveryAddress && order.deliveryAddress.city}, {order.deliveryAddress && order.deliveryAddress.state} - {order.deliveryAddress && order.deliveryAddress.postalCode} 
                                                <br></br><br></br>
                                                { !order.isConfirmed && <><Button variant='danger' size='sm'>Cancel</Button>&nbsp;</> } 
                                                {/* <Button variant='secondary' size='sm'>View Details</Button> */}
                                                <Link onClick={handleShow}><strong>View Details</strong></Link>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>  
                            </>
                        )) }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default OrderScreen
