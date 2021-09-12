import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Modal, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartAction'

const Dishes = ({ history, dish }) => {
    const [qty, setQty] = useState()
    const [show, setShow] = useState(false)

    const dispatch = useDispatch()

    const getStringPrice = (price) => {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 20 }).format(price)
    }  

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
                {setShow(true)}
                {show &&  
               <Modal backdrop="static">
                    <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    I will not close if you click outside me. Don't even try to press
                    escape key.
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary">
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                    </Modal.Footer>
                </Modal>}
               </>
            } else {
                dispatch(addToCart(dish._id, qty))
            }
        }
    }, [dispatch, qty, dish, cartItems, show])

    return (
        <Card style={{ width: 'auto', boxShadow: '0 2px 5px 0 rgb(0 0 0 / 20%), 0 2px 10px 0 rgb(0 0 0 / 10%)' }}>
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
                            <br></br>
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
                            <Button className='btn-sm float-start' variant='outline-warning' onClick={() => setQty(1)}>
                                Add to cart + 
                            </Button> 
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
                    </Col>
                    <Col md={2}>
                        <Card.Img className='float-end d-xs-none d-sm-none d-md-block' src={dish.image} variant='top' style={{ height: '11vh', width: '10vw' }}/>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Dishes
