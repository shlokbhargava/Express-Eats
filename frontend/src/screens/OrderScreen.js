import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetailsByOrderID } from '../actions/orderAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import moment from 'moment'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'
import { toast } from 'react-toastify'

const OrderScreen = ({ match }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetailsByOrderID = useSelector((state) => state.orderDetailsByOrderID)
  const { loading, order, error } = orderDetailsByOrderID

  var [updated, setUpdated] = useState()

  var socket = io()

  if (order) {
    socket.emit('join', `order_${order._id}`)
  }

  socket.on('orderUpdated', (data) => {
    updated = {...order}
    updated.updatedAt = data.updatedAt
    updated.status = data.status
    setUpdated(updated)
    toast.success(`Order Updated to: ${updated.status}`)
  })

  const updatedOrder = (order) => {
    return (
      <div className="track">
      { order.isPaid && <div className="step active"> <span className="icon"> <i className="fa fa-receipt"></i> </span> <span className="text">Order Placed</span> </div> }
      <div className={ order.status === 'Confirm' || order.status === 'Preparing' || order.status === 'OutForDelivery' || order.status === 'Delivered' ? 'step active' : 'step' }> 
        <span className="icon"> <i className="fa fa-thumbs-up"></i> </span> 
        <span className="text">Order confirmed</span> 
      </div> 
      <div className={ order.status === 'Preparing' || order.status === 'OutForDelivery' || order.status === 'Delivered' ? 'step active' : 'step' }> 
        <span className="icon"> <i className="fa fa-cookie"></i> </span> 
        <span className="text"> Preparing your food </span> 
      </div>
      <div className={ order.status === 'OutForDelivery' || order.status === 'Delivered' ? 'step active' : 'step' }> 
        <span className="icon"> <i className="fa fa-truck"></i> </span> 
        <span className="text"> Out for Delivery </span> 
      </div>
      <div className={ order.status === 'Delivered' ? 'step active' : 'step' }> 
        <span className="icon"> <i className="fa fa-check"></i> </span> 
        <span className="text">Delivered</span> 
      </div> 
    </div>
    )
  }

  useEffect(() => {
    dispatch(getOrderDetailsByOrderID(orderId))
  }, [dispatch, orderId])
 
  return (
    <>
      { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : order && 
        <Container className='mt-5'>
          <Card>
            <Card.Header className="card-header"> My Orders / Tracking </Card.Header>
            <Card.Body className="card-body">
                <h6>Order #: {order._id}</h6>
                <Card>
                    <Card.Body>
                      <Row>
                          <Col> <strong>Ordered On:</strong> <br></br> {moment(order.createdAt).format('MMMM Do YYYY, h:mm A')} </Col>
                          <Col> <strong>Ordered From:</strong> <br></br> {order.restaurant.name} | <i className="fa fa-phone"></i> {order.restaurant.contact} </Col>
                          <Col> <strong>Status:</strong> <br></br> {order.status} | {moment(order.updatedAt).format('MMMM Do YYYY, h:mm A')} </Col>
                      </Row>
                    </Card.Body>
                </Card>
                { updated ? updatedOrder(updated) : updatedOrder(order) }
                <hr></hr> <Link to="/my-orders" className="btn btn-dark"> <i className="fa fa-chevron-left"></i> Back to orders</Link>
            </Card.Body>
          </Card>
        </Container>
      }
    </>
  )
}

export default OrderScreen