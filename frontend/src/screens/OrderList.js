import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Button, Modal, Table } from 'react-bootstrap'
import { confirmOrder, deliverOrder, getOrderDetails, outForDeliveryOrder, prepareOrder } from '../actions/orderAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getDate, getStringPrice } from '../utility'
import { CONFIRM_ORDER_RESET, DELIVER_ORDER_RESET, ORDER_OUT_FOR_DELIVERY_RESET, PREPARE_ORDER_RESET } from '../constants/orderConstants'
import OrderModal from '../components/OrderModal'

const OrderList = ({ history }) => {
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { restaurantInfo } = restaurantDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderConfirm = useSelector((state) => state.orderConfirm)
    const { success, error: errorConfirm } = orderConfirm 

    const orderPrepare = useSelector((state) => state.orderPrepare)
    const { success: successPrepare } = orderPrepare 

    const orderOutForDelivery = useSelector((state) => state.orderOutForDelivery)
    const { success: successOrderOutForDelivery } = orderOutForDelivery

    const orderDeliver = useSelector((state) => state.orderDeliver)
    const { success: successorderDeliver } = orderDeliver

    const orderDetails = useSelector((state) => state.orderDetails)
    const { orders, error, loading } = orderDetails

    useEffect(() => {
        if (!userInfo || (userInfo && !userInfo.isSeller)) {
            history.push('/login')
        }

        if (success) {
            dispatch({ type: CONFIRM_ORDER_RESET })
        }

        if (successPrepare) {
            dispatch({ type: PREPARE_ORDER_RESET })
        }

        if (successOrderOutForDelivery) {
            dispatch({ type: ORDER_OUT_FOR_DELIVERY_RESET })
        }

        if (successorderDeliver) {
            dispatch({ type: DELIVER_ORDER_RESET })
        }

        dispatch(getOrderDetails(restaurantInfo._id))
    }, [dispatch, restaurantInfo, history, userInfo, success, successPrepare, successOrderOutForDelivery, successorderDeliver])

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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Breadcrumb className='mt-2'>
                <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Orders</Breadcrumb.Item>
            </Breadcrumb>
            
            { errorConfirm && <Message variant='danger'>{errorConfirm}</Message> }
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <div>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th><strong>ORDER #</strong></th>
                            <th><strong>TOTAL AMOUNT</strong></th>
                            <th><strong>PAYMENT METHOD</strong></th>
                            <th><strong>ORDER DETAILS</strong></th>
                            <th><strong>ORDER PLACED</strong></th>
                            <th><strong>ORDER STATUS</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        { orders && orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>₹{getStringPrice(order.totalPrice)}</td>
                                <td>{order.paymentMethod}</td>
                                <td>&emsp;
                                    <Button variant='secondary' style={{ paddingLeft: '20px', paddingRight: '20px' }} onClick={handleShow} size='sm'>View</Button>
                                </td>
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
                                <td>{getDate(order.createdAt)}</td>
                                <td>
                                    { !order.isConfirmed ? 
                                        <>
                                            <Button variant='danger' size='sm'>Cancel</Button> &nbsp;
                                            <Button variant='success' size='sm' onClick={() => confirmOrderHandler(order._id)}>Accept</Button>
                                        </>
                                    :
                                        !order.isPreparing ? <Button variant='success' size='sm' onClick={() => prepareOrderHandler(order._id)}>Started Preparing</Button>
                                    :
                                        !order.isOutForDelivery ? <Button variant='success' size='sm' onClick={() => outforDeliveryOrderHandler(order._id)}>Mark as Out for Delivery</Button>
                                    :
                                        !order.isDelivered ? <Button variant='success' size='sm' onClick={() => deliverOrderHandler(order._id)}> Mark as Delivered</Button>
                                    : 
                                        order.isDelivered && <p className='text-success'>&emsp;&emsp; <i className="fa-lg fas fa-check-circle"></i></p>
                                    }
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </Table>
            </div>
            }   
        </>
    )
}

export default OrderList
