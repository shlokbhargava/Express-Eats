import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateOrder } from '../actions/orderAction'
import { getDate, getStringPrice } from '../utility'
import OrderModal from './OrderModal'
import moment from 'moment'
import io from 'socket.io-client'
import { toast } from 'react-toastify'

const OrderListTable = ({ order }) => {
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    const updateOrderStatusHandler = (orderId, status) => {
        dispatch(updateOrder(orderId, status))
    }

    var [updated, setUpdated] = useState()
    var socket = io()

    socket.emit('join', `order_${order._id}`)
  
    socket.on('orderUpdated', (data) => {
      updated = {...order}
      updated.updatedAt = data.updatedAt
      updated.status = data.status
      setUpdated(updated)
      toast.success(`Order Updated to: ${updated.status}`)
    })

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const updatedOrder = (order) => {
        return (
            <>
                <td>{order._id}</td>
                <td>₹{getStringPrice(order.totalPrice)}</td>
                <td>{order.paymentMethod}</td>
                <td>&emsp;
                    <Button variant='secondary' style={{ paddingLeft: '20px', paddingRight: '20px' }} onClick={handleShow} size='sm'>View</Button>
                </td>
                <td>{getDate(order.createdAt)} &nbsp;{moment(order.createdAt).format('h:mm A')}</td>
                <td>
                    {
                        order.status === '' ? 
                        <>
                            <Button variant='danger' size='sm' onClick={() => updateOrderStatusHandler(order._id, 'Cancel')}>Cancel</Button> &nbsp;
                            <Button variant='success' size='sm' onClick={() => updateOrderStatusHandler(order._id, 'Confirm')}>Accept</Button>
                        </>
                    :
                        order.status === 'Confirm' ? <Button variant='success' size='sm' onClick={() => updateOrderStatusHandler(order._id, 'Preparing')}>Preparing</Button>
                    :
                        order.status === 'Preparing' ? <Button variant='success' size='sm' onClick={() => updateOrderStatusHandler(order._id, 'OutForDelivery')}>Out for Delivery</Button>
                    :
                        order.status === 'OutForDelivery' ? <Button variant='success' size='sm' onClick={() => updateOrderStatusHandler(order._id, 'Delivered')}>Delivered</Button>
                    : 
                        order.status === 'Delivered' ? <p className='text-success'>&emsp;&emsp; <i className="fa-lg fas fa-check-circle"></i></p>
                    :
                        order.status === 'Cancel' && <h6><span className="badge bg-danger" style={{ padding: '10px' }}>Order Cancelled</span></h6>
                    }
                </td>   
            </>
        )
    }

    return (
        <>
            { show && 
                <Modal show={true} onHide={handleClose} size="lg">
                    <OrderModal order={order} />
                    <Modal.Footer>
                        <Button variant="outline-dark" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer> 
                </Modal>
            }
            { updated ? updatedOrder(updated) : updatedOrder(order) }
        </>
    )
}

export default OrderListTable
