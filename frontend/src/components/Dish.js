import React, { useEffect, useState } from 'react'
import { Button, Card, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeAllFromCart, removeFromCart } from '../actions/cartAction'
import { deleteDish } from '../actions/dishActions'

const Dish = ({ restaurant, dish }) => {
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const [qty, setQty] = useState()
    const [show, setShow] = useState(true)
    const [smShow, setSmShow] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        if (show) {
            if (cartItems.map((x) => x.dish.toString() === dish._id.toString())) {
                cartItems.map((x) => x.dish.toString() === dish._id.toString() && setQty(x.qty))
            }
            setShow(false)
        }   
    },[qty, dish, dispatch, show, cartItems])

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

    const deleteHandler = (dishId) => {
        if (window.confirm('Are you sure yu want to delete the dish')) {
            dispatch(deleteDish(dishId))
        }
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
                    <Button variant="secondary"  onClick={() => emptyCart(1)}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={() => setSmShow(false)}>
                        No
                    </Button>
                    </Modal.Footer>
                </Modal> 
            }
            <Card className="rounded" style={{ width: '18rem', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)' }}>
                <Card.Img src={dish.image} variant='top' style={{ height: '22vh' }} />

                <Card.Body>
                    <Card.Title as='div'>
                        <strong style={{ fontSize: '1.3rem' }}>{dish.name}</strong>
                        { dish.type === 'Veg' ?
                            <img src='/images/veg.png' style={{ width: '0.9rem', height: '0.9rem'}} className='float-end' alt='Veg'></img> 
                        :
                            <img src='/images/nv.png' style={{ width: '0.9rem', height: '0.9rem'}} className='float-end' alt='Non Veg'></img>
                        }
                    </Card.Title>

                    <p>{dish.description}.</p>

                    <div style={{ display: 'inline' }}>
                        <h4 className='float-start'><strong>₹{getStringPrice(dish.cost)}/-</strong></h4>
                        <span className='float-end'>
                            { userInfo && userInfo.isSeller && 
                                <>
                                    <OverlayTrigger placement='top' overlay={
                                        <Tooltip>Edit</Tooltip>}>
                                        <Link to={`/dish/${dish._id}/edit`} style={{ textDecoration: 'none' }}>
                                            <i className="far fa-edit fa-lg text-dark"></i>&nbsp;&nbsp;
                                        </Link>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement='top' overlay={
                                        <Tooltip>Delete</Tooltip>}>
                                        <i className="far fa-trash-alt fa-lg text-danger" type="button" onClick={() => deleteHandler(dish._id)}></i>
                                    </OverlayTrigger>
                                </>

                            }
                            { (!userInfo || !userInfo.isSeller) &&
                                <>
                                    { !qty || (qty && qty === 0) ? 
                                        <Button className='btn-sm float-end' variant='outline-warning' onClick={() => updateQtyInCart(1)}>Add + </Button>
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
                                </> 
                            }
                        </span>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Dish
