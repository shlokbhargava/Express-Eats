import React, { useEffect, useState } from 'react'
import { Button, Card, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartAction'
import { deleteDish } from '../actions/dishActions'

const Dish = ({ dish }) => {
    const [qty, setQty] = useState()
    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const dispatch = useDispatch()

    const getStringPrice = (price) => {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 20 }).format(price)
    }    

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    
    useEffect(() => {
        if (qty === 0) {
            if (dish.restaurant === cartItems[0].restaurant) {
                dispatch(removeFromCart(dish._id))
            }
        } 

        if (qty > 0) {
            if (dish.restaurant !== cartItems[0].restaurant) {
                <>
                    {handleShow && 
                        <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        >
                            <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            I will not close if you click outside me. Don't even try to press
                            escape key.
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary">Understood</Button>
                            </Modal.Footer>
                        </Modal>
                    }
                    
                </>
            } else {
                dispatch(addToCart(dish._id, qty))
            }
        }
    },[qty, dish, dispatch])

    const deleteHandler = (dishId) => {
        if (window.confirm('Are you sure yu want to delete the dish')) {
            dispatch(deleteDish(dishId))
        }
    }

    return (
        <Card className="my-3 rounded" style={{ width: '18rem', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)' }} >
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
                                    <Button className='btn-sm float-end' variant='outline-warning' onClick={() => setQty(1)}>Add + </Button>
                                :
                                    <>
                                        <Button className='btn-sm' variant='warning' onClick={() => setQty(qty-1)}>
                                            <i type='button' className="fas fa-minus fa-lg"></i>
                                        </Button> &nbsp;
                                        <Button className='btn-sm' variant='outline-#e67818' disabled>
                                            <span>{qty}</span>
                                        </Button> &nbsp;
                                        <Button className='btn-sm' variant='warning' onClick={() => setQty(qty+1)}>
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
    )
}

export default Dish
