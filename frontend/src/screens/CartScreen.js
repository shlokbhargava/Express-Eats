import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Col, Container, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartAction'
import Progress from '../components/Progress'
import { getStringPrice } from '../utility'

const CartScreen = ({ match, location, history }) => {
    const dishId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    // const getDeliveryTime = () => {
    //     const day = new Date()
    //     var min = day.getMinutes() + 30
    //     var hr = day.getHours() 

    //     if (min >= 60) {
    //         min -= 60
    //     }

    //     if (hr <= 9) {
    //         var newHr = '0' + hr
    //     }
        
    //     var time = newHr + ":" + min
    //     time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    //     if (time.length > 1) {
    //         time = time.slice (1)
    //         time[5] = +time[0] < 12 ? ' AM' : ' PM'
    //         time[0] = +time[0] % 12 || 12
    //     }
    //     return time.join('');
    // }
    
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (dishId) {
            dispatch(addToCart(dishId, qty))
        }
    }, [dishId, dispatch, qty])

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <>
            <Progress />
            <Container className='py-5'>
                <Row> 
                    <Col md={8}>
                        { cartItems.length === 0 ? 
                        <Message>
                            Your Cart is empty
                            <Link to='/'> Browse your food <i className="fas fa-arrow-circle-right"></i></Link>
                        </Message> : 
                        <ListGroup>
                            <h2>{cartItems[0].restaurant.name}</h2>
                            { cartItems.map(item => (
                                <ListGroupItem key={item.dish}>
                                    <Row>
                                        <Col md={2}>
                                            <Image style={{ height: '100%' }} src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={4}>
                                            <strong>{item.name}</strong><br></br>
                                            {item.description}
                                        </Col>
                                        <Col md={1}>
                                            ₹{getStringPrice(item.price)}
                                        </Col>
                                        <Col md={2}>
                                            {item.qty === 0 && dispatch(removeFromCart(item.dish))}
                                            <i type='button' className="opt fas fa-minus" onClick={() => dispatch(addToCart(item.dish, item.qty-1))}></i> &nbsp;
                                            <Button className='btn-sm' variant='outline-#e67818' disabled>
                                                <span>{item.qty}</span>
                                            </Button> &nbsp;
                                            <i type='button' className="opt fas fa-plus" onClick={() => dispatch(addToCart(item.dish, item.qty+1))}></i>
                                        </Col>
                                        <Col md={3}>
                                            {item.qty}&nbsp; x &nbsp;₹{getStringPrice(item.price)}&nbsp; = &nbsp;₹{getStringPrice(item.qty*item.price)}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            )) }
                        </ListGroup>
                        }
                    </Col>
                    
                    <Col md={4}>
                        <br></br>
                        <br></br>
                        <Card>
                            <ListGroup variant='flush'>
                                <Card.Header as='h5'><b>Cart total : ₹{ getStringPrice((cartItems.reduce((acc, item) => acc + item.qty*item.price, 0)).toFixed(2)) }
                                </b>
                                </Card.Header>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Quantity : </Col>
                                        <Col>( {cartItems.reduce((acc, item) => acc + item.qty, 0)} items )</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Delivery In : </Col>
                                        <Col>{cartItems.length === 0 ? "" : '30 minutes'}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <div className="d-grid gap-2">
                                        { (cartItems.length === 0) || (getStringPrice((cartItems.reduce((acc, item) => acc + item.qty*item.price, 0))) < cartItems[0].restaurant.minOrderValue) ? 
                                        <Button variant="dark" disabled>
                                            Proceed to Checkout
                                        </Button> 
                                        :
                                            <Button variant="dark" onClick={checkoutHandler}>
                                                Proceed to Checkout
                                            </Button>
                                        }
                                    </div>
                                    { cartItems.length > 0 && getStringPrice((cartItems.reduce((acc, item) => acc + item.qty*item.price, 0))) < cartItems[0].restaurant.minOrderValue && <Message variant='danger' >{`Minimum Order Value is ₹${cartItems[0].restaurant.minOrderValue}`}</Message>}
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default CartScreen
