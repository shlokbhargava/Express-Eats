import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Breadcrumb, Table } from 'react-bootstrap'
import { getOrderDetails } from '../actions/orderAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import OrderListTable from '../components/OrderListTable'

const OrderList = ({ history }) => {
    const dispatch = useDispatch()

    const restaurantDetails = useSelector((state) => state.restaurantDetails)
    const { restaurantInfo } = restaurantDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const orderCreate = useSelector((state) => state.orderCreate)
    const { success: successCreate } = orderCreate

    const orderDetails = useSelector((state) => state.orderDetails)
    const { orders, success: successOrderDetails, error, loading } = orderDetails

    useEffect(() => {
        if (!userInfo || (userInfo && !userInfo.isSeller)) {
            history.push('/login')
        }

        if (successCreate) {
            dispatch(getOrderDetails(restaurantInfo._id))
        }

        if (!successOrderDetails) {
            dispatch(getOrderDetails(restaurantInfo._id))
        }
        
    }, [dispatch, history, userInfo, successOrderDetails, successCreate, restaurantInfo])

    return (
        <>
            <Breadcrumb className='mt-2'>
                <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item active>Orders</Breadcrumb.Item>
            </Breadcrumb>
            
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
                                <OrderListTable order={order} />
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
