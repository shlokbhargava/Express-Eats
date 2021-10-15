import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { confirmOrder, deliverOrder, outForDeliveryOrder, prepareOrder } from '../actions/orderAction'
import { getDate, getStringPrice } from '../utility'
import OrderModal from './OrderModal'

const OrderListTable = ({ order }) => {
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    const orderConfirm = useSelector((state) => state.orderConfirm)
    const { success } = orderConfirm 

    const orderPrepare = useSelector((state) => state.orderPrepare)
    const { success: successPrepare } = orderPrepare 

    const orderOutForDelivery = useSelector((state) => state.orderOutForDelivery)
    const { success: successOrderOutForDelivery } = orderOutForDelivery

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { success: successorderDeliver } = orderDeliver

    const confirmOrderHandler = (orderId) => {
        dispatch(confirmOrder(orderId))
    }

    const prepareOrderHandler = (orderId) => {
        dispatch(prepareOrder(orderId))
    }

    const outforDeliveryOrderHandler = (orderId) => {
        dispatch(outForDeliveryOrder(orderId))
    }

    const deliverOrderHandler = (orderId) => {
        dispatch(deliverOrder(orderId))
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
            <td>{getDate(order.createdAt)}</td>
            <td>
                { (!success && !order.isConfirmed) ? 
                    <>
                        <Button variant='danger' size='sm'>Cancel</Button> &nbsp;
                        <Button variant='success' size='sm' onClick={() => confirmOrderHandler(order._id)}>Accept</Button>
                    </>
                :
                    (!successPrepare && !order.isPreparing) ? <Button variant='success' size='sm' onClick={() => prepareOrderHandler(order._id)}>Started Preparing</Button>
                :
                    (!successOrderOutForDelivery && !order.isOutForDelivery) ? <Button variant='success' size='sm' onClick={() => outforDeliveryOrderHandler(order._id)}>Mark as Out for Delivery</Button>
                :
                    (!successorderDeliver && !order.isDelivered) ? <Button variant='success' size='sm' onClick={() => deliverOrderHandler(order._id)}> Mark as Delivered</Button>
                : 
                    (successorderDeliver || order.isDelivered) && <p className='text-success'>&emsp;&emsp; <i className="fa-lg fas fa-check-circle"></i></p>
                }
            </td>   
        </>
    )
}

export default OrderListTable
