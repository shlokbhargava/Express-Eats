import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeAllFromCart, removeFromCart } from '../actions/cartAction'

const Dishes = ({ dish }) => {
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const [qty, setQty] = useState()
    const [show, setShow] = useState(true)
    const [smShow, setSmShow] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        if (show) {
            if (cartItems.map((x) => x.dish.toString() === dish._id.toString())) {
                cartItems.map((x) => x.dish.toString() === dish._id.toString() && setQty(x.qty))
            }
            setShow(false)
        }
    },[qty, dish, dispatch, cartItems, show])

    const getStringPrice = (price) => {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 20 }).format(price)
    }  

    const updateQtyInCart = (qty) => {
        if (cartItems.length === 0) {
            setQty(qty)
            dispatch(addToCart(dish._id, qty))
        } else if (cartItems[0].restaurant._id.toString() === dish.restaurant._id.toString()) {
            setQty(qty)
            if (qty === 0) {
                dispatch(removeFromCart(dish._id))
            } else {
                dispatch(addToCart(dish._id, qty))
            }
        } else {
            setSmShow(true)
        }
    }

    const emptyCart = (qty) => {
        setQty(qty)
        dispatch(removeAllFromCart())
        setSmShow(false)
        dispatch(addToCart(dish._id, qty))
    }

    return (
        <>
            { smShow &&                 
                <Modal show={smShow} onHide={() => setSmShow(false)} backdrop="static" keyboard={false}>
                    <Modal.Header>
                        <Modal.Title>Items already in cart</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your cart contains items from a different restaurant. Would you like to reset your cart before browsing this restaurant?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => emptyCart(1)}>
                        Yes 
                    </Button>
                    <Button variant="primary" onClick={() => setSmShow(false)}>
                        No
                    </Button>
                    </Modal.Footer>
                </Modal> 
            }
            <Card style={{ width: '25rem', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)' }}>
                <Card.Body>
                    <Row>
                        <Col>
                            <Card.Title as='div'>
                                <strong style={{ fontSize: '1.3rem' }}>{dish.name}</strong>
                                { dish.type === 'Veg' ?
                                    <img src='/images/veg.png' style={{ width: '0.9rem', height: '0.9rem'}} className='float-end' alt='Veg'></img> 
                                :
                                    <img src='/images/nv.png' style={{ width: '0.9rem', height: '0.9rem'}} className='float-end' alt='Non Veg'></img>
                                }
                                <Card.Text>{dish.description}</Card.Text>
                                <Card.Text><strong>Restaurant :</strong> {dish.restaurant.name}</Card.Text>
                            </Card.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10}>
                            <Card.Text className='h4'><strong>₹{getStringPrice(dish.cost)}/-</strong></Card.Text>
                            <br></br>
                            { !qty || (qty && qty === 0) ? 
                                <Button className='btn-sm float-start' variant='outline-warning' onClick={() => updateQtyInCart(1)}>
                                    Add to cart + 
                                </Button> 
                            :
                            <>
                                <Button className='btn-sm' variant='warning' onClick={() => updateQtyInCart(qty-1)}>
                                    <i type='button' className="fas fa-minus fa-lg"></i>
                                </Button> &nbsp;
                                <Button className='btn-sm' variant='outline-#e67818' disabled>
                                    <span>{qty}</span>
                                </Button> &nbsp;
                                <Button className='btn-sm' variant='warning' onClick={() => updateQtyInCart(qty+1)}>
                                    <i type='button' className="fas fa-plus fa-lg"></i>
                                </Button>
                            </>
                            }
                        </Col>
                        <Col md={2}>
                            <Card.Img className='float-end d-xs-none d-sm-none d-md-block' src={dish.image} style={{ height: '11vh', width: '10vw' }}/>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default Dishes
