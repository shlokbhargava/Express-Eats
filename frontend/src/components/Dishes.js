import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartAction'

const Dishes = ({ history, dish }) => {
    const [qty, setQty] = useState()

    const dispatch = useDispatch()

    const getStringPrice = (price) => {
        return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 20 }).format(price)
    }  

    useEffect(() => {
        if (qty === 0) {
            dispatch(removeFromCart(dish._id))
        }

        if (qty > 0) {
            dispatch(addToCart(dish._id, qty))
        }
    }, [dispatch, qty, dish])

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
