import React, { useState } from 'react'
import { Button, Card, Col, Container, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import OrderModal from './OrderModal'
import moment from 'moment'
import { getDate } from '../utility'


const MyOrders = ({ order }) => {
    const [show, setShow] = useState()

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
            <Container>
                <Row>
                    <Col xs={12} md={{ span: 10, offset: 1 }}>
                        <Card key={order._id} style={{ marginBottom: '20px' }}>
                            <Card.Body>
                                <Row style={{ fontSize: '0.88rem' }}>
                                    <Col style={{ textAlign: 'left' }}>
                                        <h6><strong>ORDER #</strong>{order._id}</h6>
                                        <h6><strong>Placed On </strong>{getDate(order.createdAt)} &nbsp;{moment(order.createdAt).format('h:mm A')}</h6>
                                        <h6><strong>Order Status </strong> &nbsp;<span style={{ padding: '10px' }} className={ order.status === 'Cancel' ? 'badge bg-danger' : order.status === 'Delivered' ? 'badge bg-success' : 'badge bg-violet'}>{order.status === '' ? 'Placed' : order.status}</span> </h6>
                                        <br></br>
                                        <div style={{ fontSize: '12px' }}><strong>Updated At</strong> {moment(order.updatedAt).format('MMMM Do YYYY, h:mm A')}</div>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }}>
                                        <Link to={`/order/${order._id}`}>
                                            <Button className="btn btn-light" onClick={handleShow}>
                                                <strong>&nbsp;Track Order</strong>
                                            </Button>
                                        </Link>
                                        <br></br>
                                        <Button className="btn btn-light" style={{ marginTop: '8px' }} onClick={handleShow}>
                                            <strong>View Details</strong>
                                        </Button>
                                        <br></br>
                                        <Button className="btn btn-secondary" style={{ marginTop: '8px' }} disabled>
                                            <strong>Coming Soon</strong>
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MyOrders


