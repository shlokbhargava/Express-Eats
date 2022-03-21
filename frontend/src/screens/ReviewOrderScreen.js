import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderAction'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Progress from '../components/Progress'
import { getStringPrice } from '../utility'
import io from 'socket.io-client'
import { checkOut } from '../actions/paymentAction'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutFrom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const ReviewOrderScreen = ({ history }) => {
    const dispatch = useDispatch()

    const [clientSecret, setClientSecret] = useState("")

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const addressDetail = useSelector((state) => state.addressDetail)
    const { address } = addressDetail

    const orderCreate = useSelector((state) => state.orderCreate)
    const { success, order, error } = orderCreate

    const orderPayment = useSelector((state) => state.orderPayment)
    const { success: successPay, data, error: errorPay, loading: loadingPay } = orderPayment

    const itemsPrice = Number(cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(2))
    const deliveryPrice = itemsPrice >= 500 ? 0 : 50
    const packagingPrice = Number((0.02*itemsPrice).toFixed(2))
    const gst = Number((0.05*itemsPrice).toFixed(2))
    const totalPrice = Number((itemsPrice+gst+packagingPrice+deliveryPrice).toFixed(2))

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            restaurant: cartItems[0].restaurant,
            deliveryAddress: address._id,
            itemPrice: itemsPrice,
            gst: gst,
            deliveryPrice: deliveryPrice,
            packagingPrice: packagingPrice,
            totalPrice: totalPrice
        }))
    }

    // const makePayment = () => {
    //     dispatch(createOrder({
    //         orderItems: cart.cartItems,
    //         restaurant: cartItems[0].restaurant,
    //         deliveryAddress: address._id,
    //         paymentMethod: paymentMethod,
    //         itemPrice: itemsPrice,
    //         gst: gst,
    //         deliveryPrice: deliveryPrice,
    //         packagingPrice: packagingPrice,
    //         totalPrice: totalPrice,
    //         isPaid: true,
    //         paidAt: Date.now()
    //     }))
    // }

    useEffect(() => {
        if (!userInfo || (userInfo && userInfo.isSeller)) {
            history.push('/login')
        }
        if (success && !successPay) {
            // history.push(`/order/${order._id}`)
            // var socket = io()
            // socket.emit('join', `order_${order._id}`)
            dispatch(checkOut(order))
        }
        if (successPay) {
            setClientSecret(data.clientSecret)
        }

        const query = new URLSearchParams(window.location.search)

        if (query.get("success")) {
            <Message variant='success'>{"Order placed! You will receive an email confirmation."}</Message>
        }

        if (query.get("canceled")) {
            <Message variant='danger'>{"Order canceled -- continue to shop around and checkout when you're ready."}</Message>
        }
    }, [success, dispatch, history, userInfo, order, data, successPay])
    
    const appearance = {
        theme: 'stripe',
    }
    const options = {
        clientSecret,
        appearance,
    }

    return (
        <>
            { success ? <Progress step2 step3 step4 /> : <Progress step2 step3 /> }
            <br></br>
            <Container className='mt-3'>
                <Row>
                    <Col md={8}>
                    <h2>Review Order</h2>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h4>1. Order Items</h4>
                                {cartItems.length === 0 ? <Message variant='danger'>Your Cart is Empty</Message> : (
                                    <ListGroup variant='flush'>
                                        {cartItems.map((item, index) => (
                                            <ListGroupItem key={index}>
                                                <Row>
                                                    <Col md={2}>
                                                        <Image src={item.image} alt={item.name} fluid thumbnail />
                                                    </Col>
                                                    <Col md={4}>
                                                        <strong>{item.name}</strong><br></br>
                                                        <p>Quantity: {item.qty}</p>
                                                        Delivery In : &nbsp; 30 Minutes
                                                    </Col>
                                                    <Col md={{ span: 3, offset: 3 }}>
                                                        {item.qty}&nbsp; x &nbsp;₹{getStringPrice(item.price)}&nbsp; = &nbsp;₹{getStringPrice(item.qty*item.price)}
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                )}
                            </ListGroupItem>

                            <ListGroupItem>
                                <h4>2. Delivery</h4>
                                Name : <b>{userInfo.name}</b> <br></br>
                                Email : {userInfo.email} <br></br>
                                {address.address}, <br></br>
                                {address.city} - {address.postalCode}, <br></br>
                                {address.country} <br></br>
                            </ListGroupItem>

                        </ListGroup>
                    </Col>

                    <Col md={4}>
                        { loadingPay ? <Loader /> : errorPay ? <Message variant='danger'>{errorPay}</Message> :
                           clientSecret ? (
                            <Elements options={options} stripe={stripePromise} order={order}>
                                <CheckoutForm order={order} />
                            </Elements> 
                        )
                        :
                            <Card>
                                <ListGroup variant='flush'>
                                    <Card.Header as="h5">  
                                        <Row>
                                        <Col><b>Order total :</b></Col>  
                                        <Col><b>₹{ getStringPrice(totalPrice) }</b>
                                        </Col>
                                        </Row>
                                    </Card.Header>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Items : </Col>
                                            <Col>₹{getStringPrice(itemsPrice)}</Col>
                                        </Row>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Row>
                                            <Col>GST : </Col>
                                            <Col>₹{getStringPrice(gst)}</Col>
                                        </Row>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Row>
                                            <Col>Packaging Charges : </Col>
                                            <Col>₹{getStringPrice(packagingPrice)}</Col>
                                        </Row>
                                    </ListGroupItem>

                                    <ListGroupItem>
                                        <Row>
                                            <Col>Delivery Charges : </Col>
                                            <Col>₹{getStringPrice(deliveryPrice)}</Col>
                                        </Row>
                                    </ListGroupItem>
                                            
                                    <ListGroupItem>
                                        {/* <StripeCheckout name='Express Eats' amount={totalPrice*100} currency='INR' email={userInfo.email} stripeKey={process.env.REACT_APP_STRIPE_KEY} token={makePayment}>
                                            <div className="d-grid gap-2">
                                                <Button type='button' variant='dark' disabled={cartItems.length === 0} block>
                                                    Checkout
                                                </Button>
                                            </div>
                                        </StripeCheckout> */}
                                        <div className="d-grid gap-2">
                                            <Button type='button' variant='dark' onClick={placeOrderHandler} disabled={cartItems.length === 0} block>
                                                Proceed to Pay
                                            </Button>
                                        </div>
                                    </ListGroupItem>                            
                                </ListGroup>
                            </Card>
                        }
                        { error && <Message variant='danger'>Order can't be placed{error}</Message> }
                    </Col>
                </Row>
            </Container> 
        </>
    )
}

export default ReviewOrderScreen


