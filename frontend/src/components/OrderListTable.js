import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateOrder } from '../actions/orderAction'
import { getDate, getStringPrice } from '../utility'
import OrderModal from './OrderModal'
import moment from 'moment'

const OrderListTable = ({ order }) => {
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    const updateOrderStatusHandler = (orderId, status) => {
        dispatch(updateOrder(orderId, status))
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

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
                    order.status === 'Cancel' && <Button variant='danger' size='sm'>Order Cancelled</Button>
                }
            </td>   
        </>
    )
}

export default OrderListTable
