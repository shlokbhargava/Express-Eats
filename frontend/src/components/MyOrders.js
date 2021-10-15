import React, { useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getDate, getStringPrice } from '../utility'
import OrderModal from './OrderModal'

const MyOrders = ({ order }) => {
    const [show, setShow] = useState()

    const orderConfirm = useSelector((state) => state.orderConfirm)
    const { success } = orderConfirm 

    const orderPrepare = useSelector((state) => state.orderPrepare)
    const { success: successPrepare } = orderPrepare 

    const orderOutForDelivery = useSelector((state) => state.orderOutForDelivery)
    const { success: successOrderOutForDelivery } = orderOutForDelivery

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { success: successorderDeliver } = orderDeliver

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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
                            {getDate(order.createdAt)}
                        </Col>
                        <Col md={3}>
                            <strong>ORDER TOTAL</strong> <br></br>
                            ₹{getStringPrice(order.totalPrice)}
                        </Col>
                        <Col md={3}>
                            <strong>ORDER STATUS</strong> <br></br>
                            {   (order.isPaid && !order.isConfirmed) ? 'PLACED' : 
                                ((success && !successPrepare) || (order.isConfirmed && !order.isPreparing)) ? 'CONFIRMED' :
                                ((successPrepare && !successOrderOutForDelivery) || (order.isPreparing && !order.isOutForDelivery)) ? 'PREPARING' :
                                ((successOrderOutForDelivery && !successorderDeliver) || (order.isOutForDelivery && !order.isDelivered)) ?'OUT FOR DELIVERY' :
                                (successorderDeliver || order.isDelivered) && 'DELIVERED'
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
                                    { (success || order.isConfirmed) ? <li id="step-2" className="active"></li> : <li id="step-2"></li> }
                                    { (successPrepare || order.isPreparing) ? <li id="step-3" className="active"></li> : <li id="step-3"></li> }
                                    { (successOrderOutForDelivery || order.isOutForDelivery) ? <li id="step-4" className="active"></li> : <li id="step-4"></li> }
                                    { (successorderDeliver || order.isDelivered) ? <li id="step-5" className="active"></li> : <li id="step-5"></li> }
                                </ul>
                                <div className="progress">
                                    { order.isPaid && <div className="progress-bar" role="progressbar"></div> }
                                    { (success || order.isConfirmed) && <div className="progress-bar" role="progressbar" style={{ width: '25%' }}></div>}
                                    { (successPrepare || order.isPreparing) && <div className="progress-bar" role="progressbar" style={{ width: '25%' }}></div>}
                                    { (successOrderOutForDelivery || order.isOutForDelivery) && <div className="progress-bar" role="progressbar" style={{ width: '25%' }}></div>}
                                    { (successorderDeliver || order.isDelivered) && <div className="progress-bar" role="progressbar" style={{ width: '25%' }}></div>}
                                </div>
                            </div>
                            <br></br>
                            <div>
                                { (order.isPaid && !order.isConfirmed) && <li>Order has been Placed.</li>}
                                { ((success && !successPrepare) || (order.isConfirmed && !order.isPreparing)) && <li>Restaurant has confirmed your Order.</li>}
                                { ((successPrepare && !successOrderOutForDelivery) || (order.isPreparing && !order.isOutForDelivery)) && <li>Restaurant has started preparing your food.</li>}
                                { ((successOrderOutForDelivery && !successorderDeliver) || (order.isOutForDelivery && !order.isDelivered)) && <li>Your order is out for delivery.</li>}
                                { (successorderDeliver || order.isDelivered) && <p><strong>Payment Method : </strong>{order.paymentMethod}</p> }
                            </div>
                        </Col>
                        <Col md={4} style={{ textAlign: "right" }}>
                            <strong>Delivery Address</strong> <br></br>
                            {order.deliveryAddress && order.deliveryAddress.name}, {order.deliveryAddress && order.deliveryAddress.contact} <br></br>
                            {order.deliveryAddress && order.deliveryAddress.address} <br></br>
                            {order.deliveryAddress && order.deliveryAddress.city}, {order.deliveryAddress && order.deliveryAddress.state} - {order.deliveryAddress && order.deliveryAddress.postalCode} 
                            <br></br><br></br>
                            { !order.isConfirmed && <><Button variant='danger' size='sm'>Cancel</Button>&emsp;</> }
                            <Link onClick={handleShow}><strong>View Details</strong></Link>
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
