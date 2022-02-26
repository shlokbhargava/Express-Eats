import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../actions/orderAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import MyOrders from '../components/MyOrders'


const MyOrdersScreen = ({ history }) => {
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.orderDetails)
    const { orders, success: successOrderDetails, loading, error } = orderDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo || (userInfo && userInfo.isSeller)) {
            history.push('/login')
        }  

        if (!successOrderDetails) {
            dispatch(getOrderDetails(userInfo._id))
        }
        
    }, [dispatch, history, userInfo, successOrderDetails])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <>
            <Container className='mt-5'>
                <Row>
                    <Col xs={12} md={{ span: 10, offset: 1 }}>
                        <Col xs={12} md={{ span: 10, offset: 1 }}><h3>&emsp;My Orders</h3></Col>
                        <br></br>
                        { orders && orders.length === 0 && <Message variant='info'>{'No orders yet!'}</Message> }
                        { orders && orders.map((order) => (
                            <div key={order._id}>  
                                <script>
                                    {
                                        <MyOrders order={order} />
                                    }
                                </script>
                                <MyOrders order={order} />
                            </div>
                        )) }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default MyOrdersScreen
